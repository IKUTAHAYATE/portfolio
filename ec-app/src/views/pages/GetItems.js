import React from 'react'
import useItemData from '../../hooks/useItemData'
import handlerCategoryType from '../fanc/handlerCategoryType'
import CategoryItems from '../components/block/CategoryItems'

const GetItems = () => {
	const categoryArray = ['new', 'men', 'woman', 'kids']

	const {data, isLoading, isError} = useItemData()

	if (isError) {
		return(
			<div>
				Error...
			</div>
		)
	}
	
	return (
		<>
			{
				isLoading ? 'Loading中...' :
				(categoryArray.map(category => {
					const resultData = handlerCategoryType(data, category)
					return(
						<CategoryItems key={category} type={category} data={resultData} />
					)
				}))
			}
		</>
	)
}

export default GetItems