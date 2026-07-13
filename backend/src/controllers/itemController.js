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