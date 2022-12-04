import { Link } from 'react-router-dom';
import logo_black from '../../../assets/img/logo_black.png';

const Logo = () => {
  return (
    <>
     	<h1 className="c-logo">
			<Link to="/">
				<img src={logo_black} alt="" />
			</Link>
		</h1>
    </>
  );
};

export default Logo