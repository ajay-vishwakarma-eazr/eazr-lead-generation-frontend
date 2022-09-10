import * as React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { ip } from '../config/config'
import '../assets/css/global.css'
import { visuallyHidden } from '@mui/utils'
import { Alert, Button, Grid, TextField } from '@mui/material'
import { PageContainer } from '../components/PageContainer'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Close, Download, MoreVert } from '@mui/icons-material'
import ClipLoader from 'react-spinners/ClipLoader'
import { saveAs } from 'file-saver'
import CalanderDateRangePicker from '../components/CalanderDateRangePicker'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index])
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis?.map(el => el[0])
}

const headCells = [
  {
    id: 'brandName',
    label: 'Brand Name',
  },
  {
    id: 'brandEmail',
    label: 'Brand Email',
  },
  {
    id: 'contactNumber',
    label: 'Phone',
  },
  {
    id: 'website',
    label: 'Website',
  },
  {
    id: 'city',
    label: 'City',
  },
  {
    id: 'createdAt',
    label: 'CreatedAt',
  },
  {
    id: 'Action',
    label: 'Action',
  },
]

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead style={{ width: '100%' }}>
      <TableRow>
        {headCells?.map(headCell => (
          <TableCell align="center" key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func?.isRequired,
  order: PropTypes.oneOf(['asc', 'desc'])?.isRequired,
  orderBy: PropTypes.string?.isRequired,
}

export function AllLeads() {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [lead, setLead] = useState(null)
  const [filterLead, setFilterLead] = useState(null)
  const [search, setSearch] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { _id } = useParams()
  const history = useNavigate()
  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${ip}/lead-agents/${_id}`)
      .then(res => {
        setLead(res.data.leads)
        setIsLoading(false)
        setFilterLead(res.data.leads)
      })
      .catch(err => alert(err))
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const handleSearch = e => {
    if (e.target.value === '') {
      setLead(filterLead)
    } else {
      const filterResult = lead.filter(
        item =>
          item.brandName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.brandEmail.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.contactNumber.toString().includes(e.target.value.toString()) ||
          item.city.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.createdAt.slice(0, 10).toString().includes(e.target.value)
      )
      setLead(filterResult)
    }
    setSearch(e.target.value)
  }

  const downloadExcel = () => {
    axios
      .get(`${ip}/excel-download/${_id}`, {
        responseType: 'arraybuffer',
      })
      .then(res => {
        const blob = new Blob([res.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })

        saveAs(blob, 'Report.xlsx')
      })
      .catch(err => alert(err))
  }

  return (
    <PageContainer>
      <Grid container direction={'column'} rowGap={3} style={{ width: '100%' }}>
        <Typography variant="h4" id="tableTitle" component="div" style={{ paddingBottom: '20px' }}>
          All Leads
        </Typography>
        <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <TextField
            style={{ width: '40%' }}
            autoComplete="off"
            id="standard-basic"
            label="Search..."
            variant="standard"
            size="small"
            value={search}
            onChange={handleSearch}
          />
          <Grid style={{ display: 'flex' }}>
            {/* <span style={{ color: '#90caf9', paddingRight: '30px' }}>
              <MoreVert onClick={() => setIsOpen(!isOpen)}></MoreVert>
              {isOpen === true && <CalanderDateRangePicker />}
            </span> */}
            <span style={{ color: '#90caf9', paddingRight: '30px', cursor: 'pointer' }}>
              <Download onClick={downloadExcel} />
            </span>
            <span style={{ color: '#90caf9', cursor: 'pointer' }}>
              <Close onClick={() => history(`/`)} />
            </span>
          </Grid>
        </Grid>
        <TableContainer component={Paper} box-shadow={'none'}>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={lead?.length}
            />
            <TableBody>
              {isLoading === true ? (
                <ClipLoader color="#bbbbbb" loading={true} size={60} />
              ) : (
                stableSort(lead, getComparator(order, orderBy))
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((Leads, index) => {
                    return (
                      <TableRow hover key={index} style={{ width: '100%' }}>
                        <TableCell align="center">{Leads.brandName}</TableCell>
                        <TableCell align="center">{Leads.brandEmail}</TableCell>
                        <TableCell align="center">{Leads.contactNumber}</TableCell>
                        <TableCell align="center">
                          <a style={{ color: '#90caf9', cursor: 'pointer',textDecoration:'none' }} href={Leads.website}>
                            {Leads.website}
                          </a>
                        </TableCell>
                        <TableCell align="center">{Leads?.city}</TableCell>
                        <TableCell align="center">{Leads.createdAt.slice(0, 10)}</TableCell>
                        <TableCell align="center" style={{ flexWrap: 'nowrap', width: '100%' }}>
                          <Button onClick={() => history(`/edit-lead/${_id}/${Leads._id}`)}>Edit</Button>
                          <Button onClick={() => history(`/view-lead/${_id}/${Leads._id}`)}>View</Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={lead?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Button
          className="button"
          variant={'contained'}
          type={'button'}
          size={'large'}
          style={{ height: '56px', width: '20%' }}
          onClick={() => {
            history(`/lead/${_id}`)
          }}
          fullWidth>
          Back
        </Button>
      </Grid>
    </PageContainer>
  )
}
