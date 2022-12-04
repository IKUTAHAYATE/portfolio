import Icon_cart_black from '../../../assets/img/icon_cart_black.svg';

const Controls = () => {
  return (
	<div className="c-controls">
		<div id="js-modal-trigger" className="c-controls__cart">
			<img src={Icon_cart_black} alt="" />
			<span className="c-controls__batch"></span>
		</div>
	</div>
  );
};

export default Controls