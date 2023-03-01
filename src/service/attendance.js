import Api from '@/utils/api.js'

class AttendanceServices {
    async getAttendance() {
        const res = await Api.doGet(`v1/get_attendance`)
        // console.debug('GET FETCH', res)
        return res
    }

    async createAttendance({
        payload
    }) {
        const formData = new FormData()
        formData.append('image', payload.image)

        const res = await Api.doPost(`v1/attendance/absen`, formData)
        return res
    }
}

export default new AttendanceServices()