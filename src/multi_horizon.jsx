import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SiteNav from './SiteNav'
import PageHeader from './PageHeader'
import SiteFooter from './SiteFooter'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import { DataGrid } from '@mui/x-data-grid'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import wheatMH from './assets/multi_horizon_wheat.json'
import mh_wheat from './assets/mh_wheat.png'

const wheatDistricts = [...wheatMH].sort((a, b) => a.District_Name.localeCompare(b.District_Name))

const HORIZONS = [
  { value: '2020', label: 'N (2020)' },
  { value: '2021', label: 'N+1 (2021)' },
  { value: '2022', label: 'N+2 (2022)' },
  { value: '2023', label: 'N+3 (2023)' },
]

const menuProps = {
  MenuListProps: { sx: { 'li.MuiButtonBase-root': { display: 'flex', flexDirection: 'row' } } },
  PaperProps: { sx: { maxHeight: 200 } },
}

function MultiHorizonPrediction() {
  const [crop, setCrop] = useState('')
  const [districts, setDistricts] = useState([])
  const [horizon, setHorizon] = useState('')
  const [rows, setRows] = useState([])
  const [error, setError] = useState(null)
  const [perf, setPerf] = useState(false)

  const predict = () => {
    if (districts.length === 0) { setError('Please select at least one district.'); setRows([]); return }
    if (!horizon) { setError('Please select a prediction horizon.'); setRows([]); return }
    setError(null)
    setRows(wheatDistricts
      .filter((r) => districts.includes(r.District_ID))
      .map((r) => ({
        id: r.District_ID,
        District_Name: r.District_Name,
        Actual: r[`${horizon}_actual`],
        Predicted: r[`${horizon}_pred`],
      })))
  }

  const columns = [
    { field: 'District_Name', headerName: 'District Name', width: 220 },
    { field: 'Actual', headerName: 'Actual (Bu/ac)', width: 160 },
    { field: 'Predicted', headerName: 'Predicted (Bu/ac)', width: 170 },
  ]

  return (
    <>
      <SiteNav />
      <PageHeader title='Multi Horizon Prediction' subtitle='Yield forecasts for the current season and up to three crop cycles ahead.' />

      <div className='dropdown-container'>
        <FormControl sx={{ m: 1, width: 350 }}>
          <InputLabel>Crop Name</InputLabel>
          <Select
            value={crop}
            onChange={(e) => { setCrop(e.target.value); setRows([]); setDistricts([]); setHorizon(''); setError(null); setPerf(false) }}
            input={<OutlinedInput label='Crop Name' />}
          >
            <MenuItem value='Wheat'>Wheat</MenuItem>
          </Select>
        </FormControl>

        {crop === 'Wheat' ? <>
          <div className='wheat-data' style={{ display: 'flex', marginTop: '2rem', justifyContent: 'space-evenly', alignItems: 'center', width: '70vw' }}>
            <div className='metadata' style={{ textAlign: 'left' }}>
              <h1>Data & Model</h1>
              <Table className='table' striped bordered hover>
                <tbody>
                  <tr><td>Satellite Used: </td><td>Landsat-8</td></tr>
                  <tr><td>Data Modality: </td><td>Histogram time series + soil + weather</td></tr>
                  <tr><td>Model: </td><td>EYNet (cross-attention, contrastive learning)</td></tr>
                  <tr><td>Training data: </td><td>2014-2019</td></tr>
                  <tr><td>Prediction for :</td><td>2020 (N), 2021 (N+1), 2022 (N+2), 2023 (N+3)</td></tr>
                  <tr><td>No. of districts: </td><td>31</td></tr>
                  <tr><td>Unit: </td><td>Bu/ac</td></tr>
                  <tr><td colSpan={2}><b>RMSE</b></td></tr>
                  <tr><td>N (2020) : </td><td>8.3215</td></tr>
                  <tr><td>N+1 (2021) : </td><td>9.4155</td></tr>
                  <tr><td>N+2 (2022) : </td><td>9.7413</td></tr>
                  <tr><td>N+3 (2023) : </td><td>9.9430</td></tr>
                </tbody>
              </Table>
            </div>
            <iframe className='Map' title='Wheat Producing Districts' aria-label='Map' id='datawrapper-chart-yFKAB' src='https://datawrapper.dwcdn.net/yFKAB/1/' scrolling='no' frameBorder='0'></iframe>
          </div>

          <div className='dropdown-2'>
            <FormControl sx={{ m: 1, width: 350 }}>
              <InputLabel>District</InputLabel>
              <Select
                multiple
                value={districts}
                onChange={(e) => setDistricts(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                input={<OutlinedInput label='District' />}
                renderValue={(s) => `${s.length} district${s.length === 1 ? '' : 's'} selected`}
                MenuProps={menuProps}
              >
                {wheatDistricts.map((r) => (
                  <MenuItem key={r.District_ID} value={r.District_ID}>
                    <Checkbox checked={districts.indexOf(r.District_ID) > -1} />
                    <ListItemText primary={r.District_Name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: 200 }}>
              <InputLabel>Horizon</InputLabel>
              <Select value={horizon} onChange={(e) => setHorizon(e.target.value)} input={<OutlinedInput label='Horizon' />} MenuProps={menuProps}>
                {HORIZONS.map((h) => <MenuItem key={h.value} value={h.value}>{h.label}</MenuItem>)}
              </Select>
            </FormControl>

            <Button className='search' onClick={predict}> Predict Yield</Button>
            <Button className='search' onClick={() => setPerf(!perf)}> Model Performance</Button>
          </div>
        </> : <></>}
      </div>

      <div className='sec-2'>
        {error ? <h1 style={{ color: 'red' }}>{error}</h1> : <></>}
        {crop === 'Wheat' && rows.length > 0 ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <p className='demo-note' style={{ textAlign: 'center' }}><span className='demo-tag'>Demo values</span> District values shown for demonstration.</p>
          <DataGrid className='table1' disableColumnMenu disableColumnResize columns={columns} rows={rows} hideFooter={rows.length <= 100} />
        </div> : <></>}
      </div>

      <div className='sec-3'>
        {crop === 'Wheat' && perf ? <>
          <h1> Model Performance</h1>
          <div className='Model-perf' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', marginTop: 20 }}>
            <img src={mh_wheat} alt='Multi horizon prediction for wheat: RMSE by horizon' style={{ width: '50vw' }} />
          </div>
        </> : <></>}
      </div>

      <SiteFooter />
    </>
  )
}

export default MultiHorizonPrediction
