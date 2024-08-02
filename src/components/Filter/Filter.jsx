import { Button, Slider } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CustomSelect from '../../commons/CustomSelect/CustomSelect';
import { getHouseData } from '../../redux/house/house.action';
import { selectRoleUser } from '../../redux/user/user.selectors';
import {
  DISTRICT_LOCTION_OPTION,
  HOUSE_PAGE_START,
} from '../../utils/constant';
import { formatPrice } from '../../utils/function.utils';
import AdvanceFilter from './components/AdvanceFilter/AdvanceFilter';
// import CustomInput from '../../commons/CustomInput/CustomInput';
import ButtonFilter from './components/ButtonFilter/ButtonFilter';
import CheckedAdvanceFilter from './components/CheckedAdvanceFilter/CheckedAdvanceFilter';
import './Filter.scss';

const updatedRoomOptions = [
  {
    id: '1',
    name: '1 phòng',
  },
  {
    id: '2',
    name: '2 phòng',
  },
  {
    id: '3',
    name: '3 phòng',
  },
];

const updatedTimeOptions = [
  {
    id: '1',
    name: '1 tháng',
  },
  {
    id: '2',
    name: '2 tháng',
  },
  {
    id: '3',
    name: '3 tháng',
  },
];

const priceOptions = {
  0: {
    style: {
      color: '#debd64',
    },
    label: <strong>0đ</strong>,
  },
  // 5000: '5.000.000đ',
  15000000: {
    style: {
      color: '#debd64',
    },
    label: <strong>15.000.000đ</strong>,
  },
};

const INITAL_FILTER_OPTION = [
  { title: 'Type' },
  { title: 'Style' },
  { title: 'Near' },
  { title: 'Facility' },
  { title: 'Service' },
];

const FilterComponent = ({ getHouseData, role }) => {
  const [animationFilter, setAnimationFilter] = useState(false);
  const [filter, setFilter] = useState({});
  const [isAdvanceFilterVisible, setIsAdvanceFilterVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState(INITAL_FILTER_OPTION); // advanced filer options

  const onFilter = () => {
    // TODO
    const { district, minPrice, maxPrice } = filter;
    getHouseData({
      pageNum: HOUSE_PAGE_START,
      district,
      minPrice,
      maxPrice,
      role,
    });
  };

  const onResetFilter = () => {
    setFilter({});
    getHouseData({
      pageNum: HOUSE_PAGE_START,
      district: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      role,
    });
  };

  const onChangePrice = (value) => {
    console.debug('price ', value);

    const newFilter = { ...filter };
    newFilter.minPrice = value[0];
    newFilter.maxPrice = value[1];
    console.debug('new filter in price: ', newFilter);
    setFilter(newFilter);
  };

  const onChangeValue = (attribute, value) => {
    const newFilter = { ...filter };
    newFilter[attribute] = value;
    console.debug('new Filter: ', newFilter);
    setFilter(newFilter);
  };

  const handleToggleAdvanceFilter = () => {
    console.log('on toggle');
    setIsAdvanceFilterVisible(!isAdvanceFilterVisible);
  };

  /**
   * // TODO: edit when call api
   * @param {String} option
   */
  const onChangeFitlerOption = (title, checkedOptions) => {
    const newFilter = filterOptions.map((item) => {
      if (item.title === title) {
        return {
          title,
          checkedOptions,
        };
      }
      return item;
    });

    setFilterOptions(newFilter);
  };

  const onRemoveOption = (title, value) => {
    const newOptions = filterOptions.map((item) => {
      if (item.title === title) {
        const newOptions = item.checkedOptions.filter((e) => e !== value);
        return {
          title,
          checkedOptions: newOptions,
        };
      }
      return item;
    });

    setFilterOptions(newOptions);
  };

  const onRemoveAllOptionAdvanced = () => {
    setFilterOptions(INITAL_FILTER_OPTION);
  };

  const changeBackgroundHeader = () => {
    if (window.scrollY > 140) {
      setAnimationFilter(true);
    } else {
      setAnimationFilter(false);
    }
  };

  window.addEventListener('scroll', changeBackgroundHeader);

  return (
    <section
      id="filter"
      className={`filter ${animationFilter ? 'native' : ''}`}
    >
      <div className="btn-group top">
        <Button type="primary" danger onClick={onResetFilter}>
          Reset Filter
        </Button>
      </div>

      <div style={{ width: '100%', position: 'relative' }}>
        <div
          className={`basic-filter-content ${animationFilter ? 'native' : ''}`}
        >
          <div className="filter-option">
            <div className="filter-item filter-price">
              <div className="title">Khoảng giá</div>
              <div className="price-range">
                {/* <CustomInput type="number" placeholder="from" name="priceFrom" onChange={onChangeValue}/>
                        <CustomInputComment type="number" placeholder="to" name="priceTo" onChange={onChangeValue}/> */}
                <Slider
                  min={0}
                  max={20000000}
                  marks={priceOptions}
                  defaultValue={[0, 5000000]}
                  range
                  included={true}
                  step={500000}
                  tipFormatter={formatPrice}
                  onChange={onChangePrice}
                />
              </div>
            </div>
            <div className="filter-select-group">
              <div className="filter-item">
                <div className="title">Vị trí</div>
                <CustomSelect
                  data={DISTRICT_LOCTION_OPTION}
                  name="district"
                  onChange={onChangeValue}
                />
              </div>
              <div className="filter-item">
                <div className="title">Số phòng</div>
                <CustomSelect
                  data={updatedRoomOptions}
                  name="room"
                  onChange={onChangeValue}
                />
              </div>
              <div className="filter-item">
                <div className="title">Thời gian đăng bài</div>
                <CustomSelect
                  data={updatedTimeOptions}
                  name="updatedTime"
                  onChange={onChangeValue}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="btn-group">
        <div className="btn-filter">
          <ButtonFilter onClick={onFilter} type="primary" size="large">
            Filter
          </ButtonFilter>
        </div>
      </div>
      <div className="checked-option">
        <CheckedAdvanceFilter
          filterOptions={filterOptions}
          onRemoveOption={onRemoveOption}
        />
      </div>
      <div
        className={`more-option-filter ${
          isAdvanceFilterVisible ? 'show' : 'hide'
        }`}
      >
        <AdvanceFilter
          visible={isAdvanceFilterVisible}
          filterOptions={filterOptions}
          handleToggle={handleToggleAdvanceFilter}
          onChangeFitlerOption={onChangeFitlerOption}
          clearAll={onRemoveAllOptionAdvanced}
        />
      </div>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  role: selectRoleUser,
});

const Filter = connect(mapStateToProps, { getHouseData })(FilterComponent);

export default Filter;
