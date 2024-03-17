import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import CustomPagination from "../../../../commons/CustomPagination/CustomPagination";
import CardItemHome from "../../../CardItemHome/CardItemHome";
import ModalHomeDetail from "../../../ModalHomeDetail/ModalHomeDetail";
import ModalMap from "../../../ModalMap/ModalMap";
import "./CardListWithoutMap.scss";

const PAGE_HOME_SIZE = 8;
const CardListWithoutMap = ({
	data,
	updateData,
	onClickVisibleMap,
	total,
	onPagination,
	user,
	firestore,
	firebase,
}) => {
	const [modalDetailVisible, setModalDetailVisible] = useState(false);
	const [modalMapSmallView, setModalMapSmallView] = useState(false);
	const [dataModalDetail, setDataModalDetail] = useState({});
	const [currentPage, setCurrentPage] = useState(1);

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
		setCurrentPage(page);
		onPagination(page);
	};

	return (
		<React.Fragment>
			<section className="card-list">
				<Row>
					{data &&
						data?.map((item, index) => (
							<Col
								sm={24}
								md={12}
								lg={12}
								xl={6}
								className="item-in-list"
								key={index}
							>
								<CardItemHome
									key={index}
									updateData={updateData}
									{...item}
									openModalDetail={openModalDetail}
								/>
							</Col>
						))}
				</Row>

				{/* <div className="pagination">
					<CustomPagination
						current={currentPage}
						onChange={handlePagination}
						total={total}
						pageSize={PAGE_HOME_SIZE}
					/>
				</div> */}

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
		</React.Fragment>
	);
};

CardListWithoutMap.propTypes = {};

export default CardListWithoutMap;
