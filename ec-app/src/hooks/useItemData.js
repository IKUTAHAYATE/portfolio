import { useState, useEffect } from "react"
import getItemResponse from '../api/getItemResponse'

const useItemData = () => {
    const [data, setData] = useState([]),
        [isLoading, setIsLoading] = useState(true),
        [isError, setIsError] = useState(false)


    useEffect(() => {
        const getItem = async () => {

            // setTimeoutでテスト記述
            // setTimeout(async () => {
                try {
                    const res = await getItemResponse()
                    setData(res.data)
                } catch (error) {
                    setIsError(false)
                    throw error
                } finally {
                    console.log('ロード終わり')
                    setIsLoading(false)
                }
            // }, 5000)
        }
        getItem(); 
    },[])
    return {data, isError, isLoading}
}

export default useItemData