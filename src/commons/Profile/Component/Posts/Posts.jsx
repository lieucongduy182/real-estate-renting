import { Button, Col, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect } from "react";
import { useState } from "react";
import { getProvine } from "../../../../api/house.api";
import postApi from "../../../../api/postApi";
import CardItemHome from "../../../../components/CardItemHome/CardItemHome";
import ModalHomeDetail from "../../../../components/ModalHomeDetail/ModalHomeDetail";
import CreatePostForm from "../../../CreatePost/CreatePostForm/CreatePostForm";

function Posts({ user, firebase }) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalVisibleDel, setIsModalVisibleDel] = useState(false);
	const [posts, setPosts] = useState([]);
	const [itemIsHovered, setItemIsHovered] = useState({});
	const [dataModalDetail, setDataModalDetail] = useState({});
	const [modalDetailVisible, setModalDetailVisible] = useState(false);
	const [provineList, setProvineList] = useState([]);
	const [initialValues, setInitialValues] = useState(null);

	// set provine list
	useEffect(() => {
		(async () => {
			const result = await getProvine();
			setProvineList(result);
		})();
	}, [isModalVisible]);

	// call api get post by email user
	useEffect(() => {
		(async () => {
			try {
				const result = await postApi.getPostByEmail({ email: user.email });
				await setPosts(result.payload);
			} catch (error) {}
		})();
	}, [user]);

	// handle modal
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

	// modal change post

	const showModal = (data) => {
		setInitialValues(data);
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	// modal del post

	const showModalDel = (data) => {
		setInitialValues(data);
		setIsModalVisibleDel(true);
	};

	const handleCancelDel = () => {
		setIsModalVisibleDel(false);
	};

	// handle change post
	const handleUpdatePost = async (values) => {
		const params = { ...values, postId: initialValues.id };
		try {
			await postApi.updatePost(params);

			const result = await postApi.getPostByEmail({ email: user.email });
			await setPosts(result.payload);

			setIsModalVisible(false);
		} catch (error) {}
	};

	//handle del post
	const handleOkDel = async () => {
		try {
			const res = await postApi.deletePost({ postId: initialValues.id });
			console.log("res", res);
			const result = await postApi.getPostByEmail({ email: user.email });
			await setPosts(result.payload);

			setIsModalVisible(false);
		} catch (error) {}
		setIsModalVisibleDel(false);
	};

	return (
		<div>
			<Row>
				{posts &&
					posts.map((item, index) => (
						<Col
							sm={24}
							md={{ span: 7, offset: 1 }}
							lg={{ span: 7, offset: 1 }}
							xl={{ span: 7, offset: 1 }}
							className="item-in-list"
							key={index}
							style={{ marginBottom: "2rem" }}
						>
							<CardItemHome
								key={index}
								item={item}
								updateData={updateData}
								itemIsHovered={itemIsHovered}
								{...item}
								openModalDetail={openModalDetail}
							/>
							<div
								className="form__input post"
								style={{ marginTop: "1rem", textAlign: "center" }}
							>
								<Button onClick={() => showModal(item)} type="primary">
									Sửa bài viết
								</Button>
								<Button
									onClick={() => showModalDel(item)}
									type="primary"
									danger
								>
									Xóa bài viết
								</Button>
							</div>
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

			<Modal
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={false}
				className="modalBox"
			>
				<div className="modalBox__title">Đăng bài</div>
				<CreatePostForm
					user={user}
					firestore={firebase.firestore()}
					firebase={firebase}
					provineList={provineList}
					onSubmit={handleUpdatePost}
					initialValues={initialValues}
				/>
			</Modal>

			<Modal
				closable={false}
				visible={isModalVisibleDel}
				onOk={handleOkDel}
				onCancel={handleCancelDel}
				className="modalBox"
				footer={[
					<Button key="back" onClick={handleCancelDel}>
						Quay lại
					</Button>,
					<Button key="submit" type="primary" onClick={handleOkDel}>
						Xóa
					</Button>,
				]}
			>
				<div className="modalBox__title">Đồng ý xóa bài viết</div>
			</Modal>
		</div>
	);
}

export default Posts;
