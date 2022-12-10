import { useState,createContext } from 'react'
export const ItemDataContext = createContext([])
export const IsLoadingContext = createContext(true)
export const IsErrorContext = createContext(false)

const ContextApi = ({children}) => {
    const [data, setData] = useState([]),
        [isLoading, setIsLoading] = useState(true),
        [isError, setIsError] = useState(false)
    return(
        <>
            <IsErrorContext.Provider value={[isError, setIsError]}>
                <IsLoadingContext.Provider value={[isLoading, setIsLoading]}>
                    <ItemDataContext.Provider value={[data, setData]}>
                        {children}
                    </ItemDataContext.Provider>
                </IsLoadingContext.Provider>
            </IsErrorContext.Provider>
        </>
    )
}

export default ContextApi