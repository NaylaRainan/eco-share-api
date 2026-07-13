const { Item } = require('../../models')

exports.createItem = async (req, res, next) => {

  try {

    const item = await Item.create({
      ...req.body,
      owner_id: req.user.id
    })

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: item
    })

  } catch (error) {

    next(error)

  }
  
}

exports.getAll = async (req, res, next) => {

  try {

    const items = await Item.findAll()

    res.json({
      success: true,
      data: items
    })

  } catch (error) {

    next(error)

  }

}

exports.getById = async (req, res, next) => {

  try {

    const item = await Item.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.json({
      success: true,
      data: item
    });

  } catch (error) {

    next(error);

  }

};

exports.updateItem = async(req,res,next)=>{

  try {

    const item = await Item.findByPk(req.params.id)


    if(!item){

      return res.status(404).json({
        success:false,
        message:"Item tidak ditemukan"
      })

    }


    await item.update(req.body)


    res.json({
      success:true,
      message:"Item berhasil diupdate",
      data:item
    })


  } catch(error){

    next(error)

  }

}

exports.deleteItem = async(req,res,next)=>{

  try {

    const item = await Item.findByPk(req.params.id)


    if(!item){

      return res.status(404).json({
        success:false,
        message:"Item tidak ditemukan"
      })

    }


    await item.destroy()


    res.json({
      success:true,
      message:"Item berhasil dihapus"
    })


  } catch(error){

    next(error)

  }

}