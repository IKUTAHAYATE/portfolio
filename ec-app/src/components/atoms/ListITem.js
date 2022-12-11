import { useLocation } from 'react-router-dom'
import useItemData from '../../hooks/useItemData'
import CategoryItems from '../molecules/CategoryItems'
import ListMoreBtn from './ListMoreBtn'
import { useRecoilState } from 'recoil'
import priceValueState from '../../store/priceValueState'

const ListItem = () => {
	const [ priceValue ] = useRecoilState(priceValueState)
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
				priceValue === 0 ? (
					isLoading ? 'Loading中...' :
					(<CategoryItems
						key={filterCategoryData}
						type={filterCategoryData}
						data={data}
						brandId={queryParam[1]}
					/>)
				): 'ここは永久工事中です。'
			}
			
			<ListMoreBtn />
		</>
	)
}

export default ListItem