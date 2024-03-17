import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./CustomCarousel.scss";
import { DEFAULT_RESPONSIVE } from "../../../../utils/constant";

const CustomCarousel = ({ ...props }) => {
	return (
		<Carousel
			className="img-wrap"
			showDots={true}
			responsive={DEFAULT_RESPONSIVE}
			swipeable
			draggable
			removeArrowOnDeviceType={["mobile", "tablet"]}
		>
			{!!props.data
				? props.data.map((img) => {
						return <img src={img.link} alt="img" key={img.id} />;
				  })
				: [].map((img) => {
						return <img src={img.link} alt="img" key={img.id} />;
				  })}
		</Carousel>
	);
};

export default CustomCarousel;
