import Api from '@/utils/api.js'

class BlogServices {
    async getComment({
        id
    }) {
        const res = await Api.doGet(`v1/public_comment/index/${id}`)
        // console.debug('GET FETCH', res)
        return res
    }

    async createComment({
        id,
        payload
    }) {
        const res = await Api.doPost(`v1/public_comment/create/${id}`, payload)
        // console.debug('GET FETCH', res)
        return res
    }

    async deleteComment({
        id,
        id_blog
    }) {
        const res = await Api.doPost(`v1/comment/delete/${id}/${id_blog}`)
        return res
    }
}

export default new BlogServices()