import 'antd/dist/antd.css';
import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeAdmin from './AdminLayouts/HomeAdmin';
import './App.css';
import Profile from './commons/Profile/Profile';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
// IMPORT COMPONENTS
import Home from './layouts/Home/Home';
import PrivateChat from './layouts/PrivateChat/PrivateChat';
import './sass/index.scss';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCRMf4T2vfQ7axmd-jWUobG8zFGKlhEfUo',
    authDomain: 'buzzhome-app.firebaseapp.com',
    projectId: 'buzzhome-app',
    storageBucket: 'buzzhome-app.appspot.com',
    messagingSenderId: '473441889352',
    appId: '1:473441889352:web:12ea24944fffeca9b63c7d',
    measurementId: 'G-BRCB35R56D',
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
// const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);

  const adminRef = firestore.collection('admin');
  const query = adminRef.limit(25);
  const [admin] = useCollectionData(query, { idField: 'id' });

  return (
    <div className="App">
      {!!user ? (
        user.uid === admin?.[0]?.uid ? (
          <>
            <Switch>
              <Redirect from="/home" to="/admin" exact />
              <Redirect from="/" to="/admin" exact />

              <Route path="/admin">
                <HomeAdmin
                  auth={auth}
                  user={user}
                  firestore={firestore}
                  firebase={firebase}
                />
              </Route>
            </Switch>
          </>
        ) : (
          <>
            <Header
              auth={auth}
              firebase={firebase}
              user={user}
              storage={storage}
            />
            <Switch>
              <Redirect from="/admin" to="/home" exact />
              <Redirect from="/" to="/home" exact />

              <Route path="/home">
                <Home user={user} firestore={firestore} firebase={firebase} />
              </Route>
              {!!user && (
                <>
                  <Route path="/me">
                    <Profile
                      user={user}
                      firebase={firebase}
                      storage={storage}
                    />
                  </Route>
                  <Route path="/message/:id">
                    <PrivateChat
                      user={user}
                      firebase={firebase}
                      firestore={firestore}
                    />
                  </Route>
                </>
              )}
            </Switch>
            {/* footer */}
            <Footer />
          </>
        )
      ) : (
        <>
          <Header
            auth={auth}
            firebase={firebase}
            user={user}
            storage={storage}
          />
          <Switch>
            <Redirect from="/" to="/home" exact />
            <Redirect from="/admin" to="/home" />
            <Redirect from="/message/:id" to="/home" exact />
            <Redirect from="/message" to="/home" exact />

            <Route path="/home">
              <Home user={user} firestore={firestore} firebase={firebase} />
            </Route>
            {!!user && (
              <>
                <Route path="/me">
                  <Profile user={user} firebase={firebase} storage={storage} />
                </Route>
              </>
            )}
          </Switch>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
