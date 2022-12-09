const handlerCategoryType = (data, type) => {
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
        default:
        throw new Error('operator is invalid')
    }
}

export default handlerCategoryType