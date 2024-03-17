import { Button, notification } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { getHouseData, getProvine } from "../../api/house.api";
import postApi from "../../api/postApi";
import { PAGE_HOME_SIZE } from "../../utils/constant";
import CreatePostForm from "./CreatePostForm/CreatePostForm";

function CreatePost({ user, firestore, firebase }) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [provineList, setProvineList] = useState([]);

	// call api get provine
	useEffect(() => {
		(async () => {
			const result = await getProvine();
			setProvineList(result);
		})();
	}, [isModalVisible]);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	// handle create post
	const handleCreatePost = async (values) => {
		try {
			const result = await postApi.createPost(values);
			console.log(result);
			getHouseData({ limit: PAGE_HOME_SIZE, offset: 0 });
			setIsModalVisible(false);
			return notification.success({
				message: "Đăng bài thành công",
			});
		} catch (error) {
			return notification.error({
				message: "Đăng bài thất bại",
			});
		}
	};

	return (
		<>
			{!!user ? (
				<Button type="primary" onClick={showModal}>
					Đăng bài
				</Button>
			) : (
				<></>
			)}

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
					firestore={firestore}
					firebase={firebase}
					provineList={provineList}
					onSubmit={handleCreatePost}
				/>
			</Modal>
		</>
	);
}

export default CreatePost;
