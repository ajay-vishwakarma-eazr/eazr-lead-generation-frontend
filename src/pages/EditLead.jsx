import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Alert,
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material'
import {
  PersonOutlineOutlined,
  DraftsOutlined,
  Phone,
  Paid,
  AddBox,
  Language,
  AccountCircle,
  ContactPhone,
  MarkEmailRead,
  LocationCity,
  Home,
} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { PageContainer } from '../components/PageContainer'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ip } from '../config/config'
import { useState } from 'react'
export const EditLead = () => {
  const {
    getValues,
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm()
  const history = useNavigate()
  const { leadAgentID, _id } = useParams()
  const [editLead, seteditLead] = useState(null)
  useEffect(() => {
    axios
      .get(`${ip}/lead/${_id}`)
      .then(res => {
        seteditLead({
          brandName: res.data.brandName,
          brandEmail: res.data.brandEmail,
          contactNumber: res.data.contactNumber,
          authPersonName: res.data.authPersonName,
          authPersonEmail: res.data.authPersonEmail,
          authPersonContactNumber: res.data.authPersonContactNumber,
          city: res.data.city,
          state: res.data.state,
          website: res.data.website,
          paymentGateway: res.data.paymentGateway,
          sector: res.data.sector,
          ticketSize: res.data.ticketSize,
          productRange: res.data.productRange,
        })
      })
      .catch(err => {
        alert(err)
      })
  }, [])

  useEffect(() => {
    reset(editLead)
  }, [editLead])

  const onSubmit = data => {
    const brandName = getValues('brandName')
    const brandEmail = getValues('brandEmail')
    const contactNumber = getValues('contactNumber')
    const authPersonName = getValues('authPersonName')
    const authPersonEmail = getValues('authPersonEmail')
    const authPersonContactNumber = getValues('authPersonContactNumber')
    const city = getValues('city')
    const state = getValues('state')
    const website = getValues('website')
    const paymentGateway = getValues('paymentGateway')
    const sector = getValues('sector')
    const ticketSize = getValues('ticketSize')
    const productRange = getValues('productRange')

    axios
      .patch(`${ip}/lead/${_id}`, {
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
        seteditLead({
          brandName: res.data.brandName,
          brandEmail: res.data.brandEmail,
          contactNumber: res.data.contactNumber,
          authPersonName: res.data.authPersonName,
          authPersonEmail: res.data.authPersonEmail,
          authPersonContactNumber: res.data.authPersonContactNumber,
          city: res.data.city,
          state: res.data.state,
          website: res.data.website,
          paymentGateway: res.data.paymentGateway,
          sector: res.data.sector,
          ticketSize: res.data.ticketSize,
          productRange: res.data.productRange,
        })
        history(`/all-leads/${leadAgentID}`)
      })
      .catch(err => {
        alert(err)
      })
  }

  const allSectors = ['Health', 'Education', 'Fitness', 'Learning', 'Other']

  return (
    <PageContainer>
      <Typography variant={'h4'}>Edit Lead</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction={'column'} rowGap={3} className="grid">
          <FormControl error={!!errors['brandName']} variant="outlined">
            <InputLabel htmlFor={'brandName'}>Brand Name</InputLabel>
            <OutlinedInput
              id={'brandName'}
              type={'text'}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <PersonOutlineOutlined />
                </InputAdornment>
              }
              label="Brand Name"
              {...register('brandName', { required: 'Please enter brand name' })}
            />
            {!!errors['brandName'] && <FormHelperText id="brandName">{errors['brandName']?.message}</FormHelperText>}
          </FormControl>

          <FormControl error={!!errors['brandEmail']} variant="outlined">
            <InputLabel htmlFor={'brandEmail'}>Brand Email</InputLabel>
            <OutlinedInput
              id={'brandEmail'}
              type={'email'}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <DraftsOutlined />
                </InputAdornment>
              }
              label="Brand Email"
              {...register('brandEmail', { required: 'Please enter brand email' })}
            />
            {!!errors['brandEmail'] && (
              <FormHelperText id={'brandEmail'}>{errors['brandEmail']?.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors['contactNumber']} variant="outlined">
            <InputLabel htmlFor={'contactNumber'}>Contact Number</InputLabel>
            <OutlinedInput
              id={'contactNumber'}
              type={'number'}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <Phone />
                </InputAdornment>
              }
              label="Contact Number"
              {...register('contactNumber', {
                required: 'Please enter contact number',
                maxLength: { value: 10, message: 'Enter 10 digit number' },
                minLength: { value: 10, message: 'Enter 10 digit number' },
              })}
            />
            {!!errors['contactNumber'] && (
              <FormHelperText id="contactNumber">{errors['contactNumber']?.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors['authPersonName']} variant="outlined">
            <InputLabel htmlFor={'authPersonName'}>Auth Person Name</InputLabel>
            <OutlinedInput
              id={'authPersonName'}
              type={'text'}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              }
              label="Auth Person Name"
              {...register('authPersonName', { required: 'Please enter auth person name' })}
            />
            {!!errors['authPersonName'] && (
              <FormHelperText id="authPersonName">{errors['authPersonName']?.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors['authPersonEmail']} variant="outlined">
            <InputLabel htmlFor={'authPersonEmail'}>Auth Person Email</InputLabel>
            <OutlinedInput
              id={'authPersonEmail'}
              type={'email'}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <MarkEmailRead />
                </InputAdornment>
              }
              label="Auth Person Email"
              {...register('authPersonEmail', { required: 'Please enter auth person email' })}
            />
            {!!errors['authPersonEmail'] && (
              <FormHelperText id={'authPersonEmail'}>{errors['authPersonEmail']?.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors['authPersonContactNumber']} variant="outlined">
            <InputLabel htmlFor={'authPersonContactNumber'}>Auth Contact Number</InputLabel>
            <OutlinedInput
              id={'authPersonContactNumber'}
              type={'number'}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <ContactPhone />
                </InputAdornment>
              }
              label="Auth Contact Number"
              {...register('authPersonContactNumber', {
                required: 'Please enter contact number',
                maxLength: { value: 10, message: 'Enter 10 digit number' },
                minLength: { value: 10, message: 'Enter 10 digit number' },
              })}
            />
            {!!errors['authPersonContactNumber'] && (
              <FormHelperText id="authPersonContactNumber">{errors['authPersonContactNumber']?.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors['city']} variant="outlined">
            <InputLabel htmlFor={'city'}>City</InputLabel>
            <OutlinedInput
              id={'city'}
              type={'text'}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <LocationCity />
                </InputAdornment>
              }
              label="City"
              {...register('city', {
                required: 'Please enter city',
              })}
            />
            {!!errors['city'] && <FormHelperText id="city">{errors['city']?.message}</FormHelperText>}
          </FormControl>
          <FormControl error={!!errors['state']} variant="outlined">
            <InputLabel htmlFor={'state'}>State</InputLabel>
            <OutlinedInput
              id={'state'}
              type={'text'}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <Home />
                </InputAdornment>
              }
              label="State"
              {...register('state', {
                required: 'Please enter state',
              })}
            />
            {!!errors['state'] && <FormHelperText id="state">{errors['state']?.message}</FormHelperText>}
          </FormControl>
          <FormControl error={!!errors['website']} variant="outlined" fullWidth>
            <InputLabel htmlFor={'website'}>Website</InputLabel>
            <OutlinedInput
              id={'website'}
              type={'text'}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <Language />
                </InputAdornment>
              }
              label="Website"
              {...register('website', { required: 'Please enter website url' })}
            />
            {!!errors['website'] && <FormHelperText id="website">{errors['website']?.message}</FormHelperText>}
          </FormControl>

          <FormControl error={!!errors['paymentGateway']} variant="outlined" fullWidth>
            <InputLabel htmlFor={'paymentGateway'}>Payment Gateway</InputLabel>
            <OutlinedInput
              id={'paymentGateway'}
              type={'text'}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <Paid />
                </InputAdornment>
              }
              label="Payment Gateway"
              {...register('paymentGateway', { required: 'Please enter paymentGateway' })}
            />
            {!!errors['paymentGateway'] && (
              <FormHelperText id="paymentGateway">{errors['paymentGateway']?.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors['sector']} variant="outlined">
            <InputLabel>Sector</InputLabel>
            <Controller
              name="sector"
              control={control}
              type="text"
              render={({ props }) => (
                <Select
                  {...props}
                  label="Sector"
                  multiple
                  defaultValue={[]}
                  style={{ textAlign: 'left' }}
                  {...register('sector', { required: 'Please choose one' })}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}>
                  {allSectors.map(item => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {!!errors['sector'] && <FormHelperText>{errors['sector']?.message}</FormHelperText>}
          </FormControl>

          <FormControl error={!!errors['ticketSize']} variant="outlined">
            <InputLabel htmlFor={'ticketSize'}>Ticket Size</InputLabel>
            <OutlinedInput
              id={'ticketSize'}
              type={'number'}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <AddBox />
                </InputAdornment>
              }
              label="Ticket Size"
              {...register('ticketSize', {
                required: 'Enter ticketSize',
              })}
            />
            {!!errors['ticketSize'] && <FormHelperText id="ticketSize">{errors['ticketSize']?.message}</FormHelperText>}
          </FormControl>

          <FormControl error={!!errors['productRange']} variant="outlined">
            <InputLabel>Product Range</InputLabel>
            <Controller
              render={props => (
                <Select
                  style={{ textAlign: 'left' }}
                  label="Product Range"
                  defaultValue=""
                  {...register('productRange', { required: 'Please choose one' })}>
                  <MenuItem value={'0 to 5'}>0 to 5</MenuItem>
                  <MenuItem value={'5 to 10'}>6 to 10</MenuItem>
                  <MenuItem value={'10 to 25'}>11 to 25</MenuItem>
                  <MenuItem value={'25 to 50'}>26 to 50</MenuItem>
                  <MenuItem value={'50 to 100'}>51 to 100</MenuItem>
                  <MenuItem value={'Above 100'}>Above 100</MenuItem>
                </Select>
              )}
              name="productRange"
              control={control}
            />
            {!!errors['productRange'] && <FormHelperText>{errors['productRange']?.message}</FormHelperText>}
          </FormControl>

          <Button
            className="button"
            variant={'contained'}
            type={'submit'}
            size={'large'}
            style={{ height: '56px' }}
            fullWidth>
            EDIT
          </Button>
        </Grid>
      </form>
    </PageContainer>
  )
}
