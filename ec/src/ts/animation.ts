import { page_type_criteria } from './common';

export const runAnimation = () => {
	const isActive = 'is-active';

	// アニメーションに付属するクラスのインターフェイス
	interface Animations {
		readonly $trigger: HTMLElement |  NodeListOf<HTMLElement>;
		readonly $target: HTMLElement;
		clickEventHandler: (index?: number) => void;
	}

	// 処理まとめる
    const putRender = () => {
		new Hamburger(
			document.getElementById('js-hamburger-trigger'),
			document.getElementById('js-hamburger-target')
		)

		new Modal(
			document.getElementById('js-modal-trigger'),
			document.getElementById('js-modal-target')
		)

		// 詳細ページのみ処理実行
		if ( page_type_criteria.detail ) {
			new SizeBind(
				document.querySelectorAll<HTMLElement>('.l-itemDetail__sizeItem'),
				document.getElementById('js-item-size')
			).clickEventHandler();
			
			new ItemAccordion(
				document.getElementById('js-item-text'),
				document.getElementById('js-itemDetail__target')
			)
	
			new Review(
				document.querySelectorAll<HTMLElement>('.l-itemDetail__reviewItem'),
				document.getElementById('js-item-review')
			)
		}
	}

	// ハンバーガーメニュー
	class Hamburger implements Animations {
		constructor(
			public $trigger: HTMLElement,
			public $target: HTMLElement
		) {
			$trigger.addEventListener('click', this.clickEventHandler.bind(this));
		}
		clickEventHandler() {
			this.$trigger.classList.toggle(isActive);
			this.$target.classList.toggle(isActive);
		}
	}

	// 詳細ページSelectSize箇所テキストバインド処理
	class SizeBind implements Animations {
		constructor(
			public $trigger:  NodeListOf<HTMLElement>,
			public $target: HTMLElement
		) {}
		clickEventHandler() {
			this.$trigger.forEach((element, index) => {
				// クリック処理
				this.$trigger[index].addEventListener('click', () =>  {
					if ( element.classList.contains(isActive) ) {
						this.$trigger[index].classList.remove(isActive);
						this.$target.textContent = 'ー';
						return;
					}else {
						this.$trigger.forEach((element) => {
							element.classList.remove(isActive);
						})
						this.$trigger[index].classList.add(isActive);
						
						// Select Size箇所の文字変更
						const select_size = element.textContent;
						this.$target.textContent = select_size;
					}
				})
			})
		}
	}

	// 詳細ページのアイテム詳細説明アコーディオン
	class ItemAccordion implements Animations {
		constructor(
			public $trigger: HTMLElement,
			public $target: HTMLElement
		) {
			$trigger.addEventListener('click', this.clickEventHandler.bind(this));
		}
		clickEventHandler() {
			this.$trigger.classList.toggle(isActive);
			this.$target.classList.toggle(isActive);
		}
	}

	// 詳細ペーレビュー機能実装
	class Review implements Animations {
		review_num = 3;
		constructor(
			public $trigger:  NodeListOf<HTMLElement>,
			public $target: HTMLElement
		) {
			this.$trigger.forEach((element, index) => {
				// クリック処理
				this.$trigger[index].addEventListener('click', () =>  { this.clickEventHandler(index) })
			})
		}
		clickEventHandler(index: number) {
			const _selfIndex = index + 1;
			// 同じ数値の場合
			if( this.review_num === _selfIndex ){
				this.$trigger.forEach((element) => {
					element.classList.remove(isActive);
				})
				this.review_num = 0;
			}else {
				this.review_num = _selfIndex;
				this.$trigger.forEach((element) => {
					element.classList.remove(isActive);
				})
				for (let i = 0; i < this.review_num; i++) {
					this.$trigger[i].classList.add(isActive)
				}
			}
			// 評価の数字を変更処理
			const review_text = String(this.review_num);
			this.$target.textContent = review_text;
		}
	}

	// ヘッダー部カートアイコン押下時のモーダル処理
	class Modal implements Animations {
		constructor(
			public $trigger: HTMLElement,
			public $target: HTMLElement
		) {
			$trigger.addEventListener('click', this.clickEventHandler.bind(this));
			document.getElementsByClassName('c-modal__close')[0]
				.addEventListener('click', () => {
					$target.classList.remove(isActive);
				})
		}
		clickEventHandler() {
			this.$target.classList.toggle(isActive);
		}
	}

	// 実行
	putRender();
}