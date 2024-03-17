import {
	Button,
	Layout,
	Modal,
	notification,
	Space,
	Table,
	Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { delelePost, getAllData } from "../../../api/house.api";
import { formatTime } from "../../../utils/function.utils";

const { Content } = Layout;

function ContentAdmin({ firebase, firestore }) {
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Vị trí",
			dataIndex: "district",
			key: "district",
			render: (district) => <>{district === "" ? "Hồ Chí Minh" : district}</>,
		},
		{
			title: "Giá",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "Nội dung",
			dataIndex: "content",
			key: "content",
			ellipsis: {
				showTitle: false,
			},
			render: (content) => <Tooltip placement="topLeft">{content}</Tooltip>,
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt) => <>{formatTime(createdAt)} </>,
		},
		{
			title: "Người đăng",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "Chức năng",
			dataIndex: "id",
			key: "id",
			render: (id) => (
				<Space size="middle">
					<Button type="text" danger onClick={() => handleDeletePost(id)}>
						Delete
					</Button>
				</Space>
			),
		},
	];

	const [allPost, setAllPost] = useState([]);
	const [deleteTicket, setDeleteTicket] = useState();
	const [isModalVisible, setIsModalVisible] = useState(false);

	console.log(allPost);

	useEffect(() => {
		(async () => {
			try {
				const result = await getAllData();

				setAllPost(result.rows);
			} catch (error) {
				console.log("false to fetch :", error);
			}
		})();
	}, []);

	const handleDeletePost = async (id) => {
		setDeleteTicket(id);
		setIsModalVisible(true);
	};

	const handleOk = async () => {
		const result = await delelePost(deleteTicket);

		if (result === "OK") {
			const temp = allPost.filter((item) => item.id !== deleteTicket);
			setAllPost(temp);
			setIsModalVisible(false);
			return notification.success({
				message: "Xóa thàng công",
			});
		} else {
			return notification.error({
				message: "Xóa thất bại",
			});
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<Layout style={{ padding: "0 24px 24px" }}>
			<Content
				className="site-layout-background"
				style={{
					padding: 24,
					margin: 0,
					minHeight: 280,
				}}
			>
				<Table
					rowKey={(record) => {
						return record.id;
					}}
					dataSource={allPost}
					style={{
						overflowX: "auto",
						backgroundColor: "#ffffff",
						borderRadius: "10px",
						padding: "1rem",
					}}
					pagination={{
						pageSize: 8,
					}}
					columns={columns}
				/>
			</Content>

			<Modal
				closable={false}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				className="modalBox"
				footer={[
					<Button key="back" onClick={handleCancel}>
						Quay lại
					</Button>,
					<Button key="submit" type="primary" onClick={handleOk}>
						Xóa
					</Button>,
				]}
			>
				<div className="modalBox__title">Đồng ý xóa bài viết</div>
			</Modal>
		</Layout>
	);
}

export default ContentAdmin;
