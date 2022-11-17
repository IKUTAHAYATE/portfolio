"use strict";

// ページローダー処理
$(window).on('load', () => { $('.c-loader').fadeOut(); })

$(() => {
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

        // ハンバーガーメニューclass化
        class Hamburger extends Animation {
            process() {
                $(this.trigger).on('click', (e) => {
                    $(e.currentTarget).toggleClass(this.active);
                    $(this.target).toggleClass(this.active);
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

        // 商品説明アコーディオン
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

    // 各商品の出し分け処理
    const addItems = () => {
        const param_key = location.search.substring(1).split('=')[0],
            param_value = location.search.substring(1).split('=')[1];
        class Item {
            createDom(items) {
                let html_template = '';
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
                    </li>`;
                })
                return html_template;
            }
            execution() {
                const itemList = new ItemList(),
                    news = itemList.getItemList('new'),
                    categorys = ['men', 'woman', 'kids'],
                    _self = this;

                // item_dataのnewがつくitem表示
                $('[data-item-list="new"]').append(_self.createDom(news));

                // item_dataのカテゴリ別のitem表示
                categorys.forEach((category) => {
                    let item_list_category = itemList.getItemList('category', category);
                    item_list_category = _self.createDom(item_list_category);
                    $(`[data-item-list="${category}"]`).append(item_list_category);
                })

                // item_dataのpickupのitem表示
                let item_list_pickup = _self.createDom(this.pickUpShuffle(item_data));
                $('[data-item-list="pickup"]').append(item_list_pickup);

                // リストページのカテゴリ(MEN,WOMAN,KIDS)押下時の処理
                const item_list = this.createDom(itemList.getItemList(param_key));
                $('#sort-list').append(item_list);

                // 価格の変更時submit
                $('.l-sidebar__priceSelect').on('change', () => {
                    $('#price-form').submit();
                })

                // リストページ検索した商品が10個以下の場合「もっと見る」削除
                if ($('#sort-list').find('.c-item').length <= 10) $('[data-more-btn="items"]').hide();

                const showDetail =  new ShowDetail();
                showDetail.getItem();
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

        // 詳細ページ表示処理
        class ShowDetail {
            getItemSingle() {
                return item_data.find((item) => {
                   return item['id'] === Number(param_value);
                })
            }
            getItem() {
                const item_detail = this.getItemSingle();
                Object.keys(item_detail).forEach((key) =>  {
                    $(`[data-item-parts="${key}"]`).text(item_detail[key]);
                })
                $('[data-item-parts="img"]').attr('src', `assets/img/item/${item_detail['id']}.png`);
                if( !item_detail['new'] )$('.new-label').remove();
            }
        }

        // itemクラスインスタンス化
        const item = new Item();
        item.execution();
    }

    // リストページもっと見るボタン処理
    const moreButton = () => {
        // ブランドは3つずつ、商品は10つずつ表示させる
        const more_count = {
            'brand': 3,
            'items': 10
        }
        class More {
            constructor(brand, items) {
                this.brand = brand;
                this.items = items;
            }
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
        const more = new More(
            more_count['brand'],
            more_count['items'],
        )
        more.execution();
    }

    runAnimation();
    addItems();
    moreButton();
})