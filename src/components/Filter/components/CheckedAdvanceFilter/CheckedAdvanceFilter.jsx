import React from 'react';
import PropTypes from 'prop-types';
import './CheckedAdvanceFilter.scss'


const CheckedAdvanceFilter = ({ filterOptions, onRemoveOption}) => {
    return (
        <div className="checked-advance-filter">
            {
                filterOptions.map(item => {
                    return (item.checkedOptions || []).map(value => (
                        <div className="checked-item" >
                            <span className="title">{value}</span>
                            <span className="close lnr lnr-cross" onClick={() => onRemoveOption(item.title, value)}></span>
                        </div>
                    ))
                })
            }
        </div>
    );
};

CheckedAdvanceFilter.propTypes = {
    filterOptions: PropTypes.array,
    onRemoveOption: PropTypes.func
};

export default CheckedAdvanceFilter;