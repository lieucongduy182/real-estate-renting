import { GoogleMap, LoadScript, OverlayView } from "@react-google-maps/api";
import { Button } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { MAP_API_KEY, MAP_CENTER } from "../../../../utils/constant";
import { formatPrice } from "../../../../utils/function.utils";
import ModalHomeDetail from "../../../ModalHomeDetail/ModalHomeDetail";
import "./Map.scss";

const Map = ({
	data,
	updateData,
	onClickVisibleMap,
	itemIsHovered,
	user,
	firestore,
	firebase,
}) => {
	const [visibleModal, setVisibleModal] = useState(false);
	const [modalIsClicked, setModelIsClicked] = useState(null);
	const [stickStyleClassName, setStickStyleClassName] = useState(false);
	const [currentPositionMap, setCurrentPositionMap] = useState(0);
	const [map, setMap] = React.useState(null);
	const [xMapBounds, setXMapBounds] = useState({ min: null, max: null });
	const [yMapBounds, setYMapBounds] = useState({ min: null, max: null });
	const [mapFullyLoaded, setMapFullyLoaded] = useState(false);
	const [coordinates, setCoordinates] = useState(null);
	const [places, setPlaces] = useState(false);

	const handleMapChanged = () => {
		getMapBounds();
		setMapCenterPoint();
		console.log("Coordinates: ", coordinates);
		console.log("xMapBounds, yMapBounds: ", xMapBounds, yMapBounds);
	};

	const handleMapFullyLoaded = () => {
		if (mapFullyLoaded) return;

		setMapFullyLoaded(true);
		handleMapChanged();
	};

	const setMapCenterPoint = () => {
		setCoordinates({ lat: map.lat(), lng: map.lng() });
	};

	const getMapBounds = () => {
		let mapBounds = map.getBounds();
		let xMapBounds = mapBounds.b;
		let yMapBounds = mapBounds.f;

		setXMapBounds({ min: xMapBounds.b, max: xMapBounds.f });
		setYMapBounds({ min: yMapBounds.f, max: yMapBounds.b });
	};

	// useEffect(() => {
	// 	const stickMapToTop = (event) => {
	// 		const positionY = window.scrollY;
	// 		const mapElement = document.getElementById("map-wrap");

	// 		if (
	// 			window.pageYOffset + window.innerHeight + 50 >=
	// 			document.body.scrollHeight
	// 		) {
	// 			setStickStyleClassName("stick-bottom");
	// 		} else if (
	// 			positionY >
	// 			Math.max(mapElement.getBoundingClientRect().y, currentPositionMap)
	// 		) {
	// 			setStickStyleClassName("stick-top");
	// 		} else {
	// 			setStickStyleClassName("");
	// 		}
	// 	};
	// 	window.addEventListener("scroll", stickMapToTop);

	// 	return () => {
	// 		window.removeEventListener("scroll", stickMapToTop);
	// 	};
	// }, [currentPositionMap]);

	useEffect(() => {
		const mapElement = document.getElementById("map-wrap");
		if (mapElement) {
			setCurrentPositionMap(mapElement.getBoundingClientRect().y);
		}
	}, []);

	const showModal = (e, index) => {
		setVisibleModal(true);
		setModelIsClicked(index);
	};

	const handleOk = (e) => {
		setVisibleModal(false);
	};

	const handleCancel = (e) => {
		setVisibleModal(false);
	};

	const onMouseOverItem = (item) => {
		updateData(item);
	};

	const onMouseOutItem = (item) => {
		updateData(item, true);
	};

	const onLoad = React.useCallback(function callback(map) {
		setMap(map);
		console.log(map);
	}, []);

	return (
		<section
			id="map-wrap"
			className={`map-wrap ${stickStyleClassName}`}
			style={{ height: "100vh", width: "100%" }}
		>
			<LoadScript style={{ width: "100%" }} googleMapsApiKey={MAP_API_KEY}>
				<GoogleMap
					mapContainerStyle={{
						width: stickStyleClassName ? "50%" : "100%",
						height: "100%",
					}}
					center={MAP_CENTER}
					zoom={13}
					options={{
						scrollwheel: false,
						mapTypeControl: false,
						streetViewControl: false,
						fullscreenControl: false,
					}}
					onLoad={onLoad}
					// onZoomChanged={handleMapChanged}
					// onDragEnd={handleMapChanged}
					// onBoundsChanged={handleMapFullyLoaded}
				>
					<Button onClick={onClickVisibleMap}>X</Button>
					{data &&
						data.map((item, index) => {
							// console.log("vi tri :", index, item.lat, item.lng);
							return (
								<OverlayView
									key={index}
									position={{ lat: item.lat, lng: item.lng }}
									mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
								>
									<div
										className="u-marker-location"
										style={{
											background:
												item.id === itemIsHovered.id ? `#194B91` : "#0093E9",
											padding: `7px 8px`,
											fontSize: "12px",
											color: `white`,
											borderRadius: "8px",
											fontWeight: "bold",
											cursor: `pointer`,
										}}
										onClick={(e) => showModal(e, index)}
										onMouseOver={() => onMouseOverItem(item)}
										onMouseOut={() => onMouseOutItem(item)}
									>
										<span>{formatPrice(item.price)}</span>
									</div>
								</OverlayView>
							);
						})}
				</GoogleMap>
			</LoadScript>

			{modalIsClicked !== null && (
				<ModalHomeDetail
					visible={visibleModal}
					onOk={handleOk}
					onCancel={handleCancel}
					data={data[modalIsClicked]}
					user={user}
					firestore={firestore}
					firebase={firebase}
				/>
			)}
		</section>
	);
};

Map.propsType = {
	data: PropTypes.object,
};

export default React.memo(Map);
