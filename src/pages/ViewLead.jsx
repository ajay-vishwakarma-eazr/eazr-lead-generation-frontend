import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../assets/css/global.css'
// import {useDispatch} from "react-redux";
import { Typography, Button, Grid } from '@mui/material'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { PageContainer } from '../components/PageContainer'
import { ip } from '../config/config'
import '../assets/css/global.css'
export const ViewLead = () => {
  const [viewLead, setViewLead] = useState(null)
  const { leadAgentID, _id } = useParams()
  const history = useNavigate()
  useEffect(() => {
    axios
      .get(`${ip}/lead/${_id}`)
      .then(res => {
        setViewLead(res.data)
      })
      .catch(err => alert(err))
  }, [])
  return (
    <PageContainer>
      <Typography variant={'h4'}>Profile Info </Typography>

      {viewLead &&
        [viewLead].map((agent, i) => {
          return (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableRow>
                    <TableCell variant="head">Brand Name</TableCell>
                    <TableCell>{agent.brandName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Brand Email</TableCell>
                    <TableCell>{agent.brandEmail}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Contact Number</TableCell>
                    <TableCell>{agent.contactNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Authorise Person Name</TableCell>
                    <TableCell>{agent.authPersonName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Authorise Person Email</TableCell>
                    <TableCell>{agent.authPersonEmail}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Authorise Person Contact Number</TableCell>
                    <TableCell>{agent.authPersonContactNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">City</TableCell>
                    <TableCell>{agent.city}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">State</TableCell>
                    <TableCell>{agent.state}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Website</TableCell>
                    <TableCell>{agent.website}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Payment Gateway</TableCell>
                    <TableCell>{agent.paymentGateway}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Sector</TableCell>
                    <TableCell>{agent.sector + '  '}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Ticket Size</TableCell>
                    <TableCell>{agent.ticketSize}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Product Range</TableCell>
                    <TableCell>{agent.productRange}</TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </>
          )
        })}

      <Button
        className="button"
        variant={'contained'}
        type={'button'}
        size={'large'}
        style={{ height: '56px', width: '20%' }}
        onClick={() => {
          history(`/all-leads/${leadAgentID}`)
        }}
        fullWidth>
        Back
      </Button>
    </PageContainer>
  )
}
