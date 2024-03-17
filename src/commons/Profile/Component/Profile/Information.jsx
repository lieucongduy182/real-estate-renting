import { Button, Col, Image, message, notification, Row, Upload } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router-dom";
import ChangeNameForm from "../../../ChangeNameForm/ChangeNameForm";
import ChangePhoneForm from "../../../ChangePhoneForm/ChangePhoneForm";
import "./style/Information.scss";

const DescriptionItem = ({ title, content }) => (
	<div className="site-description-item-profile-wrapper">
		<div
			className="site-description-item-profile-p-label"
			style={{
				display: "inline-block",
				marginRight: 8,
			}}
		>
			{title}:
		</div>
		<div
			style={{ display: "flex", alignItems: "center", justifyContent: "left" }}
		>
			{content}
		</div>
	</div>
);

function Information({ firebase, user, storage }) {
	const [photo, setPhoto] = useState(user.photoURL);
	const [button, setButton] = useState(true);
	const [isChangeName, setIsChangeName] = useState("");
	const [file, setFile] = useState(null);
	const history = useHistory();
	const [phoneSelected, setPhoneSelected] = useState("");

	// get all phone firebase
	const phoneRef = firebase.firestore().collection("Phone");
	const query = phoneRef.limit(100);
	const [phone, loading] = useCollectionData(query, { idField: "id" });

	// get phone user by uid
	useEffect(() => {
		if (loading) {
			return;
		}
		if (phone.findIndex((item) => item.uid === user.uid) > -1) {
			setPhoneSelected(
				phone[phone.findIndex((item) => item.uid === user.uid)].phone
			);
		}
	}, [loading, phone]);

	// handle change name user
	const handleChangeName = async ({ name }) => {
		user
			.updateProfile({
				displayName: name,
			})
			.then(() => {
				setIsChangeName("");
				return notification.success({
					message: "Thay đổi tên thành công",
				});
			})
			.catch((error) => {
				console.log(error);
				return notification.error({
					message: "Thay đổi tên thất bại",
				});
			});
	};

	// handle change phone
	const handleChangePhone = async ({ phone }) => {
		await phoneRef
			.add({
				phone: phone,
				uid: user.uid,
			})
			.then(() => {
				setIsChangeName("");
				return notification.success({
					message: "Thay đổi số điện thoại thành công",
				});
			})
			.catch(() => {
				return notification.error({
					message: "Thay đổi số điện thoại thất bại",
				});
			});
	};

	// handle change image
	const onChangeImage = (e) => {
		console.log(e.target.files[0]);
		setButton(false);
		setPhoto(URL.createObjectURL(e.target.files[0]));
		setFile(e.target.files[0]);
	};

	// handle upload avatar
	const uploadAvatar = async () => {
		await storage.ref(`images/${user.uid}`).put(file);

		if (!!file) {
			const storageRef = await storage.ref();
			storageRef
				.child("images/" + user.uid)
				.getDownloadURL()
				.then((url) => {
					user
						.updateProfile({
							photoURL: url,
						})
						.then(() => {
							setPhoto(url);

							notification.success({
								message: "đổi ảnh thành công",
							});
						})
						.then(() => {
							return history.go(0);
						})
						.catch((error) => {
							console.log(error);
						});
				})
				.catch((e) => console.log(e));
		}
	};

	// hanlde cancle upload
	const cancleUploadAvatar = () => {
		history.go(0);
	};

	if (loading) {
		return <div>loading </div>;
	}

	return (
		<div className="information">
			<p className="information__title">Profile người dùng</p>
			<Row className="information__row">
				<Col span={24} className="information__col">
					<Image.PreviewGroup>
						<Image
							className="information__image"
							src={photo || ""}
							fallback="data:image/png;base64,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"
						/>
					</Image.PreviewGroup>
				</Col>

				<Col span={24} className="information__col">
					{button ? (
						<>
							<input
								type="file"
								name="file"
								id="file"
								className="inputfile"
								onChange={onChangeImage}
							/>
							<label for="file">Choose a file</label>
						</>
					) : (
						<>
							<Button type="primary" onClick={uploadAvatar}>
								Xác nhận đổi
							</Button>
							<Button type="primary" danger onClick={cancleUploadAvatar}>
								Hủy
							</Button>
						</>
					)}
				</Col>

				<Col span={24} className="information__col">
					{user.displayName ? (
						<DescriptionItem
							title="Tên hiển thị"
							content={
								<>
									{user.displayName}
									<Button type="link" onClick={() => setIsChangeName("name")}>
										Đổi
									</Button>
								</>
							}
						/>
					) : (
						<DescriptionItem
							title="Tên hiển thị"
							content={
								<>
									<Button type="link" onClick={() => setIsChangeName("name")}>
										Chưa có, thêm ngay
									</Button>
								</>
							}
						/>
					)}
				</Col>

				<Col span={24} className="information__col">
					<DescriptionItem title="Tài khoản" content={user.email} />
				</Col>

				<Col span={24} className="information__col">
					<DescriptionItem
						title="Email"
						content={
							user.emailVerified ? (
								<>{user.email}</>
							) : (
								<>
									{user.email}
									{/* <Button type="link">Xác nhận ngay!</Button> */}
								</>
							)
						}
					/>
				</Col>

				<Col span={24} className="information__col">
					<DescriptionItem
						title="Số điện thoại"
						content={
							phoneSelected !== "" ? (
								<div>
									{
										<>
											{phoneSelected}
											<Button
												type="link"
												onClick={() => setIsChangeName("phone")}
											>
												Đổi
											</Button>
										</>
									}
								</div>
							) : (
								<Button type="link" onClick={() => setIsChangeName("phone")}>
									Chưa có, thêm ngay
								</Button>
							)
						}
					/>
				</Col>
			</Row>

			<Modal
				visible={isChangeName !== ""}
				onCancel={() => setIsChangeName("")}
				footer={false}
				className="modal__changeName modalBox"
			>
				{isChangeName === "name" ? (
					<ChangeNameForm
						name={user.displayName || ""}
						handleChangeName={handleChangeName}
					/>
				) : (
					<ChangePhoneForm
						phone={phoneSelected}
						handleChangePhone={handleChangePhone}
					/>
				)}
			</Modal>
		</div>
	);
}

export default Information;
