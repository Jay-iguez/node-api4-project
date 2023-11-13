let id = 0

const getId = () => {
    return id++
}

let users = [
    {
        name: "Reede Buscuits",
        password: 'donutwater',
        id: getId()
    },
    {
        name: "Lola Lobezaléz",
        password: 'getthehorns',
        id: getId()
    },
    {
        name: "Kade Booker",
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
        
        return users
    }
}