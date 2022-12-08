import axios from 'axios'
import authHeader from '../context/AuthHeader'

const USER_BASE_REST_API = 'http://localhost:9090/web-test/users'
const BASE_REST_API = 'http://localhost:9090/web-test'


class UserService {
    getAllUsers() {
        return axios.get(USER_BASE_REST_API, authHeader())
    }
    createUser(user) {
        return axios.post(BASE_REST_API + '/registration', user)
    }
    getUserById(userId) {
        // return instanse.get(USER_BASE_REST_API+'/' + userId)
        return axios.get(USER_BASE_REST_API + '/' + userId, authHeader())
    }
    updateUser(userId, user) {
        return axios.patch(USER_BASE_REST_API + '/' + userId, user, authHeader())
    }
    deleteUser(userId) {
        return axios.delete(USER_BASE_REST_API + '/' + userId, authHeader())
    }
    checkPassword(password) {
        return axios.post(USER_BASE_REST_API + '/check-password', password, authHeader())
    }
    login(email, password) {
        return axios.post(BASE_REST_API + '/login', { email, password })
    }
}
export default new UserService();