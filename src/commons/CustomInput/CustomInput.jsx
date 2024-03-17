import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './CustomInput.scss';

const CustomInput = ({ placeholder, type, onChange, name}) => {
    const [value, setValue] = useState("")

    const handleChange = (e) =>{
        const newValue = e.target.value
        setValue(newValue)
        onChange(name, newValue)
    }

    return (
       <input className="custom-input" placeholder={placeholder} type={type || "text"} value={value} onChange={handleChange}/>
    );
};

CustomInput.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CustomInput;