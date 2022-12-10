import Stars from "../atoms/Stars"

const Review = () => {
	return(
		<>
			<section className="l-item">
				<div className="c-titleHead">
					<h2 className="c-title">レビューをする</h2>
				</div>

				<Stars />
				
				<div className="l-itemDetail__review__text">
					<p>評価は: <span id="js-item-review">3</span>です</p>
				</div>
			</section>
		</>
	)
}

export default Review