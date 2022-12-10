import Logo from '../atoms/Logo'
import Hamburger from '../molecules/Hamburger'
import Form from '../molecules/Form'
import SpHamburger from '../atoms/SpHamburger'
import { RecoilRoot } from 'recoil'

const Header = () => {
	return (
		<>
			<header className="l-header">
				<div className="l-inner">
					<Logo />
					<RecoilRoot>
						<Hamburger />
						<Form />
						<SpHamburger />
					</RecoilRoot>
				</div>
			</header>
		</>
	)
}

export default Header