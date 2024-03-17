import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Upload } from "antd";
import React, { useState } from "react";
import "./style/CustomInputComment.scss";

function CustomInputComment({
	onSubmit,
	name = "message",
	handleSeen,
	firebase,
}) {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [photo, setPhoto] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const normFile = (e) => {
		setLoading(true);
		const uploadTask = firebase
			.storage()
			.ref(`images/${e.file.uid}`)
			.put(e.file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {},
			(error) => {
				console.log(error);
			},
			() => {
				firebase
					.storage()
					.ref(`images`)
					.child(e.file.uid)
					.getDownloadURL()
					.then((url) => {
						console.log("75", url);
						const temp = photo;
						setPhoto([...temp, url]);
						setLoading(false);
					});
			}
		);

		if (Array.isArray(e)) {
			return e;
		}

		return e && e.fileList;
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const onFinish = async (values) => {
		const msg = {
			...values,
			photo: photo,
		};

		// console.log(msg);
		if (values[name] === "" || !!!values[name]) {
		} else {
			if (onSubmit) {
				await onSubmit(msg);
				form.resetFields();
				setPhoto([]);
			}
		}
	};

	// check seen when focus
	const handleFocus = async () => {
		if (handleSeen) {
			await handleSeen();
		}
	};

	return (
		<>
			<Form className="commentInput" form={form} onFinish={onFinish}>
				<Button
					className="commentInput__button upload"
					onClick={() => setIsModalVisible(true)}
				>
					<PlusCircleOutlined />
				</Button>

				<Form.Item
					className="commentInput__form"
					name={name}
					// rules={[
					// 	{
					// 		required: true,
					// 		message: `Please input your ${name}!`,
					// 	},
					// ]}
				>
					<input
						className="commentInput__input"
						onFocus={handleFocus}
						placeholder="Nội dung"
						autocomplete="off"
					/>
				</Form.Item>

				<Form.Item>
					<button className="commentInput__button primary" htmlType="submit">
						Send
					</button>
				</Form.Item>

				<Modal
					visible={isModalVisible}
					onOk={handleOk}
					onCancel={handleCancel}
					footer={null}
				>
					<Form.Item
						name="upload"
						valuePropName="fileList"
						getValueFromEvent={normFile}
						className="form__input post"
					>
						<Upload name="logo" listType="picture" beforeUpload={() => false}>
							<Button
								type="primary"
								danger
								icon={<UploadOutlined />}
								disabled={loading}
							>
								{loading ? "Đang tải ảnh lên" : "Đăng ảnh"}
							</Button>
						</Upload>
					</Form.Item>
				</Modal>
			</Form>
		</>
	);
}

export default CustomInputComment;
