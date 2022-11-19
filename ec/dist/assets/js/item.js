// 各アイテムの出し分け処理
const addItems = () => {
	class Item {
		execution() {
			const itemList = new ItemList(),
				news = itemList.getItemList('new'),
				categorys = ['men', 'woman', 'kids'],
				_self = this;

			// item_dataのnewがつくitem表示
			$('[data-item-list="new"]').append(createDom(news));

			// item_dataのカテゴリ別のitem表示
			categorys.forEach((category) => {
				let item_list_category = itemList.getItemList('category', category);
				item_list_category = createDom(item_list_category);
				$(`[data-item-list="${category}"]`).append(item_list_category);
			})

			// item_dataのpickupのitem表示
			let item_list_pickup = createDom(this.pickUpShuffle(item_data));
			$('[data-item-list="pickup"]').append(item_list_pickup);

			if ( page_type_criteria.list ) {
				// リストページのカテゴリ(MEN,WOMAN,KIDS)押下時の処理
				const item_list = createDom(itemList.getItemList(param_key));
				$('#sort-list').append(item_list);
				
				// 価格の変更時submit
				$('.l-sidebar__priceSelect').on('change', () => {
					$('#price-form').submit();
				})

				// リストページ検索したアイテムが10個以下の場合「もっと見る」削除
				if ($('#sort-list').find('.c-item').length <= 10) $('[data-more-btn="items"]').hide();
			}

			// 詳細ページアイテム表示
			if ( page_type_criteria.detail ) {
				getItem();
			}
		}

		// picupのitemランダムで6つ出す処理
		pickUpShuffle(item_data) {
			let items = [],
				rand_check = [];
			for( let i = 0; i < 6; i++ ){
				let j = Math.floor(Math.random() * item_data.length + 1);
				if( rand_check.indexOf(j) !== -1 ){
					i--;
					continue;
				}else{
					rand_check.push(j);
					items.push(item_data[j]);
				}
			}
			return items;
		}
	}

	// item_dataに入っているオブジェクトを条件で出し分けて返す
	class ItemList {
		getItemList(key, value = null) {
				// 検索条件の出し分け
			const searchWordShow = () => {
					let result_text;
					if( param_key === 'price' ){
						result_text = `〜${param_value}円`;
						$(`.l-sidebar__priceSelect option[value="${param_value}"]`).prop('selected', true);
					}else{
						result_text = param_value;
					}
					$('#result-text').text(decodeURI(result_text));
				},
				search_value = value ? value : param_value,
				freewords = ['name', 'text'],
				items = item_data.filter((item) => {
				switch(key) {
					case 'category':
					case 'brand':
						return item[key] === search_value;
						break;
					case 'freeword':
						return freewords.find((freeword) => {
							return item[freeword].indexOf(decodeURI(param_value)) !== -1;
						})
						break;
					case 'price':
						return item['price'] <= search_value
						break;
					case 'new':
						return item['new'];
						break;
				}
			})

			// 検索機能(フリーワード)の処理
			searchWordShow();
			return items;
		}
	}

	// itemクラスインスタンス化
	const item = new Item();
	item.execution();
}