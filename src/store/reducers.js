import { combineReducers } from 'redux'

import leadAgentReducer from './leadAgent/leadAgentReducer'
const rootReducer = combineReducers({ leadAgentReducer})
export default rootReducer
