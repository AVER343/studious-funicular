import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ResponseReducer from './redux/response-handler/response-reducer/response.reducer';
import UserReducer from './redux/user/user.reducer'
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [UserReducer,ResponseReducer]
};

const rootReducer = combineReducers({user:UserReducer,response:ResponseReducer});

export default persistReducer(persistConfig, rootReducer);