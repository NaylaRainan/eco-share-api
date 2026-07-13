module.exports = (role) => {

  return (req, res, next) => {

    try {

      if (req.user.role !== role) {

        throw {
          status: 403,
          message: 'Forbidden access'
        }

      }

      next()

    } catch (error) {

      next(error)

    }

  }

}