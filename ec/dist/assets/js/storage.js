// ローカルストレージにカート処理
const storage = () => {
    class StorageControl {
        // ローカルストレージにidが入っているか判定
        storageJudge(id, storage_type) {
            let storage_data = JSON.parse(localStorage.getItem(`ninco_${storage_type}`));
            id = Number(id);
            if( storage_data !== null ){
                return storage_data.indexOf(id) !== -1;
            }
        }

        // ローカルストレージの中身がnullの場合idをセットする
        storageSet(id, storage_type) {
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

        // カートに追加する押下時の処理
        doneFlash(text) {
            $('body').append(`<div class="c-cart__flash">${text}</div>`);
            cartReload();
        }
        
        //カートからアイテムを削除
        storageDelete() {
            const _self = this;
            $('.c-cart__delete').on('click', (e) => {
                if( confirm('本当に削除して良いですか?') ){
                    const item_id = $(e.currentTarget).parents('[data-item-id]').attr('data-item-id');
                    _self.storageSet(item_id, 'cart');
                    cartReload();
                }
            })
        }

        //購入ボタンを押したときの処理
        strageBuy() {
            $('.c-btn--buy').on('click', (e) => {
                e.preventDefault();
                if( confirm('購入して良いですか?') ){
                    localStorage.removeItem('ninco_cart');
                    alert('購入しました！');
                    cartReload();
                }
            })
        }

        //カート、お気に入りに追加
        addType($trigger, type, text) {
            const _self = this;
            $trigger.on('click', (e) => {
                const item_id = $(e.currentTarget).parents('.l-itemDetail').attr('data-item-id');
                _self.storageSet(item_id, type);
                if( _self.storageJudge(item_id, type) ){
                    _self.doneFlash(`${text}に追加しました。`);
                }else{
                    _self.doneFlash(`${text}から外しました。`);
                }
            })
        }         
        
        // お気に入りに追加したアイテムをページ下部に表示
        showFav() {
            const fav_storage = JSON.parse(localStorage.getItem('ninco_fav'));
            if( fav_storage !== null ){
                const fav_items = item_data.filter((item) => {
                    if( fav_storage.indexOf(item['id']) !== -1 ){
                        return item;
                    }
                });
                $('[data-item-list="fav"]').append(createDom(fav_items));
            }
        }

        execution() {
            const _self = this;
            //カートに入れたアイテムを生成
            const cart_storage = JSON.parse(localStorage.getItem('ninco_cart'));
            let cart_price = 0;
            if( cart_storage !== null ){
                const cart_items = item_data.filter((item) => {
                    if( cart_storage.indexOf(item['id']) !== -1 ){
                        cart_price += item['price'];
                        return item;
                    }
                })
                 //カートの合計金額を出力
                $('.c-cart__price').text(cart_price + '円');
                //カートの合計点数を計算
                $('.c-controls__batch, .c-cart__num').text(cart_storage.length);
                if( cart_storage.length <= 0 ){
                    $('.c-controls__batch').hide();
                }
                $('#cart-list').append(createDom(cart_items, true));
            }else {
                $('.c-controls__batch').hide();
            }

            // 詳細ページの時
            if( page_type === 'page-detail' ){
                const storage_types = ['cart', 'fav'];
                
                // ストレージのタイプに合わせてボタンの状態変更処理
                storage_types.forEach(function(type){
                    if( _self.storageJudge(item_detail['id'], type) ){
                        $(`.c-btn--${type}`).addClass('is-storage');
                    }
                })
            }

            this.addType($('.c-btn--cart'), 'cart', 'カート')
            this.addType($('.c-btn--fav'), 'fav', 'お気に入り')
            this.showFav();
            this.storageDelete()
            this.strageBuy();
        }
    }
    const storageControl = new StorageControl();
    storageControl.execution();
}