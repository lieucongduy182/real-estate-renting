import React from 'react';
import MoreIcon from '../../../../assets/icons/circles-menu-3.svg'
import './ButtonMore.scss';

const ButtonMore = ({ handleToggle}) => {
    const handleClick = (e) => {
        e.stopPropagation()
        handleToggle()
    }
    return (
            <div className="btn-more-custom" onClick={handleClick}>
                    <span className="icon u-icon u-icon-large">
                        <img src={MoreIcon} alt="icon" />
                    </span>
                    <span className="title">More filters</span>
            </div>
    );
};

export default ButtonMore;