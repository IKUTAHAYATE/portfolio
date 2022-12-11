import Header from '../organisms/Header'
import SimpleSlider from '../organisms/Slider'
import Brand from '../molecules/Brand'
import Footer from '../organisms/Footer'
import ContextApi from '../../store/ContextApi'
import GetItems from '../molecules/GetItems'
import { RecoilRoot } from 'recoil'

const Home = () => {

    return (
		<RecoilRoot>
			<ContextApi>
				<Header />
				<div className='l-contents'>
					<SimpleSlider />
					<GetItems />
					<Brand />
				</div>
				<Footer />
			</ContextApi>
		</RecoilRoot>
    )
  }
  
export default Home;