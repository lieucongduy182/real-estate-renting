import React from 'react'
import { Empty } from 'antd';
import './EmptyCommon.scss';

const EmptyCommon = () => {
    return (
        <div className="empty-common">
            <Empty description="No data to display" />
        </div>
    );
};

export default EmptyCommon;