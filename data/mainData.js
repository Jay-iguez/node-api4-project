require('dotenv').config()
const crypto = require('crypto')

let id = process.env.BASELINEID

const hashPassword = (pass, slt) => {
    const hash = crypto.createHash('sha256')
    hash.update(pass + slt)
    return hash.digest('hex')
}

const generatePassword = (password) => {
    const generateRandStr = (length) => {
        return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length)
    }

    const salt = generateRandStr(8)

    return {
        salt: salt, hashPassword: hashPassword(password, salt)
    }
}

const checkPassword = (password, salt) => {
    return hashPassword(password, salt)
}

const getId = () => {
    return id++
}

let users = [
    {
        username: "Reede Buscuits",
        password: generatePassword('donutwater'),
        id: getId()
    },
    {
        username: "Lola Lobezaléz",
        password: generatePassword('getthehorns'),
        id: getId()
    },
    {
        username: "Kade Booker",
        password: generatePassword('holdb'),
        id: getId()
    }
]


module.exports = {
    async fetchUsers() {
        return users
    },
    async createUser(userData) {
        const newUser = userData
        newUser.password = generatePassword(userData.password)
        newUser.id = getId()

        users = [...users, newUser]
        
        return newUser
    },
    async fetchUserById(id) {
        return users.find(user => user.id === id)
    },
    async checkCredentials(userInput) {
        const { username, password } = userInput
        const user = users.find(user => user.username === username)

        if (!user) {
            return false
        }

        const isPasswordValid = checkPassword(password, user.password.salt)

        if (isPasswordValid === user.password.hashPassword) {
            return true
        } else return false
         //users.find(user => user.username === userInput.username && user.password === userInput.password)
    },
    checkPassword
}