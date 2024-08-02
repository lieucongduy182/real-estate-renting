import { Form, notification } from "antd";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "../SignInForm/style/SignInForm.scss";

function SignUpForm({ auth, firebase }) {
	const listUserRef = firebase.firestore().collection("listUser");
	const query = listUserRef.limit(25);
	const [listUser, loading] = useCollectionData(query, { idField: "id" });

	// handle  sign in with google
	const SignInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth
			.signInWithPopup(provider)
			.then(async ({ user }) => {
				const index = listUser.findIndex((item) => item.uid === user.uid);

				if (index > -1) {
					if (listUser[index].status !== "block") {
						return notification.success({
							message: "Đăng kí thành công",
							description: "",
						});
					} else {
						auth.signOut();
						return notification.error({
							message: "Đăng nhập thất bại",
							description:
								"Tài khoản bị đình chỉ, xin vui lòng liên hệ admin.",
						});
					}
				} else {
					await listUserRef.add({
						uid: user.uid,
						email: user.email,
						status: "live",
					});
					return notification.success({
						message: "Đăng kí thành công",
						description: "",
					});
				}
			})
			.catch((error) => {
				let errorCode = "Fail";
				let errorMessage = error.message;

				return notification.error({
					message: errorCode,
					description: errorMessage,
				});
			});
	};

	// function sign up with email
	const signUp = (email, password) => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				const index = listUser.findIndex((item) => item.uid === user.uid);

				if (index > -1) {
					if (listUser[index].status !== "block") {
						return notification.success({
							message: "Đăng kí thành công",
							description: "",
						});
					} else {
						auth.signOut();
						return notification.error({
							message: "Đăng nhập thất bại",
							description:
								"Tài khoản bị đình chỉ, xin vui lòng liên hệ admin.",
						});
					}
				} else {
					await listUserRef.add({
						uid: user.uid,
						email: user.email,
						status: "live",
					});
					return notification.success({
						message: "Đăng kí thành công",
						description: "",
					});
				}
			})
			.catch((error) => {
				let errorCode = "Fail";
				let errorMessage = error.message;

				return notification.error({
					message: "Đăng ký thất bại",
					// description: errorMessage,
				});
			});
	};

	// handle sign up with email
	const onFinish = (values) => {
		signUp(values.email, values.password);
	};

	return (
		<div className="form">
			<Form className="form__form" onFinish={onFinish}>
				<div className="form__label">Email</div>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							type: "email",
							message: "Xin vui lòng nhập email",
						},
					]}
				>
					<input className="form__input" />
				</Form.Item>

				<div className="form__label">Mật khẩu</div>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: "Xin vui lòng nhập mật khẩu",
						},
					]}
				>
					<input type="password" className="form__input" />
				</Form.Item>

				<div className="form__label">Nhập lại mật khảu</div>
				<Form.Item
					name="confirm"
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: "Xin vui lòng xác nhận mất khẩu",
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error("Mật khẩu không trùng khớp")
								);
							},
						}),
					]}
				>
					<input type="password" className="form__input" />
				</Form.Item>

				<Form.Item>
					<button className="form__button primary" htmlType="submit">
						Đăng ký
					</button>
				</Form.Item>
			</Form>

			<button onClick={SignInWithGoogle} className="form__button google">
				Đăng nhập với Google
			</button>
		</div>
	);
}

export default SignUpForm;
