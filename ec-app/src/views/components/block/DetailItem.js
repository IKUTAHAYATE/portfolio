import useItemData from "../../../hooks/useItemData"
import getError from "../atoms/getError"
import { useLocation } from 'react-router-dom'
import handlerCategoryType from "../../fanc/handlerCategoryType"
import DetaiMain from "./DatailMain"
import Review from "./Review"

const DetailItem = () => {

	const {isError, data, isLoading} = useItemData()

	getError(isError)

	const CheckId = () => {
		const search = useLocation().search
		const query = new URLSearchParams(search)
		const name = query.get('id')
		return name
	}

	const item = handlerCategoryType(data, 'detail', CheckId())

	return (
		<div className="l-inner">
			<div id="page-detail" className="l-contents">

				<DetaiMain
					isLoading={isLoading}
					item={item}
				/>

				<Review />

			</div>
		</div>
	)
};

export default DetailItem