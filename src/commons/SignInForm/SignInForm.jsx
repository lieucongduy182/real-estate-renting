import { Form, notification } from "antd";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./style/SignInForm.scss";

function FormSignIn({ auth, firebase }) {
	const listUserRef = firebase.firestore().collection("listUser");
	const query = listUserRef.limit(25);
	const [listUser] = useCollectionData(query, { idField: "id" });

	// handle sign in with google
	const SignInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth
			.signInWithPopup(provider)
			.then(async ({ user }) => {
				const index = listUser.findIndex((item) => item.uid === user.uid);

				if (index > -1) {
					if (listUser[index].status !== "block") {
						return notification.success({
							message: "Login Successfully",
							description: "",
						});
					} else {
						auth.signOut();
						return notification.error({
							message: "Failed to login",
							description:
								"You are banned, please contact your administrator",
						});
					}
				} else {
					await listUserRef.add({
						uid: user.uid,
						email: user.email,
						status: "live",
					});
					return notification.success({
						message: "Login Successfully",
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

	// function sign in with email
	const signIn = (email, password) => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				const index = listUser.findIndex((item) => item.uid === user.uid);

				if (index > -1) {
					if (listUser[index].status !== "block") {
						return notification.success({
							message: "Login Successfully",
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
						message: "Login Successfully",
					});
				}
			})
			.catch((error) => {

				return notification.error({
					message: "Failed to login",
					description: "Email or Password is incorrect!",
				});
			});
	};

	// handle sign in with email
	const onFinish = (values) => {
		signIn(values.email, values.password);
	};

	return (
		<div className="form">
			<Form
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				className="form__form"
			>
				<div className="form__label">Email</div>

				<Form.Item
					name="email"
					rules={[
						{
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

				<Form.Item>
					<button htmlType="submit" className="form__button  primary">
						Login
					</button>
				</Form.Item>
			</Form>

			<button onClick={SignInWithGoogle} className="form__button google">
				Login with Google
			</button>
		</div>
	);
}

export default FormSignIn;
