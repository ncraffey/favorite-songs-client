const createUser = (user) =>
    fetch("https://wbdv-generic-server.herokuapp.com/api/ncraffey/users", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

const updateUser = (userId, user) =>
    fetch("https://wbdv-generic-server.herokuapp.com/api/ncraffey/users/" + userId, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

const deleteUser = (userId) =>
    fetch("https://wbdv-generic-server.herokuapp.com/api/ncraffey/users/" + userId, {
        method: 'DELETE'
    })
        .then(response => response.json())

const findUserById = (userId) => {}

const findAllUsers = () =>
    fetch("https://wbdv-generic-server.herokuapp.com/api/ncraffey/users")
        .then(response => response.json())

const fetchUser = () =>
    fetch("http://localhost:8080/api/profile", {
        method: 'POST',
        credentials: "include"
    })
        .then(response => {
            return response.json()
        })

export default {
    createUser,
    deleteUser,
    findUserById,
    findAllUsers,
    updateUser,
    fetchUser
}
