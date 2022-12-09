import Header from '../components/modules/Header'
import SimpleSlider from '../components/modules/Slider'
import Brand from '../components/block/Brand'
import Footer from '../components/modules/Footer'
import GetItem from '../components/block/GetItem'
import StateApi from '../../context/StateApi'

const Home = () => {
    return (
      	<>
			<Header />
			<div className='l-contents'>
				<SimpleSlider />
					<StateApi>
						<GetItem type='new'/>
						<GetItem type='men'/>
						<GetItem type='woman'/>
						<GetItem type='kids'/>	
					</StateApi>
				<Brand />
			</div>
			<Footer />
      	</>
    )
  }
  
export default Home;