import { Button, Modal } from "antd";
import React, { useState } from "react";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import "./style/Auth.scss";

function Auth({ auth, firebase, header }) {
	const [status, setStatus] = useState(true); //true = sign in || false = sign up
	const [isModalVisible, setIsModalVisible] = useState(false);

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

	return (
		<>
			<Button
				onClick={showModal}
				style={{ borderRadius: "5px" }}
				type="text"
				className={`buttonLogin ${header ? "native" : ""}`}
			>
				Đăng nhập
			</Button>

			<Modal
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={false}
				className="modalBox"
			>
				{status ? (
					<>
						<div className="modalBox__title">Đăng nhập</div>
						<SignInForm auth={auth} firebase={firebase} />
						<span>
							Bạn chưa có tài khoản ?
							<Button
								className="modalBox__button"
								type="link"
								onClick={handleSwitchAuth}
							>
								Đăng ký
							</Button>
						</span>
					</>
				) : (
					<>
						<div className="modalBox__title">Đăng ký</div>
						<SignUpForm auth={auth} firebase={firebase} />
						<span>
							Bạn chưa có tài khoản
							<Button
								className="modalBox__button"
								type="link"
								onClick={handleSwitchAuth}
							>
								Đăng nhập
							</Button>
						</span>
					</>
				)}
			</Modal>
		</>
	);
}

export default Auth;
