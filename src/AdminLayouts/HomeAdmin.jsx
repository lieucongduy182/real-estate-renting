import Layout from 'antd/lib/layout/layout';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ContentAdmin from './Components/ContentAdmin/ContentAdmin';
import SiderAdmin from './Components/SiderAdmin/SiderAdmin';
import UserManager from './Components/UserManager/UserManager';

function HomeAdmin({ auth, user, firebase, firestore }) {
  return (
    <Layout style={{ height: '100vh' }}>
      <SiderAdmin auth={auth} user={user} />

      <Switch>
        <Redirect from="/admin" to="/admin/posts" exact />

        <Route path="/admin/posts">
          <ContentAdmin firebase={firebase} firestore={firestore} />
        </Route>
        <Route path="/admin/users">
          <UserManager firebase={firebase} firestore={firestore} user={user} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default HomeAdmin;
