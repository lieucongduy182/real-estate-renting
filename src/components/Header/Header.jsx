import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../commons/Auth/Auth";
import UserHeader from "../../commons/UserHeader/UserHeader";
import Logo from "./components/Logo/Logo";
import "./Header.scss";
import { SearchOutlined } from "@ant-design/icons";

const Header = ({ auth, firebase, user }) => {
	const [header, setHeader] = useState(false);

	const changeBackgroundHeader = () => {
		if (window.scrollY > 140) {
			setHeader(true);
		} else {
			setHeader(false);
		}
	};

	window.addEventListener("scroll", changeBackgroundHeader);

	return (
		<header className={`header ${header ? "native" : ""}`}>
			<div className="header-wrap">
				<div className="header__logo">
					<Link to="/home">
						<Logo />
					</Link>
				</div>

				{header ? (
					<>
						<a href="#role" className="header__search">
							<div className="search">
								<div className="search__content">Search something ...</div>
								<SearchOutlined className="search__icon" />
							</div>
						</a>
					</>
				) : (
					<></>
				)}

				<div className="header__auth">
					{!!!user ? (
						<Auth auth={auth} firebase={firebase} header={header} />
					) : (
						<UserHeader auth={auth} firebase={firebase} user={user} />
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
