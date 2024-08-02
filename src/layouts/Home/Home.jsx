import { Affix, Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import Filter from '../../components/Filter/Filter';
import GlobalChat from '../../components/GlobalChat/GlobalChat';
import HomeContent from '../../components/HomeContent/HomeContent';
import Role from '../../components/Role/Role';
import './Home.scss';

const Home = ({ user, firestore, firebase }) => {
  const [isVisibleChat, setIsVisibleChat] = useState(false);
  const isLoggedIn = !!user;

  return (
    <main className="home">
      <div className="background__image">
        <Role />
        {/* filter */}
        <Filter />
        {/* home content */}
      </div>
      <HomeContent user={user} firestore={firestore} firebase={firebase} />

      {!!isLoggedIn && (
        <Affix offsetBottom={100} className="affix">
          <Button
            type="primary"
            onClick={() => {
              setIsVisibleChat(true);
            }}
            style={{
              marginRight: '3rem',
              backgroundColor: '#debd64',
              border: 'none',
              color: '#0f0f0f',
            }}
          >
            Mở chat
          </Button>
        </Affix>
      )}

      <Modal
        onCancel={() => {
          setIsVisibleChat(false);
        }}
        visible={isVisibleChat}
        key="bottom"
        height="90%"
        footer={null}
        className="modal__chat"
      >
        <GlobalChat user={user} firestore={firestore} firebase={firebase} />
      </Modal>
    </main>
  );
};

export default Home;
