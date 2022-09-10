import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { LeadAgent } from '../pages/LeadAgent'
import { Lead } from '../pages/Lead'
import { AllLeads } from '../pages/AllLeads'
import { EditLead } from '../pages/EditLead'
import { ViewLead } from '../pages/ViewLead'
import { ProtectedRoutes } from './ProtectedRoutes'
export const AnimatedRoutes = () => {
  return (
    <AnimatePresence>
      <Routes>
        <Route path={'/*'} element={<LeadAgent />} />
        <Route path={'/lead/:_id'} element={<ProtectedRoutes Component={Lead} />} />
        <Route path={'/all-leads/:_id'} element={<AllLeads />} />
        <Route path={'/edit-lead/:leadAgentID/:_id'} element={<EditLead />} />
        <Route path={'/view-lead/:leadAgentID/:_id'} element={<ViewLead />} />
      </Routes>
    </AnimatePresence>
  )
}
