import facebook from '../../../assets/img/facebook.png'
import twitter from '../../../assets/img/twitter.png'
import instagram from '../../../assets/img/instagram.png'
import { Link } from 'react-router-dom'

const Sns = () => {
	const snsList = [
		{
			src: facebook,
			content: 'FaceBook',
		},
		{
			src: twitter,
			content: 'Twitter',
		},
		{
			src: instagram,	
			content: 'Instagram',
		}
	]
  return (
	<>
		<ul className="c-sns">
			{snsList.map(sns => {
				return (
					<li key={sns.src} className="c-snsItem">
						<Link to="#">
							<img src={sns.src} className="c-sns__icon" alt="" />
							<span className="c-sns__name">{sns.content}</span>
						</Link>
					</li>
				)
			})}
		</ul>
	</>
  )
}

export default Sns