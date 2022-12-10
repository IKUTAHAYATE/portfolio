import CommonLink from '../molecules/CommonLink'
import Sns from '../molecules/Sns'

const Footer = () => {
  return (
    <>
     	<footer className="l-footer">
			<div className="l-footer__inner l-inner">
				<div className="l-footer__logo">NINCO</div>
				<Sns />
			</div>
			<CommonLink />
		</footer>
    </>
  );
};

export default Footer