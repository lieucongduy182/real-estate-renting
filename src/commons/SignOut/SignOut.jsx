import { Button, Menu } from 'antd';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectNotification } from '../../redux/notification/notification.selectors';
import './SignOut.scss';

function SignOutContent({ auth, firebase, user, notification }) {
  // get all private chat
  const privateChatRef = firebase.firestore().collection('PrivateChat');
  const query = privateChatRef.orderBy('createAt').limit(25);
  const [privateChats, loading] = useCollectionData(query, { idField: 'id' });

  if (loading) return <>loading...</>;

  return (
    <Menu theme="dark">
      <Menu.Item key={0} className="dropdown__item">
        {privateChats.findIndex((item) => item.idChat.search(user.uid) > -1) >
        -1 ? (
          <Button type="link" style={{ width: '100%' }}>
            <Link
              to={`/message/${
                privateChats[
                  privateChats.findIndex(
                    (item) => item.idChat.search(user.uid) > -1
                  )
                ].idChat
              }`}
            >
              {notification.notification > 0 ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>Tin nhắn</div>
                  <div
                    style={{
                      backgroundColor: 'red',
                      padding: '0.5rem 1rem',
                      color: 'white',
                      borderRadius: '20px',
                    }}
                  >
                    {notification.notification}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  Tin nhắn
                </div>
              )}
            </Link>
          </Button>
        ) : (
          <Button type="link">
            <Link to={`/message/`}>Bạn không có tin nhắn nào</Link>
          </Button>
        )}
      </Menu.Item>
      <Menu.Item key={1} className="dropdown__item">
        <Button type="link">
          <Link to="/me/information">Thông tin cá nhân</Link>
        </Button>
      </Menu.Item>
      <Menu.Item key={2} className="dropdown__item">
        <Button danger onClick={() => auth.signOut()} type="text">
          Đăng xuất
        </Button>
      </Menu.Item>
    </Menu>
  );
}

const mapStateToProps = createStructuredSelector({
  notification: selectNotification,
});

const SignOut = connect(mapStateToProps)(SignOutContent);

export default SignOut;
