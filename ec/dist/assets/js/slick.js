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