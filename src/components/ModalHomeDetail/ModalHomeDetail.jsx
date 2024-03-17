import React from "react";
import PropTypes from "prop-types";
import CommentDetail from "../CommentDetail/CommentDetail";
import Modal from "antd/lib/modal/Modal";
import InfoDetail from "../InfoDetail/InfoDetail";

import "./ModalHomeDetail.scss";

const ModalHomeDetail = ({
	visible,
	onOk,
	onCancel,
	data,
	user,
	firestore,
	firebase,
}) => {
	return (
		<Modal
			className="modal-home-detail"
			centered
			style={{ top: 20 }}
			visible={visible}
			onCancel={onCancel}
			footer={null}
		>
			<div className="modal-home-detail-content">
				<InfoDetail data={data} user={user} firestore={firestore} />

				<CommentDetail
					data={data}
					user={user}
					firestore={firestore}
					firebase={firebase}
				/>
			</div>
		</Modal>
	);
};

ModalHomeDetail.propTypes = {
	visible: PropTypes.bool,
	onCancel: PropTypes.func,
};

export default ModalHomeDetail;
