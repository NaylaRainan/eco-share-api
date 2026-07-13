const {
    RentalHistory,
    Rental
} = require('../../models')

class HistoryController {

    static async getAll(req, res) {

        try {

            const history = await RentalHistory.findAll({

                include: [

                    {
                        model: Rental
                    }

                ]

            })

            res.json({

                success: true,

                data: history

            })

        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message

            })

        }

    }

}

module.exports = HistoryController