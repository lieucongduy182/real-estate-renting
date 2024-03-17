import React, { useState } from "react";
import "./Logo.scss";

const Logo = () => {
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
		<div className="logo">
			<div className={header ? "name native" : "name"}>SFLand</div>
		</div>
	);
};

export default Logo;
