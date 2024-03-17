import { Col, Row } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getAllData } from "../../../../api/house.api";
import CardItemHome from "../../../../components/CardItemHome/CardItemHome";
import ModalHomeDetail from "../../../../components/ModalHomeDetail/ModalHomeDetail";

function LikePost({ user, firebase }) {
	const [itemIsHovered, setItemIsHovered] = useState({});
	const [allPost, setAllPost] = useState([]);
	const [likePost, setLikePost] = useState([]);
	const [dataModalDetail, setDataModalDetail] = useState({});
	const [modalDetailVisible, setModalDetailVisible] = useState(false);

	// get all post like
	const likePostRef = firebase.firestore().collection("user");
	const query = likePostRef.limit(25);
	const [likeAllPost, loading] = useCollectionData(query, { idField: "id" });

	// check id posts were like by user
	useEffect(() => {
		if (!loading && !!likeAllPost) {
			const temp = likeAllPost.filter(
				(item) => item.id.search(user.uid) > -1 && item.isChecked
			);
			setLikePost(temp);
		}
	}, [loading, likeAllPost]);

	// check posts data were like by user
	useEffect(() => {
		(async () => {
			try {
				const result = await getAllData();
				const temp = [];

				if (result.count > 0 && likePost.length > 0) {
					likePost.map((item) => {
						const index = result.rows.findIndex((value) => {
							console.log(item.id, value.id);
							return item.id.search(value.id) > -1;
						});

						if (index > -1) {
							console.log(index, result.rows[index]);
							temp.push(result.rows[index]);
						}
					});
				}
				setAllPost(temp);
			} catch (error) {
				console.log("false to fetch :", error);
			}
		})();
	}, [likePost]);

	// open modal post
	const closeModalDetail = () => {
		setModalDetailVisible(false);
	};

	const updateData = (item, isMouseOut) => {
		if (!isMouseOut) {
			setItemIsHovered(item);
		} else {
			setItemIsHovered({});
		}
	};

	const openModalDetail = (data) => {
		setDataModalDetail(data);
		setModalDetailVisible(true);
	};

	return (
		<div>
			<Row>
				{allPost &&
					allPost.map((item, index) => (
						<Col
							sm={24}
							md={{ span: 7, offset: 1 }}
							lg={{ span: 7, offset: 1 }}
							xl={{ span: 7, offset: 1 }}
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

			<ModalHomeDetail
				visible={modalDetailVisible}
				onCancel={closeModalDetail}
				data={dataModalDetail}
				user={user}
				firestore={firebase.firestore()}
				firebase={firebase}
			/>
		</div>
	);
}

export default LikePost;
