export const runAnimation = () => {
	const isActive = 'is-active';

	// アニメーションに付属するクラスのインターフェイス
	interface Animations {
		readonly $trigger: HTMLElement;
		readonly $target: HTMLElement;
		clickEventHandler(): void;
	}

	// アニメーションクラス
    class Animation  {
		execution() {
			new Hamburger(
				document.getElementById('js-hamburger-trigger'),
				document.getElementById('js-hamburger-target')
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

	// 実行
	const animation = new Animation();
	animation.execution();
}