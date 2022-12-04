import Logo from '../atoms/Logo'
import Hamburger from '../block/Hamburger'
import Form from '../block/Form'
import SpHamburger from '../atoms/SpHamburger'

const Header = () => {
  return (
    <>
     	<header className="l-header">
			<div className="l-inner">
				<Logo />
				<Hamburger />
				<Form />
				<SpHamburger />
			</div>
		</header>
    </>
  );
};

export default Header