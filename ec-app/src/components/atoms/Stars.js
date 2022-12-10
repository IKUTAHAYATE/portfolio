import { useCallback, useState } from "react"

const Stars = () => {

	const [ count, setCount ] = useState(0)

	let starArray = [...Array(5).keys()]

	const starHandler = useCallback((index) => {
		if (count === (index + 1)) {
			return setCount(0)
		}
		setCount(index)
		setCount((pre_count) => {
			return pre_count + 1
		})
	})

	return(
		<>
			<ul className="l-itemDetail__review">
				{
					starArray.map((item, index) => {
						return(
							<li
								key={item}
								className={`l-itemDetail__reviewItem ${count >= (index + 1) ? 'is-active': ''}`}
								onClick={() => {
									starHandler(index)
								}}
							>
								★
							</li>
						)
					})
				}
			</ul>

			<div className="l-itemDetail__review__text">
				<p>評価は: <span id="js-item-review">{count}</span>です</p>
			</div>
		</>
	)
}

export default Stars