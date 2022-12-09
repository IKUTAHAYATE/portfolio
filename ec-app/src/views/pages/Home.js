import Header from '../components/modules/Header'
import SimpleSlider from '../components/modules/Slider'
import Brand from '../components/block/Brand'
import Footer from '../components/modules/Footer'
import GetItem from '../components/block/GetItem'
import { RecoilRoot } from "recoil"

const Home = () => {
    return (
      	<>
			<Header />
			<div className='l-contents'>
				<SimpleSlider />
				<RecoilRoot>
					<GetItem />
				</RecoilRoot>
				<Brand />
			</div>
			<Footer />
      	</>
    )
  }
  
export default Home;