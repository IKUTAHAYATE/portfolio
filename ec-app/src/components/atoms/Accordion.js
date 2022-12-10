import { useCallback, useState } from "react"

const Accordion = ({ itemText }) => {

	const [ accordion, setAccordion ] = useState(false)
	const accordionHandler = useCallback(() => {
		setAccordion((prev) => !prev)
	})
	return(
		<>
			<div
				onClick={accordionHandler}
				id="js-item-text"
				className={`l-itemDetail__trigger ${accordion && 'is-active'}`}
			>
					商品の説明を見る
			</div>
			<div
				id="js-itemDetail__target"
				className={`l-itemDetail__text ${accordion && 'is-active'}`}
			>
				{itemText}
			</div>
		</>
	)
}

export default Accordion