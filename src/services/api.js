import axios from 'axios'

const api = axios.create({
    baseURL: 'https://goweek-clone-twitter-backend-pamqyrnoei.now.sh'
    //baseURL: 'http://localhost:3000'
})

export default api