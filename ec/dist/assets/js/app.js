"use strict";

// ページローダー処理
$(window).on('load', () => { $('.c-loader').fadeOut(); })

$(() => {
    // ページタイプの条件
    const page_type = $('body').attr('id'),
        page_type_criteria = {
        top: page_type === 'page-top',
        list: page_type === 'page-list',
        detail: page_type === 'page-detail'
    }

    // URLのパラメータ取得
    const param_key = location.search.substring(1).split('=')[0],
            param_value = location.search.substring(1).split('=')[1];

    // アイテムののDomを生成
    const createDom = (items, delate_btn_flg = null) => {
        let html_template = '';
        let delate_dom = '';
		if(delate_btn_flg){
			delate_dom = '<div class="c-cart__delete"><img src="/assets/img/icon_delete.svg"></div>';
		}
        items.forEach((item) => {
            html_template += `<li class="c-item" data-item-id="${item['id']}">
            <a href="detail.html?id=${item['id']}">
            <div class="c-item__cap">
            <img src="/assets/img/item/${item['id']}.png" loading="lazy">
            </div>
            <div class="c-item__info">
            <h3 class="c-item__name">${item['name']}</h3>
            <p class="c-item__text">${item['text']}</p>
            <div class="c-item__price">¥${item['price']}</div>
            </div>
            </a>
            ${delate_dom}
            </li>`;
        })
        return html_template;
    }

    // イベント発生時2秒間のラグで更新処理
    const cartReload =  () => {
        setTimeout(() => { location.reload(); }, 200)
    }

    // 詳細ページ表示処理
    const getItemSingle = () => {
        return item_data.find((item) => {
            return item['id'] === Number(param_value);
        })
    }
    const item_detail = getItemSingle();
    
    // 詳細ページのアイテム表示処理
    const getItem = () => {
        Object.keys(item_detail).forEach((key) =>  {
            $(`[data-item-parts="${key}"]`).text(item_detail[key]);
        })
        $('.l-itemDetail').attr('data-item-id', item_detail['id']);
        $('[data-item-parts="img"]').attr('src', `assets/img/item/${item_detail['id']}.png`);
        if( !item_detail['new'] )$('[data-item="new"]').remove();
    }

    // slickをトップページのみ適用
    if( location.pathname === '/' ){
        // トップページスリック処理
        const showSlick = () => {
            $('#js-slider').slick({
                arrows:true,
                autoplay:true,
                dots:true,
                speed:1500,
                easing:'swing',
                centerMode:true,
                centerPadding:'25%',
                prevArrow:'<div class="l-slider__btn is-prev"></div>',
                nextArrow:'<div class="l-slider__btn is-next"></div>',
                responsive:[
                    {
                        breakpoint:768,
                        settings:{
                            centerPadding:'0%',
                            slidesToShow:1,
                            slidesToScroll:1,
                        }
                    }
                ]
            })
        }
        showSlick();
    }

    // サイトで使用するアニメーション処理
    const runAnimation = () => { 
        class Animation {
            constructor($trigger, $target) {
                this.trigger =  $trigger;
                this.target =  $target;
                this.active = 'is-active';
            }
            execution() {
                new Hamburger(
                    '[hamburger-menu="trigger"]',
                    '[hamburger-menu="target"]'
                ).process()

                new Modal(
                    '[modal-menu="trigger"]',
                    '[modal-menu="target"]'
                ).process()
    
                if ( page_type_criteria.detail ) {
                    new SizeBind(
                        '[size-bind="trigger"]',
                        '[size-bind="target"]'
                    ).process()

                    new Review(
                        '[review-item="trigger"]',
                        '[review-item="target"]'
                    ).process()

                    new ItemAccordion(
                        '[item-accordion="trigger"]',
                        '[item-accordion="targt"]'
                    ).process()
                }
            }
        }

        // ハンバーガーメニューclass化
        class Hamburger extends Animation {
            process() {
                $(this.trigger).on('click', (e) => {
                    $(e.currentTarget).toggleClass(this.active);
                    $(this.target).toggleClass(this.active);
                })
            }
        }

        // カートモーダル作成
        class Modal extends Animation {
            process() {
                $(this.trigger).on('click', (e) => {
                    e.preventDefault();
                    $(this.target).fadeToggle();
                    $('[hamburger-menu="trigger"], [hamburger-menu="target"]').removeClass(this.active);
                })
                $('.c-modal__close').on('click', () => {
                    $(this.target).fadeOut();
                })
            }
        }
        
        // 詳細ページSelectSize箇所テキストバインド処理
        class SizeBind extends Animation {
            process() {
                $(this.trigger).on('click', (e) => {
                    const select_size = $(e.currentTarget).text();
                    $(e.currentTarget).addClass(this.active)
                        .siblings('li').removeClass(this.active);
                    $(this.target).text(select_size);
                })
            }
        }
    
        // 詳細ペーレビュー機能実装
        class Review extends Animation {
            process() {
                let review_num = 0;
                $(this.trigger).on('click', (e) => {
                    const _self = e.currentTarget;
                    const _selfIndex = $(this.trigger).index(_self) + 1 ;
                    if( review_num === _selfIndex ){
                        $(this.trigger).removeClass(this.active);
                        review_num = 0;
                    }else{
                        review_num = _selfIndex;
                        $(this.trigger).removeClass(this.active);
                        $(`.l-itemDetail__reviewItem:lt('${review_num}')`).addClass(this.active);
                    }
                    $(this.target).text(review_num);
                })
            }
        }

        // アイテム詳細説明アコーディオン
        class ItemAccordion extends Animation {
            process() {
                $(this.trigger).on('click', (e) => {
                    $(e.currentTarget).toggleClass(this.active);
                    $(this.target).slideToggle();
                })
            }
        }
        const animation = new Animation();
        animation.execution();
    }

    // 各アイテムの出し分け処理
    const addItems = () => {
        class Item {
            execution() {
                const itemList = new ItemList(),
                    news = itemList.getItemList('new'),
                    categorys = ['men', 'woman', 'kids'],
                    _self = this;

                // item_dataのnewがつくitem表示
                $('[data-item-list="new"]').append(createDom(news));

                // item_dataのカテゴリ別のitem表示
                categorys.forEach((category) => {
                    let item_list_category = itemList.getItemList('category', category);
                    item_list_category = createDom(item_list_category);
                    $(`[data-item-list="${category}"]`).append(item_list_category);
                })

                // item_dataのpickupのitem表示
                let item_list_pickup = createDom(this.pickUpShuffle(item_data));
                $('[data-item-list="pickup"]').append(item_list_pickup);

                if ( page_type_criteria.list ) {
                    // リストページのカテゴリ(MEN,WOMAN,KIDS)押下時の処理
                    const item_list = createDom(itemList.getItemList(param_key));
                    $('#sort-list').append(item_list);
                    
                    // 価格の変更時submit
                    $('.l-sidebar__priceSelect').on('change', () => {
                        $('#price-form').submit();
                    })

                    // リストページ検索したアイテムが10個以下の場合「もっと見る」削除
                    if ($('#sort-list').find('.c-item').length <= 10) $('[data-more-btn="items"]').hide();
                }

                // 詳細ページアイテム表示
                if ( page_type_criteria.detail ) {
                    getItem();
                }
            }

            // picupのitemランダムで6つ出す処理
            pickUpShuffle(item_data) {
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
        }

        // item_dataに入っているオブジェクトを条件で出し分けて返す
        class ItemList {
            getItemList(key, value = null) {
                    // 検索条件の出し分け
                const searchWordShow = () => {
                        let result_text;
                        if( param_key === 'price' ){
                            result_text = `〜${param_value}円`;
                            $(`.l-sidebar__priceSelect option[value="${param_value}"]`).prop('selected', true);
                        }else{
                            result_text = param_value;
                        }
                        $('#result-text').text(decodeURI(result_text));
                    },
                    search_value = value ? value : param_value,
                    freewords = ['name', 'text'],
                    items = item_data.filter((item) => {
                    switch(key) {
                        case 'category':
                        case 'brand':
                            return item[key] === search_value;
                            break;
                        case 'freeword':
                            return freewords.find((freeword) => {
                                return item[freeword].indexOf(decodeURI(param_value)) !== -1;
                            })
                            break;
                        case 'price':
                            return item['price'] <= search_value
                            break;
                        case 'new':
                            return item['new'];
                            break;
                    }
                })

                // 検索機能(フリーワード)の処理
                searchWordShow();
                return items;
            }
        }

        // itemクラスインスタンス化
        const item = new Item();
        item.execution();
    }

    // リストページもっと見るボタン処理
    const moreButton = () => {
        // ブランドは3つずつ、アイテムは10つずつ表示させる
        const more_count = {
            'brand': 3,
            'items': 10
        }
        class More {
            constructor(brand, items) {
                this.brand = brand;
                this.items = items;
            }

            // アイテムやブランドの数分だけ表示処理
            moreControl(el, num) {
                const more_type = $(el).attr('data-more-btn'),
                    target_list = $(`[data-more-list="${more_type}"]`),
                    max_count = target_list.find('li').length;
                more_count[more_type] += num;
                target_list.find(`li:lt(${more_count[more_type]})`).fadeIn();
                if( more_count[more_type] >= max_count )$(el).hide();
            }

            execution() {
                const _self = this;
                $('[data-more-btn="brand"]').on('click',(e) => {
                    _self.moreControl($(e.currentTarget), _self.brand);
                })
                $('[data-more-btn="items"]').on('click',(e) => {
                    _self.moreControl($(e.currentTarget), _self.items);
                })
            }
        }
        if ( page_type_criteria.list ) {
            const more = new More(
                more_count['brand'],
                more_count['items'],
            )
            more.execution();
        }
    }

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
                this.storageDelete()
                this.strageBuy();
            }
        }
        const storageControl = new StorageControl();
        storageControl.execution();
    }

    runAnimation();
    addItems();
    moreButton();
    storage();
})