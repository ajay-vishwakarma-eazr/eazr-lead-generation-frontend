import {
  CHECK_SERVER,
  CHECK_SERVER_FAILED,
  CLEAR_STORE,
  GET_LEAD_AGENT_BY_ID,
  GET_LEAD_AGENT_BY_ID_FAILED,
  GET_LEAD_AGENT_NAME,
  GET_LEAD_AGENT_NAME_FAILED,
  LOADING,
  POST_LEAD_AGENT_NAME,
  POST_LEAD_AGENT_NAME_FAILED,
  PUT_LEAD_AGENT,
  PUT_LEAD_AGENT_FAILED,
} from './actionTypes'

const initialState = {
  loading: false,
  leadAgent: [],
  newLeadAgent: [],
  error: [],
  checkServer: null,
  message: null,
}

const leadAgentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      }

    case CHECK_SERVER:
      return {
        ...state,
        loading: false,
        checkServer: action.payload,
      }

    case CHECK_SERVER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case GET_LEAD_AGENT_NAME:
      return {
        ...state,
        loading: false,
        leadAgent: action.payload,
      }

    case GET_LEAD_AGENT_NAME_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case GET_LEAD_AGENT_BY_ID:
      return {
        ...state,
        loading: false,
        leadAgent: action.paylod,
      }

    case GET_LEAD_AGENT_BY_ID_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case POST_LEAD_AGENT_NAME:
      return {
        ...state,
        loading: false,
        newLeadAgent: action.payload,
      }

    case POST_LEAD_AGENT_NAME_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case PUT_LEAD_AGENT:
      return {
        ...state,
        loading: false,
        leadAgent: action.payload,
      }

    case PUT_LEAD_AGENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case CLEAR_STORE:
      return {
        ...state,
        loading: false,
        leadAgent: null,
        error: null,
        checkServer: null,
        message: null,
        newLeadAgent: null,
      }

    default:
      return state
  }
}

export default leadAgentReducer
