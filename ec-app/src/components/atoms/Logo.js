import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <>
     	<h1 className="c-logo">
			<Link to="/">
				<img src="/assets/img/logo_black.png" alt="" />
			</Link>
		</h1>
    </>
  );
};

export default Logo