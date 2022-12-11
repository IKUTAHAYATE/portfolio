const handlerCategoryType = (data, type, id=null, brandId) => {
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
                return data.brand === brandId
            })
        default:
        throw new Error('operator is invalid')
    }
}

export default handlerCategoryType