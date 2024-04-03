import axios from 'axios'
import { ref } from 'vue'

const instance = axios.create({
    baseURL: 'https://node-app-k3u4.onrender.com/',
})

const employees = ref([])
const loading = ref(false)
const currentEmployee = ref(null)

export default function useAPI() {

    const getEmployees = async () => {
        loading.value = true
        if (employees.value.length === 0) {
            const responce = await instance.get('api/employees/fetch')
            employees.value = responce.data
        }

        loading.value = false
    }

    const fetchEmployee = async (id) => {
        const responce = await instance.get(`api/employees/fetch/${id}`)
        currentEmployee.value = responce.data
    }

    return {instance, employees, getEmployees, loading, fetchEmployee, currentEmployee}
}
