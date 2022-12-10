import { Link } from 'react-router-dom'

const Sns = () => {
	const snsList = [
		{
			src: '/assets/img/twitter.png',
			content: 'FaceBook',
		},
		{
			src: '/assets/img/twitter.png',
			content: 'Twitter',
		},
		{
			src: '/assets/img/instagram.png',	
			content: 'Instagram',
		}
	]
  return (
	<>
		<ul className="c-sns">
			{snsList.map(sns => {
				return (
					<li key={sns.content} className="c-snsItem">
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