import Header from '../organisms/Header'
import Footer from '../organisms/Footer'
import ContextApi from '../../store/ContextApi'
import ListAside from '../atoms/ListAside'
import ListItem from '../atoms/ListITem'
import { RecoilRoot } from 'recoil'

const List = () => {
	return(
		<>
			<RecoilRoot>
				<Header />
					<ContextApi>
					<div className="l-inner">
						<div id="page-list" className="l-contents">
							<div className="l-list">
								
								<ListAside />
								<ListItem />

							</div>
						</div>
					</div>
					</ContextApi>
				<Footer />
			</RecoilRoot>
		</>
	)
}

export default List