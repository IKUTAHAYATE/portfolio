export const runAnimation = () => {
	const isActive = 'is-active';

	// アニメーションに付属するクラスのインターフェイス
	interface Animations {
		readonly $trigger: HTMLElement |  NodeListOf<HTMLElement>;
		readonly $target: HTMLElement;
		clickEventHandler: () => void;
	}

	// 処理まとめる
    const putRender = () => {
		new Hamburger(
			document.getElementById('js-hamburger-trigger'),
			document.getElementById('js-hamburger-target')
		)
		new SizeBind(
			document.querySelectorAll<HTMLElement>('.l-itemDetail__sizeItem'),
			document.getElementById('js-item-size')
		).clickEventHandler();
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

	// 実行
	putRender();
}