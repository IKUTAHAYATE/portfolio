import CommonLink from '../block/CommonLink'
import Sns from '../block/Sns'

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