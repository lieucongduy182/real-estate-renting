import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import "./CustomButton.scss";

const CustomButton = ({ children, className, ...props }) => {
	return (
		<div className="custom-btn">
			<Button className={className} {...props}>
				{children}
			</Button>
		</div>
	);
};

CustomButton.propTypes = {
	children: PropTypes.array,
};

export default CustomButton;
