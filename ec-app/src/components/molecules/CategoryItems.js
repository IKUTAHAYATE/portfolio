import CardItem from '../atoms/CardItem'

const CategoryItems = ({type, data, brandId}) => {

	return(
		<div className='l-inner'>
			<section className="l-item">
				<div className="c-titleHead">
					<h2 className="c-title">{type}</h2>
				</div>
				<ul className="c-itemList" data-item-list="new">
					<CardItem type={type} data={data} brandId={brandId}/>
				</ul>
			</section>
		</div>
	)
}

export default CategoryItems