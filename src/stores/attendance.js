import {
    ref,
    computed
} from 'vue'
import {
    defineStore
} from 'pinia'
import SERVICE from "@/service/attendance.js"
import Swal from 'sweetalert2'

export const useAttendanceStore = defineStore('attendance', () => {
    const attendance = ref([])

    const getAttendance = computed(() => attendance.value)

    const setAttendance = (data) => {
        attendance.value = data
    }

    async function fetchAttendance() {
        try {

            const res = await SERVICE.getAttendance()

            setAttendance(res.data)

        } catch (error) {
            console.error(error)
        }
    }

    async function createAttendance(payload) {
        try {

            const res = await SERVICE.createAttendance({
                payload
            })
            Swal.fire({
                icon: "success",
                title: "Check In Berhasil",
                text: "Anda Berhasil Check In Untuk Hari Ini",
            });
            return res

        } catch (error) {
            console.error(error)
        }
    }

    return {
        getAttendance,
        fetchAttendance,
        createAttendance
    }
})