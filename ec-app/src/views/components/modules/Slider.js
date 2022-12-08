import React from "react"
import Slick from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import image from '../../../assets/img/banner1.png'
import image2 from '../../../assets/img/banner2.png'
import image3 from '../../../assets/img/banner3.png'

const KeySlider = () => {
  const settings = {
    speed: 500,
	arrows: false,
	autoplay: true,
	centerMode: true,
	centerPadding: "100px",
	responsive: [
		{
		  breakpoint: 768,
		  settings: {
			  centerMode: false
		  },
		},
	  ],
  };

  const images = [image, image2, image3]
  return (
	<ul className="c-slick">
		<Slick {...settings}>
			{images.map((img, index) => {
				return (
					<img key={index} src={img} alt="" />
				)
			})}
		</Slick>
	</ul>
  )
}

export default KeySlider