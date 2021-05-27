import axios from 'axios'
const API_BASE_ADDRESS = 'http://localhost:7000';
axios.defaults.withCredentials = true;
export default axios.create({
    baseURL:API_BASE_ADDRESS
})