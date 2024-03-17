import { Form, notification } from "antd";
import React from "react";

function ChangeNameForm({ name, handleChangeName }) {
	const onFinish = (values) => {
		if (handleChangeName) {
			handleChangeName(values);
		}
	};
	return (
		<div className="form">
			<Form
				initialValues={{
					name: name,
				}}
				onFinish={onFinish}
				className="form__form"
			>
				<div className="form__label">Tên</div>

				<Form.Item
					name="name"
					rules={[
						{
							require: true,
							message: "Hãy nhập tên!",
						},
					]}
				>
					<input className="form__input" />
				</Form.Item>

				<Form.Item>
					<button htmlType="submit" className="form__button  primary">
						Xác nhận
					</button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default ChangeNameForm;
