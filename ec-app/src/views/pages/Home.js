import Header from '../components/modules/Header'
import SimpleSlider from '../components/block/Slider'
import Brand from '../components/block/Brand'
import Footer from '../components/modules/Footer'

const Home = () => {
    return (
      	<>
			<Header />
			<div className='l-contents'>
				<SimpleSlider />
				<Brand />
			</div>
			<Footer />
      	</>
    );
  };
  
export default Home;