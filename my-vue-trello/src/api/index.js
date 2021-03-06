import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:3000/'
const UNAUTHORIZED = 401
const onUnauthorized = () => {
    router.push('/login')
}

const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        data
    }).then(result=>result.data)
        .catch(err => {
            const status = err.response.status;
            if (status === UNAUTHORIZED) return onUnauthorized();
        //  throw Error(result) 
      })  
}

export const setAuthInHeader = token => {
    console.log("토큰:"+token)
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

export const card = {
    create(title, listId, pos) {
        return request('post', 'cards', {title, listId, pos})
    }
}

export const board = {
    fetch(id) {
        return id ? request('get',`boards/${id}`) :request('get','boards')
    },
    create(title) {
        console.log("create"+title)
        return request('post', 'boards', { title })
    }
    
}

export const auth = {
    login(email, password) {
        return request('post', 'login', {email, password})
    }
}