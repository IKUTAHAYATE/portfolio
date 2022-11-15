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
                if( review_num === $(this.trigger).index(_self) + 1 ){
                    $(this.trigger).removeClass(this.active);
                    review_num = 0;
                }else{
                    review_num = $(this.trigger).index(_self) + 1;
                    $(this.trigger).removeClass(this.active);
                    $(`.l-itemDetail__reviewItem:lt('${review_num}')`).addClass(this.active);
                }
                $(this.target).text(review_num);
            });
        }
        
    }

    const animation = new Animation();
    animation.execution();
})