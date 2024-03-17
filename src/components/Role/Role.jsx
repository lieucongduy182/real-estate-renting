import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CustomButton from "../../commons/CustomButton/CustomButton";
import { PAGE_HOME_SIZE, ROLE_USER } from "../../utils/constant";
import { getHouseData } from "../../redux/house/house.action";
import { selectHouse } from "../../redux/house/house.selectors";
import { updateRoleUser } from "../../redux/user/user.action";
import { selectRoleUser } from "../../redux/user/user.selectors";
import "./Role.scss";

const Role = ({ houseReducer, role, updateRoleUser, getHouseData }) => {
	const handleUpdateRoleUser = (value) => {
		if (role !== value) {
			updateRoleUser(value);
			const { minPrice, maxPrice, district } = houseReducer;
			getHouseData({
				limit: PAGE_HOME_SIZE,
				offset: 0,
				district,
				maxPrice,
				minPrice,
				role: value,
			});
		}
	};
	const selectRoleRenter = () => {
		handleUpdateRoleUser(ROLE_USER.RENTER);
	};

	const selectRoleBroker = () => {
		handleUpdateRoleUser(ROLE_USER.BROKER);
	};

	return (
		<section id="role" className="role">
			<div className="options">
				<CustomButton
					className={`left ${role === ROLE_USER.RENTER ? "secondary" : ""}`}
					onClick={selectRoleRenter}
				>
					I am {ROLE_USER.RENTER}
				</CustomButton>
				<CustomButton
					className={`right ${role === ROLE_USER.BROKER ? "secondary" : ""}`}
					onClick={selectRoleBroker}
				>
					I am {ROLE_USER.BROKER}
				</CustomButton>
			</div>
		</section>
	);
};

const mapStateToProps = createStructuredSelector({
	role: selectRoleUser,
	houseReducer: selectHouse,
});

export default connect(mapStateToProps, { updateRoleUser, getHouseData })(Role);
