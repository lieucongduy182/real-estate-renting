import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import './CustomCheckbox.scss'

const DISPLAY_DEFAULT_OPTION = 5
const CustomCheckbox = ({ title, options, onChangeFitlerOption, checkedValue}) => {
    const [isShowMore, setIsShowMore] = useState(false)
    const onChange = (checkedValues) => {
        onChangeFitlerOption(title, checkedValues)
    }

    return (
        <div className="custom-checkbox">
            <h4 className="label">{title}</h4>
            <Checkbox.Group className="checkbox-group" options={options.slice(0, isShowMore ? options.length : DISPLAY_DEFAULT_OPTION)} value={checkedValue} onChange={onChange} />
            {
                options.length > DISPLAY_DEFAULT_OPTION &&
                <div className="more" onClick={() => setIsShowMore(!isShowMore)}>
                    {
                        isShowMore ? <>
                            <span className="icon lnr lnr-chevron-up"></span>
                            <span className="content">Less</span>
                        </> :
                            <>
                            <span className="icon lnr lnr-chevron-down"></span>
                            <span className="content">More</span>
                            </>
                    }
                </div>
            }
        </div>
    );
};

CustomCheckbox.propTypes = {
    title: PropTypes.string,
    options: PropTypes.array,
};

export default CustomCheckbox;