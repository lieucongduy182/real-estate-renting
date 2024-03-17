import React from 'react';

const BasicFilterOption = ({ minPrice, maxPrice, district, onChangePrice, onChangeDistrict }) => {
    const handleClearPrice = (e) => {
        e.stopPropagation()
        onChangePrice([null, null])
    }

    const handleClearDistrict = (e) => {
        e.stopPropagation()
        onChangeDistrict("district", null)
    }

    return (
        <div className="basic-fitler-option">
            <div className="price item">
                <span className={`title ${!minPrice && 'hide'}`}>{minPrice} - {maxPrice}</span>
                <span className="close lnr lnr-cross" onClick={handleClearPrice}></span>
            </div>
            <div className="district item">
                <span className={`title ${!minPrice && 'hide'}`}>{district}</span>
                <span className="close lnr lnr-cross" onClick={handleClearDistrict}></span>
            </div>
        </div>
    );
};

export default BasicFilterOption;