const Stars = () => {

	return(
		<ul className="l-itemDetail__review">
			{
				[...Array(5).keys()].map(item => {
					return(
						<li key={item} className="l-itemDetail__reviewItem is-active">★</li>
					)
				})
			}
		</ul>
	)
}

export default Stars