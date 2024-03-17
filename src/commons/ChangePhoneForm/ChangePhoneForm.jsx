import { Form, notification } from "antd";
import React from "react";

function ChangePhoneForm({ phone, handleChangePhone }) {
	const onFinish = (values) => {
		if (handleChangePhone) {
			handleChangePhone(values);
		}
	};

	return (
		<div className="form">
			<Form onFinish={onFinish} className="form__form">
				<div className="form__label">Số điện thoại</div>

				<Form.Item
					name="phone"
					rules={[
						{
							require: true,
							message: "Hãy nhập số điện thoại!",
						},
					]}
					initialValue={phone === "" ? undefined : phone}
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

export default ChangePhoneForm;
