import { Link } from 'react-router-dom'

const CommonLink = () => {
	const linkItem =[
		'ヘルプ',
		'お問い合わせ',
		'利用規約',
		'採用情報',
		'© NINCO Co., Ltd'
	]
  return (
	<>
		<ul className="l-footer__link">
			{linkItem.map((item, index) => {
				return(
					<li key={index} className="l-footer__linkItem">
						<Link to="#">{item}</Link>
					</li>
				)
			})}
		</ul>
	</>
  )
}

export default CommonLink