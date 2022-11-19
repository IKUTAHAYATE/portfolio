// サイトで使用するアニメーション処理
const runAnimation = () => {
	class Animation {
		constructor($trigger, $target) {
			this.trigger =  $trigger;
			this.target =  $target;
			this.active = 'is-active';
		}
		execution() {
			new Hamburger(
				'[hamburger-menu="trigger"]',
				'[hamburger-menu="target"]'
			).process()

			new Modal(
				'[modal-menu="trigger"]',
				'[modal-menu="target"]'
			).process()

			if ( page_type_criteria.detail ) {
				new SizeBind(
					'[size-bind="trigger"]',
					'[size-bind="target"]'
				).process()

				new Review(
					'[review-item="trigger"]',
					'[review-item="target"]'
				).process()

				new ItemAccordion(
					'[item-accordion="trigger"]',
					'[item-accordion="targt"]'
				).process()
			}
		}
	}

	// ハンバーガーメニューclass化
	class Hamburger extends Animation {
		process() {
			$(this.trigger).on('click', (e) => {
				$(e.currentTarget).toggleClass(this.active);
				$(this.target).toggleClass(this.active);
			})
		}
	}

	// カートモーダル作成
	class Modal extends Animation {
		process() {
			$(this.trigger).on('click', (e) => {
				e.preventDefault();
				$(this.target).fadeToggle();
				$('[hamburger-menu="trigger"], [hamburger-menu="target"]').removeClass(this.active);
			})
			$('.c-modal__close').on('click', () => {
				$(this.target).fadeOut();
			})
		}
	}
	
	// 詳細ページSelectSize箇所テキストバインド処理
	class SizeBind extends Animation {
		process() {
			$(this.trigger).on('click', (e) => {
				const select_size = $(e.currentTarget).text();
				$(e.currentTarget).addClass(this.active)
					.siblings('li').removeClass(this.active);
				$(this.target).text(select_size);
			})
		}
	}

	// 詳細ペーレビュー機能実装
	class Review extends Animation {
		process() {
			let review_num = 0;
			$(this.trigger).on('click', (e) => {
				const _self = e.currentTarget;
				const _selfIndex = $(this.trigger).index(_self) + 1 ;
				if( review_num === _selfIndex ){
					$(this.trigger).removeClass(this.active);
					review_num = 0;
				}else{
					review_num = _selfIndex;
					$(this.trigger).removeClass(this.active);
					$(`.l-itemDetail__reviewItem:lt('${review_num}')`).addClass(this.active);
				}
				$(this.target).text(review_num);
			})
		}
	}

	// アイテム詳細説明アコーディオン
	class ItemAccordion extends Animation {
		process() {
			$(this.trigger).on('click', (e) => {
				$(e.currentTarget).toggleClass(this.active);
				$(this.target).slideToggle();
			})
		}
	}
	const animation = new Animation();
	animation.execution();
}