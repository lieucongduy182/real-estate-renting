import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import ButtonFilter from '../ButtonFilter/ButtonFilter';
import './AdvanceFilter.scss';

const advanceFilter = [
    {
        title: 'Type',
        options: [
            { label: 'Room Rentals', value: 'Room Rentals' },
            { label: 'Street House', value: 'Street House' },
            { label: 'Apartments', value: 'Apartments' },
        ],
        index: 0
    },
    {
        title: 'Style',
        options: [
            { label: 'Cosy', value: 'Cosy' },
            { label: 'Traditional', value: 'Traditional' },
            { label: 'Mordern', value: 'Mordern' },
        ],
        index: 1
    },
    {
        title: 'Near',
        options: [
            { label: 'Bus station', value: 'Bus station' },
            { label: 'Gas station', value: 'Gas station' },
            { label: 'Police station', value: 'Police station' },
            { label: 'Market/ supermarket', value: 'Market/ supermarket' },
            { label: 'Hospital', value: 'Hospital' },
        ],
        index: 2
    },
    {
        title: 'Facility',
        options: [
            { label: 'Wifi', value: 'Wifi' },
            { label: 'Air conditioner', value: 'Air conditioner' },
            { label: 'Refrigerator', value: 'Refrigerator' },
            { label: 'Utensil', value: 'Utensil' },
            { label: 'Parking area', value: 'Parking area' },
            { label: 'Car parking', value: 'Car parking' },
            { label: 'Swimming pool', value: 'Swimming pool' },
        ],
        index: 3
    },
    {
        title: 'Service',
        options: [
            { label: 'Laundry', value: 'Laundry' },
            { label: 'Home cleaning', value: 'Home cleaning' },
        ],
        index: 4
    }
]

const AdvanceFilter = ({ visible, handleToggle, onChangeFitlerOption, filterOptions, clearAll}) => {
    const handleClick = (e) => {
        e.stopPropagation()
        handleToggle()
    }

    const handleClearAll = e => {
        e.stopPropagation()
        clearAll()
    }

    return (
        <Modal
            className="modal-advanced-filter"
            centered
            style={{ top: 20 }}
            width={"60%"}
            visible={visible}
            onCancel={() => handleToggle()}
            footer={
                <div className="btn">
                    <div className="btn-clear" onClick={handleClearAll}>
                        <span className="lnr lnr-trash"></span>
                        <u>
                            Clear all
                    </u>
                    </div>

                    <ButtonFilter type="primary" size="large" onClick={handleClick}>Filter</ButtonFilter>
                </div>
            }
            title = "More filters"
        >
        <div className="advance-filter">
            <div className="group-item">
                {
                        advanceFilter.map(item => <div className="item" key={item.title}>
                        <CustomCheckbox  {...item} onChangeFitlerOption={onChangeFitlerOption} checkedValue={(filterOptions[item.index]||{}).checkedOptions} />
                        </div>)
                }
            </div>
            
        </div>
        </Modal>
    );
};

AdvanceFilter.propTypes = {
    handleToggle: PropTypes.func,
};

export default AdvanceFilter;