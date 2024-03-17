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
							message: "Failed to login",
							description:
								"You are banned, please contact to your administrator",
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
							message: "Failed to login",
							description:
								"You are banned, please contact to your administrator",
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
					message: "Register thất bại",
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
							message: "Please input your email!",
						},
					]}
				>
					<input className="form__input" />
				</Form.Item>

				<div className="form__label">Password</div>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<input type="password" className="form__input" />
				</Form.Item>

				<div className="form__label">Re Password</div>
				<Form.Item
					name="confirm"
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please confirm your password!",
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error("The two passwords that you entered do not match!")
								);
							},
						}),
					]}
				>
					<input type="password" className="form__input" />
				</Form.Item>

				<Form.Item>
					<button className="form__button primary" htmlType="submit">
						Register
					</button>
				</Form.Item>
			</Form>

			<button onClick={SignInWithGoogle} className="form__button google">
				Login with Google
			</button>
		</div>
	);
}

export default SignUpForm;
