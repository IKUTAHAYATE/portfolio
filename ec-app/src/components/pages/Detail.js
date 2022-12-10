import Header from '../organisms/Header'
import Footer from '../organisms/Footer'
import ContextApi from '../../store/ContextApi'
import DetailItem from '../molecules/DetailItem'

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