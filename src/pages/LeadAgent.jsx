import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import '../assets/css/global.css'
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material'
import { Add, LocalPhone } from '@mui/icons-material'
import { PageContainer } from '../components/PageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { ip } from '../config/config'
import { useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'white',
}
export const LeadAgent = () => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const history = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    setLoading(true)
    axios
      .get(`${ip}/`)
      .then(res => {
        setLoading(false)
      })
      .catch(err => setError(err.message))
  }, [])

  const onSubmit = data => {
    const name = getValues('name')
    axios
      .get(`${ip}/lead-agents-name/${name}`)
      .then(res => {
        if (res.data.length === 0 || res.data === undefined) {
          axios
            .post(`${ip}/lead-agents`, { name })
            .then(res => {
              history(`/lead/${res.data._id}`)
            })
            .catch(err => alert(err))
        } else {
          return history(`/lead/${res.data[0]._id}`)
        }
      })
      .catch(err => alert(err))
  }

  const data = (
    <PageContainer>
      {loading === true ? (
        <ClipLoader loading={loading} cssOverride={override} size={50} />
      ) : (
        <Grid>
          <Grid container direction={'column'} rowGap={1} justifyContent={'center'}>
            <Box
              component="img"
              sx={{
                height: 98.25,
                width: 120.45,
                marginBottom: '20px',
              }}
              alt="Eazr logo"
              src="https://partner.eazr.in/static/media/logo-sm-light.aa72e935.png"
            />
            <Box container style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant={'h6'} color={'white'} style={{ textAlign: 'left', marginBottom: '15px' }}>
                Let's Register Lead!
              </Typography>
            </Box>
          </Grid>
          {!error ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container rowGap={5}>
                <Grid container direction={'column'} rowGap={2}>
                  <FormControl error={!!errors['name']} variant="outlined">
                    <InputLabel>Lead Agents</InputLabel>
                    <Controller
                      render={props => (
                        <Select
                          style={{ textAlign: 'left' }}
                          label="Lead Agents"
                          defaultValue=""
                          {...register('name', { required: 'Please choose one' })}>
                          <MenuItem value={'Ankita'}>Ankita</MenuItem>
                          <MenuItem value={'Amreet'}>Amreet</MenuItem>
                          <MenuItem value={'Samreen'}>Samreen</MenuItem>
                        </Select>
                      )}
                      name="name"
                      control={control}
                    />
                    {!!errors['name'] && <FormHelperText>{errors['name']?.message}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid container direction={'column'} rowGap={2}>
                  <Button variant={'contained'} type={'submit'} size={'large'} style={{ height: '56px' }} fullWidth>
                    <Add /> ADD LEAD
                  </Button>
                  <Box container style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant={'p'} color={'white'} style={{ textAlign: 'left', fontSize: '12px' }}>
                      By signing up you agree to our privacy policy and terms of use. @2022 All Right Reserved
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </form>
          ) : (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}
        </Grid>
      )}
    </PageContainer>
  )

  return <>{data}</>
}
