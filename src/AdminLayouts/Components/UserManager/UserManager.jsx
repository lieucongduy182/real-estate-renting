import { Button, notification, Space, Table } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

function UserManager({ firebase, firestore, user }) {
	const listUserRef = firebase.firestore().collection("listUser");
	const query = listUserRef.limit(25);
	const [userSelected, setUserSelected] = useState("");
	const [listUser, loading] = useCollectionData(query, { idField: "id" });
	const [isModalVisible, setIsModalVisible] = useState(false);

	const columns = [
		{
			title: "ID",
			dataIndex: "uid",
			key: "uid",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			render: (status) => {
				if (status === "live") {
					return <div style={{ color: "#7fba00" }}>Đang hoạt động</div>;
				} else {
					return <div style={{ color: "#f25022" }}>Bị khóa</div>;
				}
			},
		},
		{
			title: "Chức năng",
			dataIndex: "uid",
			key: "uid",
			render: (uid) => {
				const userTemp = listUser.find((item) => item.uid === uid);
				if (user.uid === uid) {
					return <>Admin</>;
				}
				if (userTemp.status === "live") {
					return (
						<Space size="middle">
							<Button
								type="text"
								danger
								onClick={() => handleChangeStatusUser(uid)}
							>
								Khóa tài khoản
							</Button>
						</Space>
					);
				} else {
					return (
						<Space size="middle">
							<Button type="link" onClick={() => handleChangeStatusUser(uid)}>
								Mở khóa tài khoản
							</Button>
						</Space>
					);
				}
			},
		},
	];

	const handleChangeStatusUser = (uid) => {
		console.log(uid);
		setUserSelected(uid);
		setIsModalVisible(true);
	};

	const handleOk = async () => {
		const userTemp = await listUser.find((item) => item.uid === userSelected);
		listUserRef
			.doc(userTemp.id)
			.update({
				status: userTemp.status === "live" ? "block" : "live",
			})
			.then(() => {
				setIsModalVisible(false);
				return notification.success({
					message: "Thay đổi thành công",
				});
			})
			.catch(() => {
				return notification.error({
					message: "Thay đổi thất bại",
				});
			});
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
					dataSource={listUser}
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
					<button
						htmlType="submit"
						className="form__button  google"
						onClick={handleCancel}
					>
						Quay lại
					</button>,
					<button
						htmlType="submit"
						className="form__button  primary"
						onClick={handleOk}
					>
						Đồng ý
					</button>,
				]}
			>
				<div className="modalBox__title">
					Đồng ý chuyển trạng thái người dùng?
				</div>
			</Modal>
		</Layout>
	);
}

export default UserManager;
