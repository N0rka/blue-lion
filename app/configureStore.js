import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const configureStore = () => {

    const middlewares = [ thunk ];
    middlewares.push(createLogger());

    return createStore(
        rootReducer,
        applyMiddleware(...middlewares)
    );
};
export default configureStore;
