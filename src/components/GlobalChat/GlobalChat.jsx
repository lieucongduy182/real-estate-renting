import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "../../commons/ChatMessage/ChatMessage";
import CustomInputComment from "../../commons/CustomInputComment/CustomInputComment";
import SignUpForm from "../../commons/SignUpForm/SignUpForm";
import SignInForm from "../../commons/SignInForm/SignInForm";
import "./GlobalChat.scss";

function GlobalChat({ user, firestore, firebase }) {
	// check user login or not
	const isLoggedIn = !!user;
	const [status, setStatus] = useState(true); //true = sign in || false = sign up
	const [isModalVisible, setIsModalVisible] = useState(false);

	// handle get list message in global chat
	const messageRef = firestore.collection("GlobalChat");
	const query = messageRef.orderBy("createAt").limit(100);

	const [messages] = useCollectionData(query, { idField: "id" });

	// scroll to bottom when chat
	const dummy = useRef();

	useEffect(() => {
		dummy.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// handle open modal
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

	// handle send message
	const handleSendMessage = async (values) => {
		console.log(values);
		if (values.photo.length > 0) {
			await messageRef.add({
				text: values.text,
				createAt: firebase.firestore.FieldValue.serverTimestamp(),
				uid: user.uid,
				photoURL: user.photoURL,
				displayName: user.displayName || user.email,
				imagesLink: values.photo,
			});
		} else {
			await messageRef.add({
				text: values.text,
				createAt: firebase.firestore.FieldValue.serverTimestamp(),
				uid: user.uid,
				photoURL: user.photoURL,
				displayName: user.displayName || user.email,
			});
		}
	};

	// if (isLoggedIn) return setIsModalVisible(false);

	return (
		<div className="globalChat">
			<div className="globalChat__title">Kênh cộng đồng</div>
			<div className="globalChat__content">
				<div>
					{messages &&
						messages.map((msg) => (
							<ChatMessage
								key={msg.id}
								message={msg}
								user={isLoggedIn ? user : "123"}
								firestore={firestore}
								firebase={firebase}
							/>
						))}
					<div ref={dummy}></div>
				</div>
			</div>

			<div className="globalChat__form">
				{isLoggedIn ? (
					<CustomInputComment
						onSubmit={handleSendMessage}
						name="text"
						firebase={firebase}
					/>
				) : (
					<Button
						type="primary"
						onClick={showModal}
						style={{ width: "100%", marginBottom: "2rem" }}
					>
						Login để bình luận
					</Button>
				)}
			</div>

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
							Bạn chưa có tài khoản ?
							<Button type="link" onClick={handleSwitchAuth}>
								Login
							</Button>
						</span>
					</>
				)}
			</Modal>
		</div>
	);
}

export default GlobalChat;
