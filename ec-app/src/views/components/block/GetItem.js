import CategoryItems from './CategoryItems'
import useItemData from '../../../hooks/useItemData'

export default function GetItem({type}) {
	const {isError, data, isLoading} = useItemData()
	if (isError) {
		return (
			<div>Errorです</div>
		)
	}

    return (
        <CategoryItems type={type} data={data} isLoading={isLoading} />
    )
}