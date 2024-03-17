import { Button, Modal } from "antd";
import React from "react";
import MapInModal from "../HomeContent/components/MapInModal/MapInModal";
import "./ModalMap.scss";

const ModalMap = ({
	modalMapSmallView,
	closeModalMapSmallView,
	openModalMapSmallView,
	data,
	updateData,
	user,
	firestore,
	firebase,
}) => {
	return (
		<div style={{ width: "100%" }}>
			<Button onClick={openModalMapSmallView} className="map-button-small-view">
				<i className="fa fa-map-marked-alt" style={{ marginRight: "5px" }}></i>
				Map
			</Button>
			<Modal
				centered
				footer={null}
				visible={modalMapSmallView}
				onCancel={closeModalMapSmallView}
				style={{ height: "100%" }}
				width={"100%"}
			>
				<MapInModal
					data={data}
					updateData={updateData}
					user={user}
					firestore={firestore}
					firebase={firebase}
				/>
			</Modal>
		</div>
	);
};

ModalMap.propTypes = {};

export default ModalMap;
