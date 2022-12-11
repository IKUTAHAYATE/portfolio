import { useState } from 'react'
import { Link } from 'react-router-dom'

const ListAside = () => {	

	const [ more, setMore ] = useState(false)

	const CATEGRY_LIST = [
			'men',
			'women',
			'kids'
		],
	
		BRAND_LIST = [
			'AAA',
			'BBB',
			'CCC',
			'DDD',
			'EEE',
			'FFF',
			'GGG',
			'HHH',
			'III',
			'JJJ',
			'KKK',
			'LLL'
		],

		PRICE_SELECT = [
			'1000',
			'2000',
			'3000',
			'4000',
			'5000'
		]

  return(
	<aside className="l-sidebar">
		<section className="l-sidebar__inner">
			<h3 className="l-sidebar__title">カテゴリー</h3>
			<div className="l-sidebar__body">
				<ul className="l-sidebar__list">
					{CATEGRY_LIST.map(item => {
						return(
							<li key={item} className="l-sidebar__item">
								<Link to={`/list/?category=${item}`}>{item.toUpperCase()}</Link>
							</li>
						)
					})}
				</ul>
			</div>
		</section>
		<section className="l-sidebar__inner">
			<h3 className="l-sidebar__title">価格</h3>
			<div className="l-sidebar__body">
				<form name="priceform" action="list.html" method="GET">
					<div className="l-sidebar__priceSelect__wrap">
						<select id="js-select-price" name="price" className="l-sidebar__priceSelect">
							<option hidden="">価格を選択する</option>
							{PRICE_SELECT.map(item => {
								return(
									<option key={item} value={item}>〜{item}円</option>
								)
							})}
						</select>
					</div>
				</form>
			</div>
		</section>
		<section className="l-sidebar__inner">
			<h3 className="l-sidebar__title">ブランド</h3>
			<div className="l-sidebar__body">
				<ul id="js-more-brand" className="l-sidebar__list">
					{BRAND_LIST.map(item => {
						return(
							<li key={item} className={`l-sidebar__item ${more && 'is-active'}`}>
								<Link to={`/list/?brand=${item}`}>
									{item}
								</Link>
							</li>
						)
					})}
					
				</ul>
				<div
					className={`l-sidebar__more ${more && 'is-active'}`}
					data-more="brand"
					onClick={() => setMore(true)}
				>
					もっと見る＋
				</div>
			</div>
		</section>
	</aside>
  )
}

export default ListAside