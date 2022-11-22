import { item_data } from './item_data';
import { createDom, page_type_criteria, Itemdata } from './common';

// 各アイテムの出し分け処理
export const addItems = () => {
    class ItemList {
        categorys = ['men', 'woman', 'kids'];

        getItemList(key: string, value?: string|null) {
            const items = item_data.filter(function(item) {
                switch(key){
                    case 'category':
                        return item[key] == value
                        break;
                    case 'new':
                        return item['new']
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
            // item_dataのpickupのitem表示
			let item_list_pickup = createDom(this.pickUpShuffle(item_data));
            const picupContent = document.getElementById('js-item-pickup');
			picupContent.innerHTML = item_list_pickup;
        }
    }
    
    // インスタンス化
    const itemList = new ItemList();
    itemList.execution();
}