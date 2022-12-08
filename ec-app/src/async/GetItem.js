import { useEffect, useState } from "react"
import axios from "axios"

const GetItem = () => {
    // const [ items, setItems ] = useState([])

    // useEffect(() => {
      axios.get('http://localhost:3003/item').then((res) => {
        // setItems(res.data)
        return res.data
      })
    // }, [])

    // return (
    //     <div>
    //         {items.map(item => {
    //             return(
    //                 <div key={item.id}>{item.name}</div>
    //             )
    //         })}
    //     </div>
    // )
}

export default GetItem