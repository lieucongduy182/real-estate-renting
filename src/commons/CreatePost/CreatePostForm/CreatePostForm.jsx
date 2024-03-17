import { UploadOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	Form,
	Image,
	Input,
	InputNumber,
	Row,
	Select,
	Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import districtApi from "../../../api/districtApi";
import { formatTime } from "../../../utils/function.utils";
import "./CreatePostForm.scss";
import { DISTRICT_LOCTION_OPTION } from "../../../utils/constant";
const { TextArea } = Input;
const { Option } = Select;

function CreatePostForm({
	user,
	firestore,
	firebase,
	provineList,
	onSubmit,
	initialValues = null,
}) {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const [photo, setPhoto] = useState(
		!!initialValues ? initialValues.postImg.map((item) => item.link) : []
	);

	useEffect(() => {
		form.setFieldsValue(initialValues);
	}, [form, initialValues]);

	// set provine

	// handle upload image to firebase storage
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

	// handle create post
	const onFinish = async (values) => {
		console.log("before create", photo);
		const data = {
			district: values.district,
			address: values.address,
			street: values.street,
			country: "Thành phố Hồ Chí Minh",
			price: values.price,
			content: values.content,
			datePosting: formatTime(new Date()),
			username: user.email,
			userAvatar: user.photoURL,
			isForRenter: values.isForRenter,
			phone: values.phone,
			imageLink: photo,
		};

		// console.log(values);

		if (onSubmit) {
			await onSubmit(data);
			setPhoto([]);
			form.resetFields();
		}
	};

	return (
		<Form
			form={form}
			onFinish={onFinish}
			className="form__form"
			initialValues={{ ...initialValues, country: "Thành Phố Hồ Chí Minh" }}
		>
			<div className="form__label post">Nội dung</div>
			<Form.Item
				name="content"
				rules={[
					{
						required: true,
						message: "Điền nội dung bài đăng!",
					},
				]}
				// initialValue={
				// 	!!initialValuesForm ? initialValuesForm.content : undefined
				// }
			>
				<TextArea
					rows={4}
					className="form__input post"
					placeholder="Nội dung bài đăng"
				/>
			</Form.Item>

			<Row>
				<Col xs={11} sm={11} md={11} lg={11} xl={11}>
					<div className="form__label post">Tỉnh/Thành phố</div>
					<Form.Item
						name="country"
						rules={[
							{
								required: true,
								message: "Điền tỉnh/thành phố!",
							},
						]}
					>
						<Select
							placeholder="Select province"
							className="form__input post"
							bordered={false}
							disabled
						>
							<Option value={"Thành Phố Hồ Chí Minh"}>
								Thành Phố Hồ Chí Minh
							</Option>
						</Select>
					</Form.Item>
				</Col>
				<Col xs={11} sm={11} md={11} lg={11} xl={11} offset={2}>
					<div className="form__label post">Quận/Huyện</div>
					<Form.Item
						name="district"
						rules={[
							{
								required: true,
								message: "Điền quận/huyện!",
							},
						]}
					>
						<Select
							placeholder="Select district"
							className="form__input post"
							bordered={false}
						>
							{DISTRICT_LOCTION_OPTION?.map((item) => (
								<Option key={item.name} value={item.name}>
									{item.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={7}>
					<div className="form__label post">Giá</div>
					<Form.Item
						name="price"
						rules={[
							{
								required: true,
								message: "Nhập giá tiền!",
							},
						]}
						// initialValue={
						// 	!!initialValuesForm ? initialValuesForm.price : undefined
						// }
					>
						<InputNumber className="form__input post" placeholder="Giá" />
					</Form.Item>
				</Col>

				<Col span={7} offset={1}>
					<div className="form__label post">Số điện thoại</div>
					<Form.Item
						name="phone"
						rules={[
							{
								required: true,
								message: "Nhập số điện thoại",
							},
						]}
						// initialValue={
						// 	!!initialValuesForm ? initialValuesForm.phone : undefined
						// }
					>
						<Input className="form__input post" placeholder="Số điện thoại" />
					</Form.Item>
				</Col>

				<Col span={7} offset={1}>
					<div className="form__label post">loại</div>
					<Form.Item
						name="isForRenter"
						rules={[
							{
								required: true,
								message: "Chọn kiểu post",
							},
						]}
						// initialValue={
						// 	!!initialValuesForm ? initialValuesForm.isForRenter : undefined
						// }
					>
						<Select
							placeholder="Type"
							className="form__input post"
							bordered={false}
						>
							<Option value={true}>Renter</Option>
							<Option value={false}>Broker</Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col xs={8} sm={8} md={8} lg={8} xl={8}>
					<div className="form__label post">Số nhà</div>
					<Form.Item
						name="address"
						rules={[
							{
								required: true,
								message: "Nhập số nhà!",
							},
						]}
						// initialValue={
						// 	!!initialValuesForm ? initialValuesForm.address : undefined
						// }
					>
						<Input className="form__input post" placeholder="Số nhà" />
					</Form.Item>
				</Col>
				<Col xs={14} sm={14} md={14} lg={14} xl={14} offset={2}>
					<div className="form__label post">Tên đường</div>
					<Form.Item
						name="street"
						rules={[
							{
								required: true,
								message: "Nhập tên đường!",
							},
						]}
						// initialValue={
						// 	!!initialValuesForm ? initialValuesForm.street : undefined
						// }
					>
						<Input className="form__input post" placeholder="Tên đường" />
					</Form.Item>
				</Col>
			</Row>

			{!!initialValues ? (
				initialValues.postImg.length > 0 ? (
					<>
						<div className="form__label">Danh sách ảnh</div>
						<Row className="form__input post">
							{initialValues.postImg.map((item) => (
								<Col span={8}>
									<Image width={100} src={item.link} />
								</Col>
							))}
						</Row>
					</>
				) : (
					<></>
				)
			) : undefined}

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

			<Form.Item>
				<button
					className={`form__button primary ${loading ? "disabled" : ""}`}
					htmlType="submit"
					disabled={loading}
				>
					Đăng bài
				</button>
			</Form.Item>
		</Form>
	);
}

export default CreatePostForm;
