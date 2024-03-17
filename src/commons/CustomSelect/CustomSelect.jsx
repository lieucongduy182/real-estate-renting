import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import "./CustomSelect.scss";

const CustomSelect = ({ data, name, onChange }) => {
	const handleChange = (value) => {
		// console.log(`selected ${value}`);
		onChange(name, value);
	};

	// function onBlur() {
	//     console.log('blur');
	// }

	// function onFocus() {
	//     console.log('focus');
	// }

	// function onSearch(val) {
	//     console.log('search:', val);
	// }

	return (
		<Select
			className="custom-select"
			showSearch
			style={{ width: 200 }}
			placeholder="Select a person"
			optionFilterProp="children"
			onChange={handleChange}
			// onFocus={onFocus}
			// onBlur={onBlur}
			// onSearch={onSearch}

			// filterOption={(input, option) =>
			//     option.toLowerCase().indexOf(input.toLowerCase()) >= 0
			// }
		>
			{data.map((item, index) => (
				<Select.Option key={index} value={item.value}>
					{item.name}
				</Select.Option>
			))}
		</Select>
	);
};

CustomSelect.propTypes = {
	data: PropTypes.array,
	onChange: PropTypes.func,
	name: PropTypes.string,
};

export default CustomSelect;
