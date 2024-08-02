import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import ChatMessage from "../../../commons/ChatMessage/ChatMessage";
import CustomInputComment from "../../../commons/CustomInputComment/CustomInputComment";
import SignInForm from "../../../commons/SignInForm/SignInForm";
import SignUpForm from "../../../commons/SignUpForm/SignUpForm";
import { getNotificationData } from "../../../redux/notification/notification.actions";

function PrivateChatContentValue({
	firestore,
	idChat,
	user,
	firebase,
	getNotificationData,
	friend,
}) {
	// check login or no
	const isLoggedIn = !!user;

	const [status, setStatus] = useState(true); //true = sign in || false = sign up
	const [isModalVisible, setIsModalVisible] = useState(false);

	// get chat by id
	const messageRef = firestore
		.collection("PrivateChat")
		.doc(idChat)
		.collection("Chat");
	const query = messageRef.orderBy("createAt").limit(100);
	const [messages] = useCollectionData(query, { idField: "id" });

	// noti friend
	const notiRef = firestore
		.collection("Notification")
		.doc(friend)
		.collection("Noti");

	// noti me
	const notiRef2 = firestore
		.collection("Notification")
		.doc(user.uid)
		.collection("Noti");
	const query2 = notiRef2.limit(100);
	const [noti] = useCollectionData(query2, { idField: "id" });

	// scroll to bottom when chat
	const dummy = useRef();

	useEffect(() => {
		//console.log("new message");
		//getNotificationData({ number: 1 });
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
		try {
			await messageRef.add({
				text: values.text,
				createAt: firebase.firestore.FieldValue.serverTimestamp(),
				uid: user.uid,
				photoURL: user.photoURL,
				displayName: user.displayName || user.email,
			});

			// update noti
			await notiRef.add({
				noti: true,
				uid: user.uid,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// handle when seen
	const handleSeen = async () => {
		try {
			await noti.map((item) => {
				if (item.uid === friend) {
					firestore
						.collection("Notification")
						.doc(user.uid)
						.collection("Noti")
						.doc(item.id)
						.delete()
						.then(() => console.log("ok"))
						.catch((err) => console.log("delete faile", err));
				}
			});
			await getNotificationData({ number: 0 });
		} catch (error) {
			console.log("err", error);
		}
	};

	return (
		<div className="globalChat">
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
						handleSeen={handleSeen}
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
}

const mapStateToProps = createStructuredSelector({});

const PrivateChatContent = connect(mapStateToProps, { getNotificationData })(
	PrivateChatContentValue
);

export default PrivateChatContent;
