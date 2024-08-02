import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CustomInputComment from "../../commons/CustomInputComment/CustomInputComment";
import SignInForm from "../../commons/SignInForm/SignInForm";
import SignUpForm from "../../commons/SignUpForm/SignUpForm";
import "./CommentDetail.scss";
import CustomComment from "./components/CustomComment/CustomComment";

const CommentDetail = ({ data, user, firestore, firebase }) => {
	// get list comment from firebase
	const productCommentRef = firestore
		.collection("productComment")
		.doc(`${data.id}`)
		.collection("comments");

	const [values, loading] = useCollectionData(productCommentRef, {
		idField: "id",
	});

	const [status, setStatus] = useState(true); //true = sign in || false = sign up
	const [isModalVisible, setIsModalVisible] = useState(false);

	// handle modal
	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleSwitchAuth = () => {
		setStatus(!status);
	};

	// send comment
	const handleSubmit = async (values) => {
		await productCommentRef.add({
			avatar: user.photoURL || "",
			displayName: user.displayName || user.email,
			createAt: firebase.firestore.FieldValue.serverTimestamp(),
			idUser: user.uid,
			message: values.message,
		});
	};

	return (
		<div className="comment-detail">
			<div className="title">Comments and replies</div>
			{(values || []).map((item) => (
				<div key={item.id} className="comment-item">
					<CustomComment
						data={item}
						productCommentRef={productCommentRef}
						firebase={firebase}
						user={user}
					/>
				</div>
			))}

			{/* check login */}
			{!!user ? (
				<CustomInputComment onSubmit={handleSubmit} />
			) : (
				<Button type="primary" onClick={showModal} style={{ width: "100%" }}>
					Login để bình luận
				</Button>
			)}

			<Modal
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={false}
				className="modalBox"
			>
				{status ? (
					<>
						<div>Sign In</div>
						<SignInForm auth={firebase.auth()} firebase={firebase} />
						<span>
							Bạn chưa có tài khoản ?{" "}
							<Button type="link" onClick={handleSwitchAuth}>
								Đăng ký
							</Button>
						</span>
					</>
				) : (
					<>
						<div>Sign Up</div>
						<SignUpForm auth={firebase.auth()} firebase={firebase} />
						<span>
							Bạn chưa có tài khoản ?{" "}
							<Button type="link" onClick={handleSwitchAuth}>
								Login
							</Button>
						</span>
					</>
				)}
			</Modal>
		</div>
	);
};

export default CommentDetail;
