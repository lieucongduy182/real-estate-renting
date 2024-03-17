import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import "./ButtonFilter.scss";

const ButtonFilter = ({ children, ...props }) => {
	return (
		<Button className="custom-btn-filter" {...props}>
			<span className="icon lnr lnr-funnel"></span>
			{children}
		</Button>
	);
};

ButtonFilter.propTypes = {
	children: PropTypes.string,
};

export default ButtonFilter;
