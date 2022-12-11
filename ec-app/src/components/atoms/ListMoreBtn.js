import { memo } from "react"
import { useRecoilState } from "recoil"
import moreBtnState from '../../store/moreBtnState'
import itemLengthState from "../../store/itemLengthState"

const ListMoreBtn = memo(() => {
	const [moreBtnContext, setMoreBtnContext] = useRecoilState(moreBtnState);
	const [ itemLength ] = useRecoilState(itemLengthState)


	if (itemLength < 10) {
		return
	}

	return(
		<div
			className={`l-sidebar__more ${moreBtnContext && 'is-active'}`}
			data-more="item"
			onClick={() => setMoreBtnContext(true)}
		>
			もっと見る＋
		</div>
	)
})

export default ListMoreBtn