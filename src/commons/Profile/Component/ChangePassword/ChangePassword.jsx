import { Form, notification } from "antd";
import React from "react";

function ChangePassword({ user, firebase }) {
	// create authenticate
	const reAuthenticate = (currentPassword) => {
		let credential = firebase.auth.EmailAuthProvider.credential(
			user.email,
			currentPassword
		);

		return user.reauthenticateWithCredential(credential);
	};

	// handle change password(if login by email)
	const onFinish = (values) => {
		reAuthenticate(values.password)
			.then(() => {
				user.updatePassword(values.repassword);
				return notification.success({
					message: "Thay đổi mật khẩu thành công",
				});
			})
			.catch((error) => {
				console.log(error);
				return notification.error({
					message: "Thay đổi mật khẩu thất bại",
					description: error.message,
				});
			});
	};

	// handle change password (if login by goolgle)
	const sendEmailChangePassword = () => {
		firebase
			.auth()
			.sendPasswordResetEmail(user.email)
			.then(() => {
				return notification.success({
					message: "Check email để đổi mật khẩu",
				});
			})
			.catch((error) => {
				return notification.error({
					message: "Gửi email thất bại",
					description: error.message,
				});
			});
	};

	// user.providerData[0].providerId type of login
	return user.providerData[0].providerId === "password" ? (
		<>
			<div className="form">
				<Form onFinish={onFinish} className="form__form">
					<div className="form__label">Nhập mật khẩu hiện tại : </div>

					<Form.Item
						name="password"
						rules={[
							{
								require: true,
								message: "Hãy nhập mật khẩu!",
							},
						]}
					>
						<input type="password" className="form__input" />
					</Form.Item>
					<div className="form__label">Nhập mật khẩu mới : </div>
					<Form.Item
						name="repassword"
						rules={[
							{
								require: true,
								message: "Hãy nhập mật khẩu!",
							},
						]}
					>
						<input type="password" className="form__input" />
					</Form.Item>
					<div className="form__label">Nhập lại mật khẩu mới : </div>
					<Form.Item
						name="confirm"
						dependencies={["repassword"]}
						hasFeedback
						rules={[
							{
								required: true,
								message: "Please confirm your password!",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("repassword") === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error(
											"The two passwords that you entered do not match!"
										)
									);
								},
							}),
						]}
					>
						<input type="password" className="form__input" />
					</Form.Item>

					<Form.Item>
						<button htmltype="submit" className="form__button  primary">
							Xác nhận
						</button>
					</Form.Item>
				</Form>
			</div>
		</>
	) : (
		<>
			<div className="form__label">Thay đổi mật khẩu </div>
			<button
				className="form__button  primary"
				onClick={sendEmailChangePassword}
			>
				Gửi email để đổi mật khẩu
			</button>
		</>
	);
}

export default ChangePassword;
