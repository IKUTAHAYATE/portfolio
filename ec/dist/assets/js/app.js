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
            ).process(this.active)

            new SizeBind(
                '.l-itemDetail__sizeItem',
                '.l-itemDetail__sizeSelect span'
            ).process(this.active)
        }
    }
    // ハンバーガーメニューclass化
    class Hamburger extends Animation {
        process(addClass) {
            $(this.trigger).on('click', (e) => {
                $(e.currentTarget).toggleClass(addClass);
                $(this.target).toggleClass(addClass);
            })
        }
    }
    
    // 詳細ページSelectSize箇所テキストバインド処理
    class SizeBind extends Animation {
        process(addClass) {
            $(this.trigger).on('click', (e) => {
                const select_size = $(e.currentTarget).text();
                $(e.currentTarget).addClass(addClass)
                    .siblings('li').removeClass(addClass);
                $(this.target).text(select_size);
            })
        }
    }

    const animation = new Animation();
    animation.execution();
})