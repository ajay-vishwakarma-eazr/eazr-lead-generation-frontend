import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function ProtectedRoutes({ Component }) {
  const history = useNavigate()
  const dispatch = useDispatch()
  const { leadAgent } = useSelector(state => state.leadAgentReducer)
  useEffect(() => {
    if (leadAgent.name === null) {
      history('/')
    }
  }, [])

  return <Component />
}
