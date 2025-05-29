import axios from 'axios';

const api = axios.create({
    baseURL: 'http://34.151.218.111:3000'
});

export default api;