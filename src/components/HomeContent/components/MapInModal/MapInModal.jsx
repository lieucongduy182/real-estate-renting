import { GoogleMap, LoadScript, OverlayView } from "@react-google-maps/api";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { MAP_API_KEY, MAP_CENTER } from "../../../../utils/constant";
import { formatPrice } from "../../../../utils/function.utils";
import ModalHomeDetail from "../../../ModalHomeDetail/ModalHomeDetail";
import "./MapInModal.scss";

const containerStyle = {
	width: "100%",
	height: "100%",
};

const MapInModal = ({
	data,
	updateData,
	onClickVisibleMap,
	user,
	firestore,
	firebase,
}) => {
	const [visibleModal, setVisibleModal] = useState(false);
	const [modalIsClicked, setModelIsClicked] = useState(null);

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

	return (
		<section className="map-wrap" style={{ height: "100vh", width: "100%" }}>
			<LoadScript style={{ width: "100%" }} googleMapsApiKey={MAP_API_KEY}>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={MAP_CENTER}
					zoom={13}
					options={{
						scrollwheel: false,
						mapTypeControl: false,
						streetViewControl: false,
						fullscreenControl: false,
					}}
				>
					{data &&
						data.map((item, index) => {
							return (
								<OverlayView
									key={index}
									position={{ lat: item.lat, lng: item.lng }}
									mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
								>
									<div
										className="u-marker-location"
										style={{
											background: item.isHover ? `#194B91` : "#0093E9",
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

MapInModal.propsType = {
	data: PropTypes.object,
};

export default React.memo(MapInModal);
