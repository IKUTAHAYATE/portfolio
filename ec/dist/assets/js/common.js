// ページローダー処理
$(window).on('load', () => { $('.c-loader').fadeOut(); })

// ページタイプの条件
const page_type = $('body').attr('id'),
page_type_criteria = {
	top: page_type === 'page-top',
	list: page_type === 'page-list',
	detail: page_type === 'page-detail'
}

// URLのパラメータ取得
const param_key = location.search.substring(1).split('=')[0],
	param_value = location.search.substring(1).split('=')[1];

// アイテムののDomを生成
const createDom = (items, delate_btn_flg = null) => {
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
const cartReload =  () => {
	setTimeout(() => { location.reload(); }, 200)
}

// 詳細ページ表示処理
const getItemSingle = () => {
	return item_data.find((item) => {
		return item['id'] === Number(param_value);
	})
}
const item_detail = getItemSingle();

// 詳細ページのアイテム表示処理
const getItem = () => {
	Object.keys(item_detail).forEach((key) =>  {
		$(`[data-item-parts="${key}"]`).text(item_detail[key]);
	})
	$('.l-itemDetail').attr('data-item-id', item_detail['id']);
	$('[data-item-parts="img"]').attr('src', `assets/img/item/${item_detail['id']}.png`);
	if( !item_detail['new'] )$('[data-item="new"]').remove();
}