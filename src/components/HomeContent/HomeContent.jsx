/* eslint-disable no-unused-vars */
import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { createStructuredSelector } from "reselect";
import CreatePost from "../../commons/CreatePost/CreatePost";
import { getHouseData } from "../../redux/house/house.action";
import {
	selectHouse,
	selectHouseData,
	selectHouseLoading,
	selectHouseNumResults,
} from "../../redux/house/house.selectors";
import { selectRoleUser } from "../../redux/user/user.selectors";
import { PAGE_HOME_SIZE } from "../../utils/constant";
import CardList from "./components/CardList/CardList";
import CardListWithoutMap from "./components/CardListWithoutMap/CardListWithoutMap";
// import PropTypes from 'prop-types';
import Map from "./components/Map/Map";
import "./HomeContent.scss";

const HomeContentComponent = ({
	roleUser,
	isLoading,
	houseData,
	numResults,
	houseReducer,
	getHouseData,
	user,
	firestore,
	firebase,
}) => {
	const [visibleMap, setVisibleMap] = useState(false);
	const [isSmallView, setIsSmallView] = useState(9999);
	const [itemIsHovered, setItemIsHovered] = useState({});
	useEffect(() => {
		//console.log("house here: ", houseData);
		getHouseData({ limit: PAGE_HOME_SIZE, offset: 0 });
	}, [getHouseData]);

	const resize = () => {
		setIsSmallView(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener("resize", resize);
		return () => {
			window.removeEventListener("resize", resize);
		};
	}, []);

	const updateData = (item, isMouseOut) => {
		if (!isMouseOut) {
			setItemIsHovered(item);
		} else {
			setItemIsHovered({});
		}
	};

	const onClickVisibleMap = () => {
		setVisibleMap(!visibleMap);
	};

	const onPagination = (page) => {
		const { minPrice, maxPrice, district } = houseReducer;
		getHouseData({
			limit: PAGE_HOME_SIZE,
			offset: (page - 1) * PAGE_HOME_SIZE,
			pageNum: page,
			district,
			maxPrice,
			minPrice,
			role: roleUser,
		});
		window.scrollTo(0, 100);
	};

	return (
		<section className="home-content-wrap">
			<SwitchTransition mode={"out-in"}>
				<CSSTransition
					key={visibleMap}
					addEndListener={(node, done) => {
						node.addEventListener("transitionend", done, false);
					}}
					classNames="fade"
				>
					{visibleMap ? (
						isSmallView > 1199 ? (
							<Row>
								<Col xs={24} sm={24} md={24} lg={24} xl={12}>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											padding: "20px",
										}}
										className="homeContent__top"
									>
										<div className="homeContent__top--total">
											Total: {numResults}
										</div>
										<div className="homeContent__top--btn">
											<CreatePost
												user={user}
												firestore={firestore}
												firebase={firebase}
											/>
										</div>
									</div>
									<CardList
										loading={isLoading}
										currentPage={houseReducer.currentPage}
										onPagination={onPagination}
										total={numResults}
										data={houseData}
										updateData={updateData}
										itemIsHovered={itemIsHovered}
										user={user}
										firestore={firestore}
										firebase={firebase}
									/>
								</Col>
								<Col xs={0} sm={0} md={0} lg={0} xl={12}>
									<Map
										data={houseData}
										updateData={updateData}
										itemIsHovered={itemIsHovered}
										onClickVisibleMap={onClickVisibleMap}
										user={user}
										firestore={firestore}
										firebase={firebase}
									/>
								</Col>
							</Row>
						) : (
							<Row>
								<Col xs={24} sm={24} md={24} lg={24} xl={24}>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											padding: "20px",
										}}
										className="homeContent__top"
									>
										<div className="homeContent__top--total">
											Total: {numResults}
										</div>
										<div className="homeContent__top--btn">
											<CreatePost
												user={user}
												firestore={firestore}
												firebase={firebase}
											/>
										</div>
									</div>
									<CardListWithoutMap
										onPagination={onPagination}
										total={numResults}
										onClickVisibleMap={onClickVisibleMap}
										data={houseData}
										updateData={updateData}
										user={user}
										firestore={firestore}
										firebase={firebase}
									/>
								</Col>
							</Row>
						)
					) : (
						<Row>
							<Col xs={24} sm={24} md={24} lg={24} xl={24}>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										padding: "20px",
									}}
									className="homeContent__top"
								>
									<div className="homeContent__top--total">
										Total: {numResults}
									</div>
									<div className="homeContent__top--btn">
										<CreatePost
											user={user}
											firestore={firestore}
											firebase={firebase}
										/>
									</div>
								</div>
								<CardListWithoutMap
									onPagination={onPagination}
									total={numResults}
									onClickVisibleMap={onClickVisibleMap}
									data={houseData}
									updateData={updateData}
									user={user}
									firestore={firestore}
									firebase={firebase}
								/>
							</Col>
						</Row>
					)}
				</CSSTransition>
			</SwitchTransition>
		</section>
	);
};

const mapStateToProps = createStructuredSelector({
	roleUser: selectRoleUser,
	houseReducer: selectHouse,
	isLoading: selectHouseLoading,
	numResults: selectHouseNumResults,
	houseData: selectHouseData,
});

const HomeContent = connect(mapStateToProps, { getHouseData })(
	HomeContentComponent
);

export default HomeContent;
