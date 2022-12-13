import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auction/'


const add = async (userData) => {
  try {
    return (await axios.post(API_URL, userData)).data

  } catch (err) {
    console.log(err);
  }

}
const getAll = async () => {
  try {
    return (await axios.get(API_URL)).data
  } catch (err) {
    console.log(err);
  }

}
const getOne = async (artId) => {
  try {
    return (await axios.get(API_URL + artId)).data
  } catch (err) {
    console.log(err);
  }

}

const remove = async (artId) => {
  try {
    return (await axios.get(API_URL + artId)).data
  } catch (err) {
    console.log(err);
  }

}
const update = async (artData, artId) => {
  try {
    return (await axios.put(API_URL + artId, artData)).data
  } catch (err) {
    console.log(err);
  }

}
const addBid = async (artId, bidData) => {
  try {
    return await axios.put(`${API_URL}bid/${artId}`, bidData)
  } catch (err) {
    console.log(err);
  }

}
export const auctionApi = { add, getAll, getOne, remove, update, addBid }