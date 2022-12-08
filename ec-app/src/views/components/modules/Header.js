import Logo from '../atoms/Logo'
import Hamburger from '../block/Hamburger'
import Form from '../block/Form'
import SpHamburger from '../atoms/SpHamburger'
import { RecoilRoot } from "recoil"

const Header = () => {
  return (
    <>
     	<header className="l-header">
			<div className="l-inner">
				<RecoilRoot>
					<Logo />
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