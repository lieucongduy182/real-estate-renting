import { Menu } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useHistory, useRouteMatch } from "react-router-dom";
import "./PrivateChat.scss";
import PrivateChatContent from "./PrivateChatContent/PrivateChatContent";

function PrivateChat({ user, firebase, firestore }) {
	const { params } = useRouteMatch();
	const history = useHistory();
	const [openedChat, setOpenedChat] = useState("12313");
	const [friend, setFriend] = useState("12313");

	// get data of box chat user
	const privateChatRef = firestore.collection("PrivateChat");
	const query = privateChatRef.orderBy("createAt").limit(25);
	const [privateChats, loading] = useCollectionData(query, { idField: "id" });

	// get data of notification
	const notiRef2 = firestore
		.collection("Notification")
		.doc(user.uid)
		.collection("Noti");
	const query2 = notiRef2.limit(100);
	const [noti, loadingNoti] = useCollectionData(query2, { idField: "id" });

	// check user uid and friend uid
	useEffect(() => {
		if (!loading) {
			const index = privateChats.findIndex((item) => item.idChat === params.id);
			setOpenedChat(privateChats[index].id);
			setFriend(params.id.replaceAll(user.uid, ""));
		}
	}, [loading, params.id, privateChats]);

	// change to another chat gr
	const handleChangeGroupChat = (values) => {
		console.log(values);
		history.push(`/message/${values.idChat}`);
		setFriend(values.uid);
	};

	// when loading
	if (loading || loadingNoti) {
		return <>Loading ... </>;
	}

	return (
		<Layout className="privateChat">
			<Sider
				className="privateChat__sider"
				width={320}
				breakpoint="lg"
				collapsedWidth="0"
			>
				<Menu
					className="privateChat__menu"
					mode="inline"
					theme="dark"
					defaultSelectedKeys={[openedChat]}
				>
					{privateChats &&
						privateChats.map((privateChat, index) => {
							// get friend uid
							const friend =
								privateChat.user1.uid !== user.uid
									? privateChat.user1
									: privateChat.user2;

							if (privateChat.idChat.search(user.uid) > -1) {
								console.log("123", privateChat.id, openedChat);
								return (
									<Menu.Item
										key={privateChat.id}
										onClick={() =>
											handleChangeGroupChat({
												idChat: privateChat.idChat,
												uid: friend.uid,
											})
										}
										style={{ padding: "1rem", height: "60px" }}
									>
										<div className="listChat">
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "flex-start",
												}}
											>
												<Avatar
													size="large"
													src={
														friend.photoURL ||
														"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
													}
													className="listChat__photo"
												/>
												<div className="listChat__name">{friend.name}</div>
											</div>

											{/* if have message unread */}
											{noti.filter((item) => item.uid === friend.uid).length >
											0 ? (
												<div
													style={{
														backgroundColor: "red",
														color: "white",
														borderRadius: "30px",
														minHeight: "30px",
														minWidth: "30px",
														maxHeight: "30px",
														maxWidth: "30px",
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
													}}
												>
													{
														noti.filter((item) => item.uid === friend.uid)
															.length
													}
												</div>
											) : (
												""
											)}
										</div>
									</Menu.Item>
								);
							}
						})}
				</Menu>
			</Sider>

			<Layout className="privateChat__main">
				<Content className="profile__content">
					<PrivateChatContent
						firestore={firestore}
						idChat={openedChat}
						user={user}
						firebase={firebase}
						friend={friend}
					/>
				</Content>
			</Layout>
		</Layout>
	);
}

export default PrivateChat;
