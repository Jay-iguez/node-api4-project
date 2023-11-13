require('dotenv').config()

let id = process.env.BASELINEID

const getId = () => {
    return id++
}

let users = [
    {
        username: "Reede Buscuits",
        password: 'donutwater',
        id: getId()
    },
    {
        username: "Lola Lobezaléz",
        password: 'getthehorns',
        id: getId()
    },
    {
        username: "Kade Booker",
        password: 'holdb',
        id: getId()
    }
]

module.exports = {
    async fetchUsers() {
        return users
    },
    async createUser(userData) {
        const newUser = userData
        newUser.id = getId()

        users = [...users, newUser]
        
        return newUser
    },
    async fetchUserById(id) {
        return users.find(user => user.id === id)
    },
    async checkCredentials(userInput) {
        return users.find(user => user.username === userInput.username && user.password === userInput.password)
    }
}