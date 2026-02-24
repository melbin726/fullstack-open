import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(res => res.data)
const create = obj => axios.post(baseUrl, obj).then(res => res.data)
const remove = id => axios.delete(`${baseUrl}/${id}`)

// Exercise 2.15: Updating an existing resource
const update = (id, obj) => axios.put(`${baseUrl}/${id}`, obj).then(res => res.data)

export default { getAll, create, remove, update }