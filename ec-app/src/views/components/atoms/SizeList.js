const SizeList = () => {

	const ITEM_SIZE = [
		'130',
		'140',
		'150',
		'160',
		'170',
		'180',
		'190'
	]
	
	return(
		<ul className="l-itemDetail__sizeList">
		{ITEM_SIZE.map(itemSize => {
			return(
				<li key={itemSize} className="l-itemDetail__sizeItem">{itemSize}</li>
			)
		})}
	</ul>
	)
}

export default SizeList