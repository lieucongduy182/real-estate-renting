import { Button } from "antd";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

function CustomChecked({ data, user, firestore }) {
	// get list checked by user
	const productRef = firestore.collection("user");
	const query = productRef.limit(25);
	const [values, loading] = useCollectionData(query, { idField: "id" });

	// return null when user no logged in
	if (!!!user) {
		return <></>;
	}

	// handle when user checked
	const handleSubmit = () => {
		const index = values.findIndex(
			(item) => item.id === `${user.uid}${data.id}`
		);
		if (index >= 0) {
			firestore.collection("user").doc(`${user.uid}${data.id}`).set({
				isChecked: !values[index].isChecked,
			});
		} else {
			firestore.collection("user").doc(`${user.uid}${data.id}`).set({
				isChecked: true,
			});
		}
	};

	return !loading ? (
		<div onClick={handleSubmit}>
			{values.findIndex((item) => item.id === `${user.uid}${data.id}`) >= 0 ? (
				values[values.findIndex((item) => item.id === `${user.uid}${data.id}`)]
					.isChecked ? (
					<Button type="primary" danger>
						Đã Favorite
					</Button>
				) : (
					<Button type="primary">Favorite</Button>
				)
			) : (
				<Button type="primary">Favorite</Button>
			)}
		</div>
	) : (
		<></>
	);
}

export default CustomChecked;
