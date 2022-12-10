import Header from '../components/modules/Header'
import SimpleSlider from '../components/modules/Slider'
import Brand from '../components/block/Brand'
import Footer from '../components/modules/Footer'
import ContextApi from '../../context/ContextApi'
import GetItems from './GetItems'

const Home = () => {

    return (
      	<>
			<ContextApi>
				<Header />
				<div className='l-contents'>
					<SimpleSlider />
					<GetItems />
					<Brand />
				</div>
				<Footer />
			</ContextApi>
      	</>
    )
  }
  
export default Home;