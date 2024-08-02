import React, { memo, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Auth from '../../commons/Auth/Auth';
import UserHeader from '../../commons/UserHeader/UserHeader';
import Logo from './components/Logo/Logo';
import './Header.scss';
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { getHouseData } from '../../redux/house/house.action';
import { createStructuredSelector } from 'reselect';
import { selectRoleUser } from '../../redux/user/user.selectors';
import useSpeechToText from '../../hooks/useSpeechToText';
import SpeechRecognitionModal from './components/SpeechRecognitionModal';

const { Search } = Input;

const Header = ({ auth, firebase, user, getHouseData, role }) => {
  const [header, setHeader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isListening, transcript, startListening, stopListening } =
    useSpeechToText({ continuous: true });

  const [inputValue, setInputValue] = useState('');

  const handleStopVoiceInput = () => {
    setInputValue(
      (prevVal) =>
        prevVal +
        (transcript.length ? (prevVal.length ? ' ' : '') + transcript : '')
    );
    stopListening();
  };

  const handleStartVoiceInput = () => {
    isListening ? handleStopVoiceInput() : startListening();
  };

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    handleStopVoiceInput();
  };

  const changeBackgroundHeader = useCallback(() => {
    if (window.scrollY > 140) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  }, []);

  window.addEventListener('scroll', changeBackgroundHeader);

  const onSearch = async (value) => {
    try {
      await getHouseData({ role, keywords: value });
    } catch (error) {
      console.error(error);
    }
  };

  const searchValue = isListening
    ? `${inputValue} ${transcript}`.trim()
    : inputValue;

  return (
    <header className={`header ${header ? 'native' : ''}`}>
      <div className="header-wrap">
        <div className="header__logo">
          <Link to="/home">
            <Logo />
          </Link>
        </div>

        {header ? (
          <div className="header__search">
            <Search
              placeholder="Tìm kiếm ..."
              onSearch={onSearch}
              name="search"
              className="search"
              enterButton
              value={searchValue}
              disabled={isListening}
              onChange={handleChangeInput}
              prefix={
                <AudioOutlined
                  className="header__search__audio_icon"
                  onClick={showModal}
                />
              }
            />
          </div>
        ) : (
          <></>
        )}

        <div className="header__auth">
          {!!!user ? (
            <Auth auth={auth} firebase={firebase} header={header} />
          ) : (
            <UserHeader auth={auth} firebase={firebase} user={user} />
          )}
        </div>
      </div>
      <SpeechRecognitionModal
        visible={isModalVisible}
        onClose={handleClose}
        startListening={handleStartVoiceInput}
        stopListening={handleStopVoiceInput}
        listening={isListening}
        transcript={transcript}
      />
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  role: selectRoleUser,
});

const HeaderComponent = connect(mapStateToProps, { getHouseData })(
  memo(Header)
);

export default HeaderComponent;
