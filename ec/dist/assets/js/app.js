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
                const items = item_data.filter((item) => {
                    switch(key){
                        case 'category':
                            return item[key] === value
                            break;
                        case 'new':
                            return item['new']
                            break;
                    }
                })
                return items;
            }
        }

        // itemクラスインスタンス化
        const item = new Item();
        item.execution();
    }

    runAnimation();
    addItems();
})