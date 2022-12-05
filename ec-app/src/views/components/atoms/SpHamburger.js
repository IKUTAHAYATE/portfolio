import { useHamburger } from "../modules/Header"

const SpHamburger = () => {
	const [ hamburger, setHamburger ] = useHamburger();
  return (
	<div
		onClick={() => hamburger ? setHamburger(false): setHamburger(true) }
		id="js-hamburger-trigger"
		className={hamburger ? 'is-active': ''}
	>
		<span></span>
		<span></span>
		<span></span>
	</div>
  );
};

export default SpHamburger