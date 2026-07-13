const bcrypt = require('bcryptjs')
const { User } = require('../../models')
const generateToken = require('../utils/generateToken')

class AuthController {

  static async register(req, res) {

  console.log('REQUEST MASUK')

  try {

    console.log(req.body)

    const { name, email, password, role } = req.body

    console.log('CEK USER')

    const existingUser = await User.findOne({
      where: { email }
    })

    console.log('USER AMAN')

    if (existingUser) {
      return res.status(400).json({
        message: 'Email already exists'
      })
    }

    console.log('HASH PASSWORD')

    const hashedPassword = await bcrypt.hash(password, 10)

    console.log('CREATE USER')

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    })

    console.log('SUCCESS')

    res.status(201).json({
      success: true,
      message: 'Register successful',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: error.message
    })
  }
}

  static async login(req, res) {
    try {

      const { email, password } = req.body

      const user = await User.findOne({
        where: { email }
      })

      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        })
      }

      const isMatch = await bcrypt.compare(
        password,
        user.password
      )

      if (!isMatch) {
        return res.status(400).json({
          message: 'Invalid password'
        })
      }

      const token = generateToken(user)

      res.json({

          success:true,

          message:"Login successful",

          token,

          user:{

              id:user.id,

              name:user.name,

              email:user.email,

              role:user.role

          }

      })

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }

}

module.exports = AuthController