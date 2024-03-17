import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Col, Row } from 'antd';
import './CardListLoading.scss'

CardListLoading.propTypes = {
    size: PropTypes.number
};

function CardListLoading({ size }) {
    return (
        <>
            <Row>

                {[...Array(size)].map((e, index) => (
                    <Col sm={24} md={12} lg={12} xl={12} className="item-in-list" key={index}>
                        <Skeleton className='card-skeleton' key={index} active />
                    </Col>))}
            </Row>
        </>
    );
}

export default CardListLoading;