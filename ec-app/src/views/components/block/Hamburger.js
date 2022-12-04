import { Link } from 'react-router-dom';
import Controls from '../atoms/Controls'

const Hamburger = () => {
  return (
	<div id="js-hamburger-target" className="l-header__links">
		<nav className="l-menu">
			<Link to="/list">MEN</Link>
			<Link to="/list">WOMAN</Link>
			<Link to="/list">KIDS</Link>
		</nav>
		<Controls />
	</div>
  );
};

export default Hamburger