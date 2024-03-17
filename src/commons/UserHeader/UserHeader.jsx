import { Badge, Dropdown, Image } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getNotificationData } from "../../redux/notification/notification.actions";
import { selectNotification } from "../../redux/notification/notification.selectors";
import SignOut from "../SignOut/SignOut";
import "./style/UserHeader.scss";

function UserHeaderContent({
	auth,
	firebase,
	user,
	notification,
	getNotificationData,
}) {
	// get all notificatio in firebase
	const notiRef = firebase
		.firestore()
		.collection("Notification")
		.doc(user.uid)
		.collection("Noti");
	const query = notiRef.limit(100);
	const [noti] = useCollectionData(query, { idField: "id" });
	console.log(noti);
	// check first run not update redux
	const isFirstRun = useRef(true);

	// update noitification data
	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return;
		}

		if (noti.length > 0) {
			getNotificationData({ number: noti.length });
		} else {
			getNotificationData({ number: noti.length });
		}
	}, [noti]);

	return (
		<Dropdown
			overlay={
				<SignOut
					auth={auth}
					firebase={firebase}
					user={user}
					trigger={["click"]}
				/>
			}
		>
			<div className="headerUser">
				<div className="headerUser__name">{user.displayName || user.email}</div>
				<Badge count={notification.notification}>
					<Avatar
						src={
							user.photoURL ||
							"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
						}
					/>
				</Badge>
			</div>
		</Dropdown>
	);
}

const mapStateToProps = createStructuredSelector({
	notification: selectNotification,
});

const UserHeader = connect(mapStateToProps, { getNotificationData })(
	UserHeaderContent
);

export default UserHeader;
