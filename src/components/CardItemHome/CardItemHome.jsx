import {
	DollarCircleOutlined,
	EnvironmentOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import DefaultImg from "../../assets/img/building.jpg";
import { DEFAULT_DISTRICT } from "../../utils/constant";
import { formatPrice } from "../../utils/function.utils";
import "./CardItemHome.scss";

const CardItemHome = ({
	updateData,
	openModalDetail,
	itemIsHovered,
	item,
	...data
}) => {
	// const [postedDate, setPostedDate] = useState()
	// useEffect(() => {
	//     setPostedDate(getDateFromTimestamp(data.postedTimestamp))
	// }, [data.postedTimestamp])

	const onMouseOverItem = (item) => {
		updateData(item);
	};

	const onMouseOutItem = (item) => {
		updateData(item, true);
	};

	const handleClick = (e) => {
		e.stopPropagation();
		openModalDetail(data);
	};
	const {
		postImg: img,
		district: location,
		price,
		room = 3,
		content: description,
		timeStamp,
	} = data;

	return (
		<div
			className={`card-item-home ${
				itemIsHovered && itemIsHovered.id === item.id ? "active" : ""
			}`}
			onMouseOver={() => onMouseOverItem(item)}
			onMouseOut={() => onMouseOutItem(item)}
			onClick={handleClick}
		>
			<figure className="img-wrap">
				<img
					src={!!img ? (img.length > 0 ? img[0].link : DefaultImg) : DefaultImg}
					alt="Home"
					onError={(e) => {
						e.target.src = DefaultImg;
					}}
				/>
			</figure>

			<div className="cart-content">
				<div className="title">
					<Link to="/">{description}</Link>
				</div>
				<div className="date">{timeStamp}</div>

				<div className="info-with-icon">
					<div className="info-icon-item location">
						<span className="icon u-icon">
							<EnvironmentOutlined />
						</span>
						<span className="content">{location || DEFAULT_DISTRICT}</span>
					</div>

					<div className="info-icon-item price">
						<span className="icon u-icon">
							<DollarCircleOutlined />
						</span>
						<span className="content">{formatPrice(price)}</span>
					</div>

					<div className="info-icon-item home">
						<span className="icon u-icon">
							<HomeOutlined />
						</span>
						<span className="content">{room}</span>
					</div>
				</div>
				<div className="description">{description}</div>
			</div>
		</div>
	);
};

CardItemHome.propTypes = {
	img: PropTypes.string,
	title: PropTypes.string,
	date: PropTypes.string,
	location: PropTypes.string,
	price: PropTypes.number,
	room: PropTypes.number,
	description: PropTypes.string,
};

export default CardItemHome;
