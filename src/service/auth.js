import Api from '@/utils/api.js'

class AuthServices {
    async login({
        payload
    }) {
        const res = await Api.doPost(`v1/login`, payload)
        // console.debug('GET FETCH', res)
        return res
    }

    async getUsers() {
        const res = await Api.doGet(`v1/get_user`)
        // console.debug('GET FETCH', res)
        return res
    }

    async getProfile({
        id
    }) {
        const res = await Api.doGet(`v1/users/${id}`)
        return res
    }

    async logout() {
        const res = await Api.doPost(`v1/logout`)

        return res
    }

    async detailUser({
        id
    }) {
        const res = await Api.doGet(`v1/update/${id}`)
        return res
    }

    async createUser({
        payload
    }) {
        const formData = new FormData()
        formData.append('name', payload.name)
        formData.append('email', payload.email)
        formData.append('password', payload.password)
        formData.append('jenis_kelamin', payload.jenis_kelamin)
        formData.append('no_hp', payload.no_hp)

        const res = await Api.doPost(`v1/register`, formData)
        return res
    }

    async updateUser({
        id,
        payload
    }) {

        const formData = new FormData()
        formData.append('name', payload.name)
        formData.append('jenis_kelamin', payload.jenis_kelamin)
        formData.append('no_hp', payload.no_hp)

        const res = await Api.doPost(`v1/update/${id}`, payload)
        return res
    }

}

export default new AuthServices()