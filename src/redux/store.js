import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import logger from 'redux-logger';


const sagaMiddleWare = createSagaMiddleware();
const middlewares = [sagaMiddleWare];

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger); // log to console only if in production environment
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleWare.run(rootSaga);

export default store;
