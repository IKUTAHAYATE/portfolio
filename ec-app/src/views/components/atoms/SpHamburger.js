import { React } from 'react'
import { useRecoilState } from 'recoil'
import hamburgerState from '../../../state/hamburgerState'

const SpHamburger = () => {

	const [ hamburger, setHamburger ] = useRecoilState(hamburgerState);
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
	)
}

export default SpHamburger