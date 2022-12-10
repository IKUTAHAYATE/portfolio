import { Link } from 'react-router-dom'
import handlerCategoryType from '../../utility/handlerCategoryType'

const CardItem = ({type, data}) => {
	const items = handlerCategoryType(data, type)
	return(
		<>
			{
				
				 (items?.map(item => {
					return(
						<li key={item.id} className="c-item">
							<Link to={`detail/?id=${item.id}`}>
								<div className="c-item__cap">
									<img src={`/assets/img/item/${item.id}.png`} loading="lazy" alt="" />
								</div>
									<div className="c-item__info">
										<h3 className="c-item__name">{item.name}</h3>
										<p className="c-item__text">{item.text}</p>
										<div className="c-item__price">¥{item.price}</div>
									</div>
							</Link>
						</li>
					)
				}))
			}
		</>
	)
}

export default CardItem