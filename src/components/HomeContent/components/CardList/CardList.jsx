import { Col, Row } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import CustomPagination from "../../../../commons/CustomPagination/CustomPagination";
import CardItemHome from "../../../CardItemHome/CardItemHome";
import ModalHomeDetail from "../../../ModalHomeDetail/ModalHomeDetail";
import ModalMap from "../../../ModalMap/ModalMap";
import "./CardList.scss";
import CardListLoading from "../CardListLoading/CardListLoading";
import EmptyCommon from "../../../../commons/EmptyCommon/EmptyCommon";

const PAGE_HOME_SIZE = 8;
const CardList = ({
	data,
	currentPage,
	updateData,
	itemIsHovered,
	total,
	onPagination,
	loading,
	user,
	firestore,
	firebase,
}) => {
	const [modalDetailVisible, setModalDetailVisible] = useState(false);
	const [modalMapSmallView, setModalMapSmallView] = useState(false);
	const [dataModalDetail, setDataModalDetail] = useState({});

	const closeModalDetail = () => {
		setModalDetailVisible(false);
	};
	const openModalDetail = (data) => {
		setDataModalDetail(data);
		setModalDetailVisible(true);
	};

	const closeModalMapSmallView = () => {
		setModalMapSmallView(false);
	};

	const openModalMapSmallView = () => {
		setModalMapSmallView(true);
	};

	const handlePagination = (page) => {
		onPagination(page);
	};

	return (
		<section className="card-list">
			<div className={`empty ${data && data.length > 0 && "show"}`}>
				<EmptyCommon />
			</div>
			{loading ? (
				<CardListLoading size={PAGE_HOME_SIZE} />
			) : (
				<Row>
					{data &&
						data.map((item, index) => (
							<Col
								sm={24}
								md={12}
								lg={12}
								xl={12}
								className="item-in-list"
								key={index}
							>
								<CardItemHome
									key={index}
									item={item}
									updateData={updateData}
									itemIsHovered={itemIsHovered}
									{...item}
									openModalDetail={openModalDetail}
								/>
							</Col>
						))}
				</Row>
			)}

			<div className={`pagination ${data && data.length > 0 && "show"}`}>
				<CustomPagination
					current={currentPage}
					onChange={handlePagination}
					total={total}
					pageSize={PAGE_HOME_SIZE}
				/>
			</div>
			<ModalMap
				modalMapSmallView={modalMapSmallView}
				closeModalMapSmallView={closeModalMapSmallView}
				openModalMapSmallView={openModalMapSmallView}
				data={data}
				updateData={updateData}
				user={user}
				firestore={firestore}
				firebase={firebase}
			/>
			<ModalHomeDetail
				visible={modalDetailVisible}
				onCancel={closeModalDetail}
				data={dataModalDetail}
				user={user}
				firestore={firestore}
				firebase={firebase}
			/>
		</section>
	);
};

CardList.propTypes = {
	data: PropTypes.array,
	updateData: PropTypes.func,
};

export default CardList;
