import { item_data } from './item_data';
import { createDom, page_type_criteria, Itemdata } from './common';

// 各アイテムの出し分け処理
export const addItems = () => {
    class ItemList {
        categorys = ['men', 'woman', 'kids'];
        // URLのパラメータ取得
        param_key = location.search.substring(1).split('=')[0];
        param_value = location.search.substring(1).split('=')[1];

        getItemList(key: string, value?: string|null) {
            const search_value = value ? value : this.param_value;
            const items = item_data.filter((item: Itemdata) => {
                switch(key){
                    case 'brand':
                    case 'category':
                        return item[key] === search_value;
                        break;
                    case 'freeword':
                            return item['name'].indexOf(decodeURI(this.param_value)) !== -1 ||
                                item['text'].indexOf(decodeURI(this.param_value)) !== -1;
                        break;
                    case 'new':
                        return item['new'];
                        break;
                    case 'price': 
                        return item['price'] <= Number(search_value);
                        break;
                }
            });
            return items;
        }

        // picupのitemランダムで6つ出す処理
		pickUpShuffle(item_data: Itemdata[]) {
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

        // 検索条件の出し分け
        searchWordShow() {
            let result_text: string;
            if( this.param_key === 'price' ){
                result_text = `〜${this.param_value}円`;
            }
            else{
                result_text = this.param_value;
            }
            const resultTextArea = document.getElementById('js-result-text');
            resultTextArea.textContent= decodeURI(result_text);
        }

        // 詳細ページの情報取得
        getItemSingle() {
            return item_data.find((item) => {
                return item['id'] === Number(this.param_value);
            })
        }

        // 実行
        execution() {
            // トップページ時の処理
            if (page_type_criteria.top) {
                // newがつくアイテムの表示
                const news = this.getItemList('new');
                const newContent = document.getElementById('js-item-new');
                newContent.innerHTML = createDom(news);

                // 各カテゴリーのアイテム表示処理
                this.categorys.forEach((category) => {
                    let item_list_categorys = this.getItemList('category', category),
                        item_list_category = createDom(item_list_categorys),
                        categoryContent = document.getElementById(`js-item-${category}`);
                    categoryContent.innerHTML = item_list_category;
                })
            }

            // リストページ時の処理
            if (page_type_criteria.list) {
                // menubar,woman,kidsのカテゴリ選択時の処理
                const categoryItem = document.getElementById('js-more-item');
                categoryItem.innerHTML = createDom(this.getItemList(this.param_key));
                // 検索form実行時の処理
                this.searchWordShow();
            }

            if (page_type_criteria.detail) {
                // 詳細ページのアイテム詳細表示
                const item_detail = this.getItemSingle();
                document.getElementById('js-item-name').textContent = String(item_detail['name']);
                document.getElementById('js-item-price').textContent = String(item_detail['price']);
                document.getElementById('js-item-brand').textContent = String(item_detail['brand']);
                document.getElementById('js-itemDetail__target').textContent = String(item_detail['text']);
                document.getElementById('js-item-img').setAttribute('src', `/assets/img/item/${item_detail['id']}.png`);
                if (!item_detail['new']) document.getElementById('js-item-new').remove();
            }

            // item_dataのpickupのitem表示
			let item_list_pickup = createDom(this.pickUpShuffle(item_data));
            const picupContent = document.getElementById('js-item-pickup');
			picupContent.innerHTML = item_list_pickup;
        }
    }
    
    // インスタンス化
    const itemList = new ItemList();
    itemList.execution();
    itemList.getItemSingle();
}