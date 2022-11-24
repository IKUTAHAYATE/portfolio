import { item_data } from './item_data';
import { cartReload, createDom } from './common';

// ローカルストレージにカート処理
export const storage = () => {
	class StorageControl {
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
			}else {
				document.getElementsByClassName('c-controls__batch')[0].remove();
			}
		}

		//カートからアイテムを削除
        storageDelete(id: number) {
			const cartDelete  = document.getElementsByClassName('c-cart__delete')[0];
			cartDelete.addEventListener('click', (e) => {
                if( confirm('本当に削除して良いですか?') ){
                    this.storageSet(id, 'cart');
                    cartReload();
                }
            })
        }

		execution() {
			//カートに追加
			const btnCart = document.getElementsByClassName('c-btn--cart')[0];
			const itemId = Number(document.getElementsByTagName('body')[0].dataset.name);
			btnCart.addEventListener('click', () => {
				this.storageSet(itemId, 'cart');
				if( this.storageJudge(itemId, 'cart') ){
					this.doneFlash('カートに追加しました。');
				}else{
					this.doneFlash('カートから外しました。');
				}
			})
			this.getCartDetail();
			this.storageDelete(itemId);
		}
	}
	const storageControl = new StorageControl();
    storageControl.execution();
}