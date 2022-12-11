import Logo from '../atoms/Logo'
import Hamburger from '../molecules/Hamburger'
import SpHamburger from '../atoms/SpHamburger'
import { RecoilRoot } from 'recoil'

const Header = () => {
	return (
		<>
			<header className="l-header">
				<div className="l-inner">
					<RecoilRoot>
						<Logo />
						<Hamburger />
						<SpHamburger />
					</RecoilRoot>
				</div>
			</header>
		</>
	)
}

export default Header