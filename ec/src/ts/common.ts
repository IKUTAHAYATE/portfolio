const isActive = 'is-active';

export interface Itemdata {
	id: number;
	name: string;
	category: string;
	price: number;
	text: string;
	brand: string;
	new: boolean; 
}

// ページタイプの条件
const page_type = document.getElementsByTagName('body')[0].getAttribute("id");
export const page_type_criteria = {
	top: page_type === 'page-top',
	list: page_type === 'page-list',
	detail: page_type === 'page-detail'
}

// ローディング
export const loadFinished = () => {
    const loder = document.getElementsByClassName('c-loader');
    return loder[0].classList.add(isActive);
}

// アイテムののDomを生成
export const createDom = (items: Itemdata[], delate_btn_flg?: boolean) => {
	let html_template = '';
	let delate_dom = '';
	if(delate_btn_flg){
		delate_dom = '<div class="c-cart__delete"><img src="/assets/img/icon_delete.svg"></div>';
	}
	items.forEach((item) => {
		html_template += `<li class="c-item" data-item-id="${item['id']}">
		<a href="detail.html?id=${item['id']}">
		<div class="c-item__cap">
		<img src="/assets/img/item/${item['id']}.png" loading="lazy">
		</div>
		<div class="c-item__info">
		<h3 class="c-item__name">${item['name']}</h3>
		<p class="c-item__text">${item['text']}</p>
		<div class="c-item__price">¥${item['price']}</div>
		</div>
		</a>
		${delate_dom}
		</li>`;
	})
	return html_template;
}

// イベント発生時2秒間のラグで更新処理
export const cartReload =  () => {
	setTimeout(() => { location.reload(); }, 200)
}