import { Button, Menu } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Sider from 'antd/lib/layout/Sider';
import React from 'react';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

function SiderAdmin({ auth, user }) {
  return (
    <Sider>
      <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']}>
        <Menu.Item
          key="1"
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            backgroundColor: '#3ac1dd',
            color: '#0f0f0f',
            width: 'calc(100% - 2rem)',
            margin: '1rem 1rem 4rem 1rem',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          SFLand
        </Menu.Item>

        <SubMenu
          key="sub1"
          title={
            <>
              <Avatar
                src={
                  user.photoURL ||
                  'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                }
                size="small"
                style={{ marginRight: '10px' }}
              />
              {user.displayName || user.email}
            </>
          }
        >
          <Menu.Item key="2">
            <Button danger onClick={() => auth.signOut()} type="text">
              Log out
            </Button>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="1">
          <Link to="/admin/posts">Bài viết</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/admin/users">Tài khoản</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SiderAdmin;
