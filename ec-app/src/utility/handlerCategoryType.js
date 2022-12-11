import { useRecoilState } from "recoil"

const HandlerCategoryType = (data, type, id) => {

    let newData

    switch (type) {
        case 'men':
        case 'woman':
        case 'kids':
            return newData = data.filter(data => {
                return data.category === type
            })
        case 'new':
            return newData = data.filter(data => {
                return data.new
            })
        case 'detail':
            return newData = data.filter(data => {  
                return data.id === Number(id)
            })
        case 'brand':
            return newData = data.filter(data => {
                // ブランドアイテムを...
                return data.brand === 'AAA'
            })
        default:
        throw new Error('operator is invalid')
    }
}

export default HandlerCategoryType