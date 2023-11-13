const checkType = (value, type) => {
    return typeof value === type ? true : false
}

function checkBody (req, res, next) {
    const { username, password } = req.body
    if (username && password && checkType(username, 'string') && checkType(password, 'string')){
        next()
    } else {
        res.status(422).json({
            message: "Body must contain username and password!"
        })
    }
}

module.exports = {
    checkBody
}