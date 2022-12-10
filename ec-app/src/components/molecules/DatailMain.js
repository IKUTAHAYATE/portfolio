import Accordion from "../atoms/Accordion"
import SizeList from "../atoms/SizeList"

const DetaiMain = ({isLoading, item}) => {

    return(
        <>
            {
                isLoading ? 'Loading中...'
                : (item.map(item => {
                    return(
                        <div key={item.id} className="l-itemDetail">
                            <div className="l-itemDetail__main">
                                <img id="js-item-img" src={`/assets/img/item/${item.id}_l.png`} alt="" />
                            </div>
                            <div className="l-itemDetail__info">
                                {item.new && <div id="js-item-new" className="is-new">New</div>}
                                <h2 id="js-item-name" className="l-itemDetail__name">{item.name}</h2>
                                <div className="l-itemDetail__brand">BRAND：<span id="js-item-brand">{item.brand}</span></div>
                                <div className="l-itemDetail__size">
                                    
                                    <SizeList />

                                </div>
                                <div className="l-itemDetail__price">¥<span id="js-item-price">{item.price}</span></div>
                                <div className="c-btn c-btn--cart"><span>カートに追加する</span></div>
                                <div className="c-btn c-btn--fav"><span>お気に入りに入れる</span></div>

                                <Accordion itemText={item.text} />
                                
                            </div>
                        </div>
                    )
                }))
            }
        </>
    )
}

export default DetaiMain