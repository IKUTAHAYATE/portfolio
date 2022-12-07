import { Link } from 'react-router-dom';

const BrandItem = () => {
	const BRAND_LIST = [
		"AAA",
		"BBB",
		"CCC",
		"DDD",
		"EEE",
		"FFF",
		"GGG",
		"HHH",
		"III",
		"JJJ",
		"KKK",
		"LLL"
	];
  	return (
		<ul className="p-brandList">
			{BRAND_LIST.map(item => {
				return (
					<li key={item} className="p-brandItem">
						<Link to={item}>{item}</Link>
					</li>
				)
			})}
		</ul>
  	);
};

export default BrandItem