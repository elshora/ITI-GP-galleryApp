import axios from 'axios'


const API_URL = 'http://localhost:5000/api'


/**
 * @endPoint for rest of urls  such as 'users/register' || /auctions/any;
 * 
 *  */


const get = async (endPoint, TOKEN) => {
    try {
        const response = await axios.get(API_URL + endPoint, { headers: { Authorization: `Bearer ${TOKEN}` } })
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}
const remove = async (endPoint, TOKEN) => {
    try {
        const response = await axios.delete(API_URL + endPoint, { headers: { Authorization: `Bearer ${TOKEN}` } })
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}
const update = async (endPoint, userData, TOKEN) => {
    try {
        const response = await axios.put(API_URL + endPoint, userData, { headers: { Authorization: `Bearer ${TOKEN}` } })
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

const create = async (endPoint, userData, TOKEN) => {
    try {
        const response = await axios.post(API_URL + endPoint, userData, { headers: { Authorization: `Bearer ${TOKEN}` } })
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

const getOne = async (endPoint, id, TOKEN) => {
    try {
        const response = await axios.get(API_URL + endPoint + id, { headers: { Authorization: `Bearer ${TOKEN}` } })
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}

const APIServices = {
    create,
    get,
    remove,
    update,
    getOne
}

export default APIServices
