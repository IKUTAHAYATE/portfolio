import { Link } from 'react-router-dom';
import Controls from '../atoms/Controls'
import { useHamburger } from "../modules/Header"

const Hamburger = () => {
	const categoryList = [
		{
			param: "men",
			content: "MEN",
		},
		{
			param: "woman",
			content: "WOMAN",
		},
		{
			param: "kids",	
			content: "KIDS",
		}
	]

	const [ hamburger ] = useHamburger();

	return (
		<div id="js-hamburger-target" className={`l-header__links ${hamburger && 'is-active'}`}>
			<nav className="l-menu">
				{categoryList.map(category => {
					const categoryParam = `/list/?cateory=${category.param}`;
					return (
						<Link key={categoryParam} to={categoryParam}>{category.content}</Link>
					)
				})}
			</nav>
			<Controls />
		</div>
	);
};

export default Hamburger