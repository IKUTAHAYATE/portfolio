import { useState } from "react"

const SizeList = () => {

	const [ size, setSize ] = useState('-')

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
		<>
			<div className="l-itemDetail__sizeSelect">Select Size：
				<span id="js-item-size">{size}</span>
			</div>

			<ul className="l-itemDetail__sizeList">
				{ITEM_SIZE.map(itemSize => {
					return(
						<li
							key={itemSize}
							className="l-itemDetail__sizeItem"
							onClick={() => setSize(itemSize)}
						>

							{itemSize}

						</li>
					)
				})}
			</ul>
		</>
	)
}

export default SizeList