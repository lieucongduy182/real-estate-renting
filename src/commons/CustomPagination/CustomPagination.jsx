import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import './CustomPagination.scss';

const CustomPagination = ({ current, total, pageSize, onChange, ...props }) => {
    return (
        <Pagination
            className="custom-pagination"
            // size="small"
            current={current || 1}
            total={total} onChange={onChange}
            pageSize={pageSize || 4}
            {...props}
        />
    );
};

CustomPagination.propTypes = {
    defaultCurrent: PropTypes.number,
    total: PropTypes.number,
    onChange: PropTypes.func,
};

export default CustomPagination;