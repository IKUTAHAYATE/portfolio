import Header from '../components/modules/Header'
import SimpleSlider from '../components/modules/Slider'
import Brand from '../components/block/Brand'
import Footer from '../components/modules/Footer'
import GetItem from '../../async/GetItem'

const Home = () => {
	console.log(GetItem)
    return (
      	<>
			<Header />
			<div className='l-contents'>
				<SimpleSlider />
				<Brand />
				{/* <GetItem /> */}
			</div>
			<Footer />
      	</>
    )
  }
  
export default Home;