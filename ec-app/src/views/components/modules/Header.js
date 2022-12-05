import { useState, useContext, createContext } from "react";
import Logo from '../atoms/Logo'
import Hamburger from '../block/Hamburger'
import Form from '../block/Form'
import SpHamburger from '../atoms/SpHamburger'
export const HamburgerCheck = createContext();

const Header = () => {
	const [ hamburger, setHamburger ] = useState(false);
  return (
    <>
     	<header className="l-header">
			<div className="l-inner">
				<HamburgerCheck.Provider value={ [ hamburger, setHamburger ] }>
					<Logo />
					<Hamburger />
					<Form />
					<SpHamburger />
				</HamburgerCheck.Provider>
			</div>
		</header>
    </>
  );
};

export default Header

export const useHamburger = () => useContext(HamburgerCheck);