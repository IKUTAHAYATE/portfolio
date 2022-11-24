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
			if( cart_storage !== null ){
				const cart_items = item_data.filter(function(item) {
					if( cart_storage.indexOf(item['id']) !== -1 ){
						return item;
					}
				});
				const cartList = document.getElementById('cart-list');
				cartList.innerHTML = createDom(cart_items);
			}
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
			this.getCartDetail()
		}
	}
	const storageControl = new StorageControl();
    storageControl.execution();
}