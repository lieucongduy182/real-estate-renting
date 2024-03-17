import {
	DollarCircleOutlined,
	EnvironmentOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React from "react";
import "firebase/analytics";
import firebase from "firebase/app";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router-dom';
import CustomChecked from "../../commons/CustomChecked/CustomChecked";
import CustomCarousel from "./components/CustomCarousel/CustomCarousel";
import "./InfoDetail.scss";

const InfoDetail = (props) => {
	const { data, user, firestore } = props;
	console.log('user',user)
	console.log('data',data)
	const privateChatRef = firestore.collection("PrivateChat");
	const query = privateChatRef.orderBy("createAt").limit(25);
	const history = useHistory();

	const [privateChat] = useCollectionData(query, { idField: "id" });

	const findUserByEmail = email => {
		return firestore
		  .collection('listUser')
		  .where('email', '==', email.toLowerCase())
		  .get()
		  .then(collection => {
			console.log(collection)
			let user
			collection.forEach(doc => user = doc.data())
			return user
		  })
	  }

	const changeToPrivateChat = async () => {
		// check have box chat
		let customer = await findUserByEmail(data.username)
		console.log('customer',customer);
		const index = privateChat.findIndex((item) => {
			return item.idChat.search(customer.uid) > -1 && item.idChat.search(user.uid) > -1;
		});
		console.log('index',index);
		// if yes open this chat box
		if (index > -1) {
			history.push(`/message/${privateChat[index].idChat}`);
		} else {
			//if no create new box chat
			await privateChatRef.add({
				createAt: firebase.firestore.FieldValue.serverTimestamp(),
				idChat: `${customer.uid}${user.uid}`,
				user1: {
					uid: user.uid,
					name: user.displayName || user.email,
					photoURL: user.photoURL,
				},
				user2: {
					uid: customer.uid,
					name: data.username || '',
					photoURL: data.userAvatar || '',
				},
			});

			// go to box chat
			history.push(`message/${customer.uid}${user.uid}`);
		}
	};

	return (
		<div className="info-detail">
			<CustomCarousel data={data.postImg} />
			{/* <div className="title">
                <Link to="/">{data.title}</Link>
            </div> */}
			{/* <div className="date">{postedDate}</div> */}
			<div className="info-detail__content">
				<div
					style={{
						display: "flex",
						alignItems: "start",
						justifyContent: "space-between",
					}}
					className="group"
				>
					<div className="info-detail-with-icon">
						<div
							style={{
								display: "flex",
								alignItems: "center",
								flexDirection: "column",
							}}
						>
							<div className="date">{data.timeStamp}</div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<div className="info-detail-icon-item">
									<span className="icon u-icon">
										<EnvironmentOutlined />
									</span>
									<span className="content">{data.district}</span>
								</div>
								<div className="info-detail-icon-item">
									<span className="icon u-icon">
										<DollarCircleOutlined />
									</span>
									<span className="content">{data.price}</span>
								</div>
								<div className="info-detail-icon-item">
									<span className="icon u-icon">
										<HomeOutlined />
									</span>
									<span className="content">{data.room}</span>
								</div>
							</div>
						</div>
					</div>
					<CustomChecked data={data} firestore={firestore} user={user} />
				</div>
				<div className="description">{data.content}</div>
				<div className="info-detail-footer">
					<div className="author">
						{/* <span>Posted on Jul 10</span> */}
						<div className="author-info">
							<div className="author-avatar">
								<Avatar src={data.userAvatar} alt={data.username} />
							</div>
							<p className="author-name">{data.username}</p>
						</div>
					</div>
					<div className="resource">
					
						<Button onClick={changeToPrivateChat}>Go to Chat</Button>

					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoDetail;
