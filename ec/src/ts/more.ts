// リストページもっと見るボタン処理
export const moreButton = () => {

	interface mores {
		$trigger: NodeListOf<HTMLElement>;
		control: () => void;
	}

	// 型判別
	type ObjType = {
		[key: string]: number;
	}

	class More implements mores {
		// ブランドは3つずつ、アイテムは10つずつ表示させる
		more_count: ObjType = {
			'brand': 3,
			'item': 10
		}
		$trigger = document.querySelectorAll<HTMLElement>('.l-sidebar__more');

		control() {
			// クリックする要素
			let countNum = 0,
				brandNum = 0,
				itemNum = 0,
				_elementType: string;

			this.$trigger.forEach((element) => {
				element.addEventListener('click', () => {

					// データ取得
					_elementType = element.dataset.more;
					const list_element = document.getElementById(`js-more-${_elementType}`);

					// ブランドとアイテムのカウントの箱を分ける
					countNum = _elementType === 'brand'? brandNum : itemNum;

					// 要素押下時の表示数上限
					let maxCountNum = (this.more_count[_elementType] * 2) + countNum;
					
					for (
						let i = (this.more_count[_elementType] + countNum);
						i < maxCountNum;
						i++
					) {
						if (list_element.childElementCount <= i) {
							element.remove();
							return;
						}
						// アイテムとブランドの表示数分の表示処理
						list_element.children[i].classList.add('is-active');
					}

					// ブランドとアイテムのカウントの箱を分ける
					_elementType === 'brand' ?
						brandNum += this.more_count[_elementType] :
						itemNum += this.more_count[_elementType]
				})
			})
		}
	}
	// インスタンス化
	const more = new More();
	more.control();
}