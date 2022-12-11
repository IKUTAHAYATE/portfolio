import { useLocation } from 'react-router-dom'
import useItemData from '../../hooks/useItemData'
import CategoryItems from '../molecules/CategoryItems'
import ListMoreBtn from './ListMoreBtn'

const ListItem = () => {

	const CheckId = () => {
		const search = useLocation().search
		const query = search
		.slice(1)
		.split('&')
		.map((str) => [str.split('=')[0], str.split('=')[1]])
		.reduce((acc) => {
		  return acc;
		});
		
		return query
	}

	const queryParam = CheckId()

	const filterData = (type) => {
		switch (type) {
			case 'category':
				const categoryArray = ['new', 'men', 'woman', 'kids']
				const newData = categoryArray.filter(category => {
					return queryParam[1] === category
				})
				return newData[0]
			case 'brand':
				return queryParam[0]
			default:
			throw new Error('operator is invalid')
		}	
	}
	
	const filterCategoryData = filterData(queryParam[0])

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
				(<CategoryItems
					key={filterCategoryData}
					type={filterCategoryData}
					data={data}
					brandId={queryParam[1]}
				/>)
				
			}
			
			<ListMoreBtn />
		</>
	)
}

export default ListItem