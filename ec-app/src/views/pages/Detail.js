import Header from '../components/modules/Header'
import Footer from '../components/modules/Footer'
import ContextApi from '../../context/ContextApi'
import DetailItem from '../components/block/DetailItem'

const Detail = () => {
	return (
		<>
			<Header />
			<ContextApi>
				<DetailItem />
			</ContextApi>
			<Footer />
		</>
	)
}

export default Detail