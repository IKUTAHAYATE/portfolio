import { item_data } from './item_data';
import { cartReload, createDom, page_type_criteria } from './common';

// ローカルストレージにカート処理
export const storage = () => {
	class StorageControl {
		itemId = Number(document.getElementsByTagName('body')[0].dataset.name);

		// ローカルストレージにidが入っているか判定
        storageJudge(id: number, storage_type: string) :boolean {
            let storage_data = JSON.parse(localStorage.getItem(`ninco_${storage_type}`));
            id = Number(id);
            if( storage_data !== null ){
                return storage_data.indexOf(id) !== -1;
            }
        }

		// ローカルストレージの中身がnullの場合idをセットする
        storageSet(id: number, storage_type: string) {
            let storage_data = JSON.parse(localStorage.getItem(`ninco_${storage_type}`));
            id = Number(id);
            if( storage_data === null ) {
                storage_data = [id];
            }else{
                if( this.storageJudge(id, storage_type) ){
                    storage_data.splice(storage_data.indexOf(id), 1);
                }else{
                    storage_data.push(id);
                }
            }
            localStorage.setItem(`ninco_${storage_type}`, JSON.stringify(storage_data));                
        }

		// カートに追加するを押下した際に擬似的にリロード処理
		doneFlash(text: string) {
			document.getElementsByTagName('body')[0].innerHTML = `<div class="c-cart__flash">${text}</div>`;
            cartReload();
        }

		// カートに追加するに選択したアイテムをローカルストレージベースでショッピングカートに追加
		getCartDetail() {
			//カートに入れたアイテムを生成
			const cart_storage = JSON.parse(localStorage.getItem('ninco_cart'));
			let cart_price = 0;
			if( cart_storage !== null ){
				const cart_items = item_data.filter(function(item) {
					if( cart_storage.indexOf(item['id']) !== -1 ){
						cart_price += item['price'];
						return item;
					}
				});
				const cartList = document.getElementById('cart-list');
				
				//カートの合計金額を出力
				document.getElementsByClassName('c-cart__price')[0].textContent = cart_price + '円';
				//カートの合計点数を計算
				document.getElementsByClassName('c-cart__num')[0].textContent = cart_storage.length;
				if( cart_storage.length <= 0 ){
					document.getElementsByClassName('c-controls__batch')[0].remove();
				}
				cartList.innerHTML = createDom(cart_items, true);
				this.storageDelete(this.itemId);
			}else {
				document.getElementsByClassName('c-controls__batch')[0].remove();
			}
		}

		//カートからアイテムを削除
        storageDelete(id: number) {
			const cartDelete  = document.getElementsByClassName('c-cart__delete')[0];
			cartDelete.addEventListener('click', () => {
                if( confirm('本当に削除して良いですか?') ){
                    this.storageSet(id, 'cart');
                    cartReload();
                }
            })
        }

		//カート、お気に入りに追加
        addType($trigger: Element, type: string, text: string) {
			//カートに追加
			$trigger.addEventListener('click', () => {
				this.storageSet(this.itemId, type);
				if( this.storageJudge(this.itemId, type) ){
					this.doneFlash(`${text}に追加しました。`);
				}else{
					this.doneFlash(`${text}から外しました。`);
				}
			})
        }

		// お気に入りに追加したアイテムをページ下部に表示
        showFav() {
            const fav_storage = JSON.parse(localStorage.getItem('ninco_fav'));
			const item_listFav = document.getElementById('js-item-fav');
            if( fav_storage !== null ){
                const fav_items = item_data.filter((item) => {
                    if( fav_storage.indexOf(item['id']) !== -1 ){
                        return item;
                    }
                });
				item_listFav.innerHTML = createDom(fav_items);
            }
        }

		//購入ボタンを押したときの処理
        strageBuy() {
			const cartBuy = document.getElementsByClassName('c-btn--buy')[0];
			cartBuy.addEventListener('click', (e) => {
				e.preventDefault();
				if( confirm('購入して良いですか?') ){
					localStorage.removeItem('ninco_cart');
					alert('購入しました！');
					cartReload();
				}
            })
        }

		execution() {
			const cartBtn = document.getElementsByClassName('c-btn--cart')[0];
			const favBtn = document.getElementsByClassName('c-btn--fav')[0];

			// 詳細ページの時
            if( page_type_criteria.detail ){
				this.addType(cartBtn, 'cart', 'カート')
				this.addType(favBtn, 'fav', 'お気に入り')
            }
			this.showFav();
			this.getCartDetail();
			this.strageBuy();
		}
	}
	const storageControl = new StorageControl();
    storageControl.execution();
}