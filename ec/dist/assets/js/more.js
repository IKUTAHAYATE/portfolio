// リストページもっと見るボタン処理
const moreButton = () => {
	// ブランドは3つずつ、アイテムは10つずつ表示させる
	const more_count = {
		'brand': 3,
		'items': 10
	}
	class More {
		constructor(brand, items) {
			this.brand = brand;
			this.items = items;
		}

		// アイテムやブランドの数分だけ表示処理
		moreControl(el, num) {
			const more_type = $(el).attr('data-more-btn'),
				target_list = $(`[data-more-list="${more_type}"]`),
				max_count = target_list.find('li').length;
			more_count[more_type] += num;
			target_list.find(`li:lt(${more_count[more_type]})`).fadeIn();
			if( more_count[more_type] >= max_count )$(el).hide();
		}

		execution() {
			const _self = this;
			$('[data-more-btn="brand"]').on('click',(e) => {
				_self.moreControl($(e.currentTarget), _self.brand);
			})
			$('[data-more-btn="items"]').on('click',(e) => {
				_self.moreControl($(e.currentTarget), _self.items);
			})
		}
	}
	if ( page_type_criteria.list ) {
		const more = new More(
			more_count['brand'],
			more_count['items'],
		)
		more.execution();
	}
}