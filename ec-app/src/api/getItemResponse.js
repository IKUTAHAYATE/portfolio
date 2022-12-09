import axios from "axios"

const getItems = async () => { 
    const response = await axios.get('http://localhost:3003/item')
    return response
}

export default getItems