import axios from 'axios'
import { ip } from '../../config/config'
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

export const checkingServer = () => {
  return dispatch => {
    dispatch({
      type: LOADING,
    })
    axios
      .get(`${ip}/`)
      .then(res => {
        dispatch({
          type: CHECK_SERVER,
          payload: res.data,
        })
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: CHECK_SERVER_FAILED,
          payload: err.message,
        })
      })
  }
}

export const getLeadAgentbyName = name => {
  return dispatch => {
    dispatch({
      type: LOADING,
    })
    axios
      .get(`${ip}/lead-agents-name/${name}`)
      .then(res => {
        dispatch({
          type: GET_LEAD_AGENT_NAME,
          payload: res.data,
        })
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: GET_LEAD_AGENT_NAME_FAILED,
          payload: err.response.message,
        })
      })
  }
}

export const getLeadAgentByID = () => {
  return dispatch => {
    axios
      .get(`${ip}/lead-agents`)
      .then(res => {
        dispatch({
          type: GET_LEAD_AGENT_BY_ID,
          payload: res.data.leads,
        })
      })
      .catch(err => {
        dispatch({
          type: GET_LEAD_AGENT_BY_ID_FAILED,
          payload: err.response.message,
        })
      })
  }
}

export const postLeadAgent = name => {
  return dispatch => {
    dispatch({
      type: LOADING,
    })
    axios
      .post(`${ip}/lead-agents`, { name })
      .then(res => {
        dispatch({
          type: POST_LEAD_AGENT_NAME,
          payload: res.data,
        })
      })
      .catch(err => {
        dispatch({
          type: POST_LEAD_AGENT_NAME_FAILED,
          payload: err.response.message,
        })
      })
  }
}

export const putLeadAgentById = () => {
  return dispatch => {
    dispatch({
      type: LOADING,
    })
    axios
      .put(`${ip}/lead-agents/${_id}`, {
        brandName,
        brandEmail,
        contactNumber,
        authPersonName,
        authPersonEmail,
        authPersonContactNumber,
        city,
        state,
        website,
        paymentGateway,
        sector,
        ticketSize,
        productRange,
      })

      .then(res => {
        dispatch({
          type: PUT_LEAD_AGENT,
          payload: res.data,
        })
      })
      .catch(err => {
        dispatch({
          type: PUT_LEAD_AGENT_FAILED,
          payload: err.response.message,
        })
      })
  }
}


export const clearStore =()=>{
  return dispatch =>{
    dispatch({
      type:CLEAR_STORE
    })
  }
}