import { useEffect, useMemo } from 'react'
import getItemResponse from '../api/getItemResponse'
import { ItemDataContext, IsErrorContext, IsLoadingContext } from '../context/StateApi'
import { useContext } from 'react'

const useItemData = () => {

    const [data, setData] = useContext(ItemDataContext),
        [isLoading, setIsLoading] = useContext(IsLoadingContext),
        [isError, setIsError] = useContext(IsErrorContext)

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