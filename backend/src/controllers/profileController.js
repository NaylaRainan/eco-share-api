const { User } = require('../../models')

class ProfileController {

    static async getProfile(req, res) {

        try {

            const user = await User.findByPk(req.user.id, {

                attributes: [

                    'id',
                    'name',
                    'email',
                    'role'

                ]

            })

            res.json({

                success: true,

                data: user

            })

        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message

            })

        }

    }

}

module.exports = ProfileController