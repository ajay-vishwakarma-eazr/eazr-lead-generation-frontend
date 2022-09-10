import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist' // imports from redux-persist
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, rootReducer) // create a persisted reducer
const initialState = {}
const middleware = [ReduxThunk]

const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
const persistor = persistStore(store) // used to create the persisted store, persistor will be used in the next step

export { store, persistor }
