import React from 'react'
import { useState } from 'react'
import './App.css'
import SiteNav from './SiteNav'
import PageHeader from './PageHeader'
import SiteFooter from './SiteFooter'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { DataGrid } from '@mui/x-data-grid';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, NavItem } from 'react-bootstrap';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import bits from './assets/University_Logo_AllCampuses.png'
import hero from './assets/ai_image.png'
import MultiSelect from 'react-bootstrap-multiselect';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import dist from "./assets/csvjson.json"
import distperf from './assets/csvjson (2).json'
import Papa from 'papaparse';
import Spinner from './spinner';
import PerfGraph from './assets/Pred-Graph.jpg'
import PerfTable from './assets/Pred-Table.jpg'
import cornData from './assets/cornData (2).json'
import riceEarly from './assets/rice_pred_json.json'
const riceDistricts = [...riceEarly].sort((a, b) => a.District_Name.localeCompare(b.District_Name))
import cornPred from './assets/Corn-Pred.jpg'
import TagLine from './assets/InnovateAchieveLead.jpg'
import ep_wheat from './assets/ep_wheat.png'
import ep_rice from './assets/ep_rice.png'
import ep_corn from './assets/ep_corn.png'
import ep_soy from './assets/ep_soy.png'
import soyEarly from './assets/soy_early_predictions.json'
const soyDistricts = [...soyEarly].sort((a, b) => a.District_Name.localeCompare(b.District_Name))
import cornEarly from './assets/corn_early_predictions.json'
const cornDistricts = [...cornEarly].sort((a, b) => a.District_Name.localeCompare(b.District_Name))
import wheatDataPred from './assets/wheat_pred_json.json'






function Early_prediction() {




  const [distName, setdistName] = React.useState([]);
  const [weekName, setweekName] = React.useState([]);
  const [cropName, setcropName] = React.useState();
  const [data, setData] = useState("");
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState(); // for week
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState()
  const [perf, setperf] = useState(false);
  const [yeild, setyeild] = useState(false);
  const [comp, setcomp] = useState("");
  const [adv, setadv] = useState(false);
  const [cornData1, setcornData1] = useState([]);




  const handleChange = (event, key) => {
    const itemKey = key.key.slice(2); //Removes the .$ from the key.
    console.log(typeof (itemKey))

    const {
      target: { value },
    } = event;
    setData2(value);
    setdistName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeWeek = (event) => {
    // const itemKey = key.key.slice(2); //Removes the .$ from the key.
    // console.log(typeof (itemKey))

    const {
      target: { value },
    } = event;
    setData3(value);
    console.log(data3);
    
  };


  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setcropName(
      typeof value === 'string' ? value.split(',') : value,
    );


  };

  const params = {
    "numbers": data2,
  }


  const call = () => {
    const wheat1 = wheatDataPred.filter((wheatDataPred) => {
      for (let index = 0; index < data2.length; index++) {
        if (data2[index] == wheatDataPred.District_ID) {
          return wheatDataPred;
        }

      }
    })
    console.log(wheat1);
    setData1(wheat1);
  }
  const callSoy = () => {
    setData1(soyEarly.filter((r) => data2.includes(r.District_ID)));
  }
  const callCorn = () => {
    setData1(cornEarly.filter((r) => data2.includes(r.District_ID)));
  }
  const call2 = () => {
    const corn = riceEarly.filter((r) => {
      for (let index = 0; index < data2.length; index++) {
        if (data2[index] == r.District_ID) {
          return r;
        }

      }
    })
    console.log(corn)
    setData1(corn);


  }



  const columns2 = [
    { field: 'District_Name', headerName: 'District', flex: 1 },
    { field: 'Actual', headerName: 'Actual', flex: 1 },
    { field: '8_week', headerName: 'Week 8', flex: 1 },
    { field: '7_week', headerName: 'Week 7', flex: 1 },
    { field: '6_week', headerName: 'Week 6', flex: 1 },
    { field: '5_week', headerName: 'Week 5', flex: 1 },
    { field: '4_week', headerName: 'Week 4', flex: 1 },
    { field: '3_week', headerName: 'Week 3', flex: 1 },
    { field: '2_week', headerName: 'Week 2', flex: 1 },
    { field: '1_week', headerName: 'Week 1', flex: 1 },
    { field: '0_week', headerName: 'Week 0', flex: 1 },

  ]
  const columnselect = [
    { field: '8_week', headerName: 'Week 8', flex: 1 },
    { field: '7_week', headerName: 'Week 7', flex: 1 },
    { field: '6_week', headerName: 'Week 6', flex: 1 },
    { field: '5_week', headerName: 'Week 5', flex: 1 },
    { field: '4_week', headerName: 'Week 4', flex: 1 },
    { field: '3_week', headerName: 'Week 3', flex: 1 },
    { field: '2_week', headerName: 'Week 2', flex: 1 },
    { field: '1_week', headerName: 'Week 1', flex: 1 },
    { field: '0_week', headerName: 'Week 0', flex: 1 },

  ]

  function generateRandom() {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  return (
    <>




      <SiteNav />

      <PageHeader title='Early Prediction' subtitle='Yield forecasts up to 8 weeks before harvest.' />
      <div className='dropdown-container'>
        <FormControl sx={{ m: 1, width: 350 }}>
          <InputLabel>Crop Name</InputLabel>
          <Select
            value={cropName ?? ""}
            onChange={(event) => {
              handleChange2(event)
              setData1([]);
            setData2([]);
            seterror();
            setData2([]);
            setdistName([]);
            setperf(false);
            setyeild(false);
            setadv(false);
            setcomp("");
              setData(event.target.value)
              
            }}
            input={<OutlinedInput label="Crop Name" />}
            defaultValue={""}



          >
            <MenuItem value="Wheat"
            >Wheat</MenuItem>
            <MenuItem value="Rice">Rice</MenuItem>
            <MenuItem value="Corn">Corn</MenuItem>
            <MenuItem value="Soya">Soya</MenuItem>
            {/* <MenuItem disabled value="Rice">Rice</MenuItem>
          <MenuItem disabled value="Soya">Soya</MenuItem> */}
          </Select>
        </FormControl>


        {data === "Wheat" ? <>
          <div className='wheat-data' style={{ display: 'flex', marginTop: '2rem', justifyContent: 'space-evenly', alignItems: 'center', width: '70vw' }}>
            <div className='metadata' style={{ textAlign: 'left' }}>
              <h1>Data & Model</h1>
              <Table className='table' striped bordered hover>
                <thead>

                </thead>
                <tbody>
                  <tr><td>Satellite Used: </td><td>Landsat-8 </td></tr>
                  <tr><td>Data Modality: </td><td>Image time series</td></tr>
                  <tr><td>Model: </td><td>SaTran(Foundation Model)</td></tr>
                  <tr><td>Training data: </td><td>2014-2019</td></tr>
                  <tr><td>Prediction for :</td><td>2020 </td></tr>
                  <tr><td>No. of districts: </td><td>356 </td></tr>
                  <tr><td>Unit:  </td><td>Bu/ac </td></tr>
                  <tr><td>RMSE (best case) : </td><td>10.763</td></tr>
                  <tr><td>RMSE (Average±Stddev) : </td><td>11.837 ± 1.16</td></tr>
                  <tr><td>MAE (best case): </td><td>9.393</td></tr>
                  <tr><td>MAE (Average±Stddev) : </td><td>10.497 ± 1.69</td></tr>

                </tbody></Table>
            </div>

            <iframe className='Map' title="Wheat Producing Districts" aria-label="Map" id="datawrapper-chart-yFKAB" src="https://datawrapper.dwcdn.net/yFKAB/1/"></iframe>
            {!function () { window.addEventListener("message", (function (a) { if (void 0 !== a.data["datawrapper-height"]) { var e = document.querySelectorAll("iframe"); for (var t in a.data["datawrapper-height"]) for (var r = 0; r < e.length; r++)if (e[r].contentWindow === a.source) { var i = a.data["datawrapper-height"][t] + "px"; e[r].style.height = i } } })) }()}
          </div>
        </>
          : <></>}


        {data === "Rice" ? <>
          <div className='wheat-data' style={{ display: 'flex', marginTop: '2rem', justifyContent: 'space-evenly', alignItems: 'center', width: '70vw' }}>
            <div className='metadata' style={{ textAlign: 'left' }}>
              <h1>Data & Model</h1>
              <Table className='table' striped bordered hover>
                <thead>

                </thead>
                <tbody>
                  <tr><td>Satellite Used: </td><td>Landsat-8 </td></tr>
                  <tr><td>Data Modality: </td><td>Image time series</td></tr>
                  <tr><td>Model: </td><td>SaTran(Foundation Model)</td></tr>
                  <tr><td>Training data: </td><td>2014-2019</td></tr>
                  <tr><td>Prediction for :</td><td>2020 </td></tr>
                  <tr><td>No. of districts: </td><td>296 </td></tr>
                  <tr><td>Unit:  </td><td>Bu/ac </td></tr>
                  <tr><td>RMSE (best case) : </td><td>7.132</td></tr>
                  <tr><td>RMSE (Average±Stddev) : </td><td>8.985 ± 1.29</td></tr>
                  <tr><td>MAE (best case): </td><td>6.113</td></tr>
                  <tr><td>MAE (Average±Stddev) : </td><td>6.984 ± 0.73</td></tr>

                </tbody></Table>
            </div>

            <iframe className='Map' title="Rice Producing Districts" aria-label="Map" id="datawrapper-chart-zkBDx" src="https://datawrapper.dwcdn.net/zkBDx/1/" scrolling="no" frameborder="0" ></iframe><script type="text/javascript">{!function () { "use strict"; window.addEventListener("message", (function (a) { if (void 0 !== a.data["datawrapper-height"]) { var e = document.querySelectorAll("iframe"); for (var t in a.data["datawrapper-height"]) for (var r = 0; r < e.length; r++)if (e[r].contentWindow === a.source) { var i = a.data["datawrapper-height"][t] + "px"; e[r].style.height = i } } })) }()}
            </script>
          </div>
        </>
          : <></>}

        {data === "Corn" ? <>
          <div className='wheat-data' style={{ display: 'flex', marginTop: '2rem', justifyContent: 'space-evenly', alignItems: 'center', width: '70vw' }}>
            <div className='metadata' style={{ textAlign: 'left' }}>
              <h1>Data & Model</h1>
              <Table className='table' striped bordered hover>
                <thead>

                </thead>
                <tbody>
                  <tr><td>Satellite Used: </td><td>Sentinel-2</td></tr>
                  <tr><td>Data Modality: </td><td>Histogram time series + soil + weather</td></tr>
                  <tr><td>Model: </td><td>EYNet (cross-attention, contrastive learning)</td></tr>
                  <tr><td>Training data: </td><td>2016-2022</td></tr>
                  <tr><td>Prediction for :</td><td>2023</td></tr>
                  <tr><td>No. of districts: </td><td>362</td></tr>
                  <tr><td>Unit:  </td><td>Bu/ac </td></tr>
                  <tr><td>RMSE : </td><td>12.045</td></tr>
                  <tr><td>RMSE (Average±Stddev) : </td><td>12.145 ± 1.29</td></tr>
                  <tr><td>MAE : </td><td>8.784</td></tr>
                  <tr><td>MAE (Average±Stddev) : </td><td>8.124 ± 0.73</td></tr>
                </tbody></Table>
            </div>

            <iframe className='Map' title="Corn Producing Districts" aria-label="Map" id="datawrapper-chart-0qze0" src="https://datawrapper.dwcdn.net/0qze0/1/" scrolling="no" frameBorder="0"></iframe>
          </div>
        </>
          : <></>}

        {data === "Soya" ? <>
          <div className='wheat-data' style={{ display: 'flex', marginTop: '2rem', justifyContent: 'space-evenly', alignItems: 'center', width: '70vw' }}>
            <div className='metadata' style={{ textAlign: 'left' }}>
              <h1>Data & Model</h1>
              <Table className='table' striped bordered hover>
                <thead>

                </thead>
                <tbody>
                  <tr><td>Satellite Used: </td><td>Sentinel-2</td></tr>
                  <tr><td>Data Modality: </td><td>Histogram time series + soil + weather</td></tr>
                  <tr><td>Model: </td><td>EYNet (cross-attention, contrastive learning)</td></tr>
                  <tr><td>Training data: </td><td>2016-2022</td></tr>
                  <tr><td>Prediction for :</td><td>2023</td></tr>
                  <tr><td>No. of districts: </td><td>152</td></tr>
                  <tr><td>Unit:  </td><td>Bu/ac</td></tr>
                  <tr><td>RMSE : </td><td>5.780</td></tr>
                  <tr><td>RMSE (Average±Stddev) : </td><td>5.985 ± 1.29</td></tr>
                  <tr><td>MAE : </td><td>4.141</td></tr>
                  <tr><td>MAE (Average±Stddev) : </td><td>4.971 ± 0.73</td></tr>
                </tbody></Table>
            </div>

            <iframe className='Map' title="Soy Producing Districts" aria-label="Map" id="datawrapper-chart-SylUS" src="https://datawrapper.dwcdn.net/SylUS/1/" scrolling="no" frameBorder="0"></iframe>
          </div>
        </>
          : <></>}





        



        {data === "Wheat" ? <><div className='dropdown-2'>
          <FormControl sx={{ m: 1, width: 350 }}>
            <InputLabel id="demo-multiple-checkbox-label">District</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={distName}
              onChange={handleChange}
              input={<OutlinedInput label="District Name" />}
              renderValue={(selected) => `${selected.length} district${selected.length === 1 ? '' : 's'} selected`}
              MenuProps={{
                MenuListProps: {
                  sx: {
                    "li.MuiButtonBase-root": {
                      display: "flex",
                      flexDirection: "row",
                    },
                  },
                },
                PaperProps: { sx: { maxHeight: 200 } },
              }}
            > { }


              {dist.map((dist) => (
                <MenuItem key={dist.DistrictID} value={dist.DistrictID}>
                  <Checkbox checked={distName.indexOf(dist.DistrictID) > -1} />
                  <ListItemText primary={dist.DistrictName} />
                </MenuItem>
              ))}

            </Select>

          </FormControl>
          <FormControl sx={{ m: 1, width: 180 }}>
            <InputLabel id="demo-multiple-checkbox-label">Select week</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              value={data3}
              onChange={handleChangeWeek}
              input={<OutlinedInput label="week Name" />}
              
              MenuProps={{
                MenuListProps: {
                  sx: {
                    "li.MuiButtonBase-root": {
                      display: "flex",
                      flexDirection: "row",
                    },
                  },
                },
                PaperProps: { sx: { maxHeight: 200 } },
              }}
            > { }
              {columnselect.map((columnselect) => (
            <MenuItem key={columnselect.field} value={columnselect.field}>
              
              
              <ListItemText primary={columnselect.field} />
            </MenuItem>
            
              ))}
            </Select>

          </FormControl>
          <Button className='search' onClick={() => { call(); seterror(null); }}> Predict Yield</Button>
          <Button className='search' onClick={() => { if (perf) { setperf(false) } else { setperf(true) } }}> Model Performance</Button>
        </div></> : data === "Rice" ? <><div className='dropdown-2'>
          <FormControl sx={{ m: 1, width: 350 }}>
            <InputLabel id="demo-multiple-checkbox-label">District</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={distName}
              onChange={handleChange}
              input={<OutlinedInput label="District Name" />}
              renderValue={(selected) => `${selected.length} district${selected.length === 1 ? '' : 's'} selected`}
              MenuProps={{
                MenuListProps: {
                  sx: {
                    "li.MuiButtonBase-root": {
                      display: "flex",
                      flexDirection: "row",
                    },
                  },
                },
                PaperProps: { sx: { maxHeight: 200 } },
              }}
            > {riceDistricts.map((r) => (
              <MenuItem key={r.District_ID} value={r.District_ID}>
                <Checkbox checked={distName.indexOf(r.District_ID) > -1} />
                <ListItemText primary={r.District_Name} />
              </MenuItem>
            ))}

            </Select>

          </FormControl>

          <FormControl sx={{ m: 1, width: 180 }}>
            <InputLabel id="demo-multiple-checkbox-label">Select week</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              value={data3}
              onChange={handleChangeWeek}
              input={<OutlinedInput label="week Name" />}
              
              MenuProps={{
                MenuListProps: {
                  sx: {
                    "li.MuiButtonBase-root": {
                      display: "flex",
                      flexDirection: "row",
                    },
                  },
                },
                PaperProps: { sx: { maxHeight: 200 } },
              }}
            > { }
              {columnselect.map((columnselect) => (
            <MenuItem key={columnselect.field} value={columnselect.field}>
              
              
              <ListItemText primary={columnselect.field} />
            </MenuItem>
            
              ))}
            </Select>

          </FormControl>

          <Button className='search' onClick={() => { call2(); setIsLoading(false); seterror(null) }}> Predict Yield</Button>
        </div>
          <Button className='search' onClick={() => { if (perf) { setperf(false) } else { setperf(true) } }}> Model Performance</Button>
        </>
        : data === "Corn" ? <><div className='dropdown-2'>
          <FormControl sx={{ m: 1, width: 350 }}>
            <InputLabel id="demo-multiple-checkbox-label">District</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={distName}
              onChange={handleChange}
              input={<OutlinedInput label="District Name" />}
              renderValue={(selected) => `${selected.length} district${selected.length === 1 ? '' : 's'} selected`}
              MenuProps={{
                MenuListProps: {
                  sx: {
                    "li.MuiButtonBase-root": {
                      display: "flex",
                      flexDirection: "row",
                    },
                  },
                },
                PaperProps: { sx: { maxHeight: 200 } },
              }}
            > {cornDistricts.map((r) => (
              <MenuItem key={r.District_ID} value={r.District_ID}>
                <Checkbox checked={distName.indexOf(r.District_ID) > -1} />
                <ListItemText primary={r.District_Name} />
              </MenuItem>
            ))}

            </Select>

          </FormControl>

          <FormControl sx={{ m: 1, width: 180 }}>
            <InputLabel id="demo-multiple-checkbox-label">Select week</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              value={data3}
              onChange={handleChangeWeek}
              input={<OutlinedInput label="week Name" />}
              
              MenuProps={{
                MenuListProps: {
                  sx: {
                    "li.MuiButtonBase-root": {
                      display: "flex",
                      flexDirection: "row",
                    },
                  },
                },
                PaperProps: { sx: { maxHeight: 200 } },
              }}
            > { }
              {columnselect.map((columnselect) => (
            <MenuItem key={columnselect.field} value={columnselect.field}>
              
              
              <ListItemText primary={columnselect.field} />
            </MenuItem>
            
              ))}
            </Select>

          </FormControl>

          <Button className='search' onClick={() => { callCorn(); setIsLoading(false); seterror(null) }}> Predict Yield</Button>
        </div>
          <Button className='search' onClick={() => { if (perf) { setperf(false) } else { setperf(true) } }}> Model Performance</Button>
        </>
        : data === "Soya" ? <><div className='dropdown-2'>
          <FormControl sx={{ m: 1, width: 350 }}>
            <InputLabel id="demo-multiple-checkbox-label">District</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={distName}
              onChange={handleChange}
              input={<OutlinedInput label="District Name" />}
              renderValue={(selected) => `${selected.length} district${selected.length === 1 ? '' : 's'} selected`}
              MenuProps={{
                MenuListProps: {
                  sx: {
                    "li.MuiButtonBase-root": {
                      display: "flex",
                      flexDirection: "row",
                    },
                  },
                },
                PaperProps: { sx: { maxHeight: 200 } },
              }}
            > {soyDistricts.map((r) => (
              <MenuItem key={r.District_ID} value={r.District_ID}>
                <Checkbox checked={distName.indexOf(r.District_ID) > -1} />
                <ListItemText primary={r.District_Name} />
              </MenuItem>
            ))}

            </Select>

          </FormControl>

          <FormControl sx={{ m: 1, width: 180 }}>
            <InputLabel id="demo-multiple-checkbox-label">Select week</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              value={data3}
              onChange={handleChangeWeek}
              input={<OutlinedInput label="week Name" />}
              
              MenuProps={{
                MenuListProps: {
                  sx: {
                    "li.MuiButtonBase-root": {
                      display: "flex",
                      flexDirection: "row",
                    },
                  },
                },
                PaperProps: { sx: { maxHeight: 200 } },
              }}
            > { }
              {columnselect.map((columnselect) => (
            <MenuItem key={columnselect.field} value={columnselect.field}>
              
              
              <ListItemText primary={columnselect.field} />
            </MenuItem>
            
              ))}
            </Select>

          </FormControl>

          <Button className='search' onClick={() => { callSoy(); setIsLoading(false); seterror(null) }}> Predict Yield</Button>
        </div>
          <Button className='search' onClick={() => { if (perf) { setperf(false) } else { setperf(true) } }}> Model Performance</Button>
        </>
          : <></>}


      </div>



      <div className="sec-2">
        {!isLoading ?
          error === null ?
            //   <Table className='table' striped bordered hover>
            //   <thead>
            //     <tr>
            //       <th>District ID</th>
            //       <th>District Name</th>
            //       <th>Actual</th>
            //       <th>Predicted</th>
            //     </tr>
            //   </thead>
            //   <tbody>
            //     {data1.map((data1)=>{return(<><tr><td>{data1.DistrictID}</td><td>{data1.DistrictName}</td><td>{data1.Actual}</td><td>{data1.Predicted}</td></tr></>);})}
            //   </tbody>
            // </Table>
            <>{data === "Rice" || data === "Corn" || data === "Soya" ? <><DataGrid className='table1' disableColumnMenu disableColumnSorting disableColumnResize columns={columns2.filter(element=> (element.field == 'District_Name' || element.field  == 'Actual' || element.field == data3))} rows={data1} getRowId={(row) => generateRandom()} ></DataGrid></> : <></>}
              {data === "Wheat" ? <><DataGrid className='table1' disableColumnMenu disableColumnSorting disableColumnResize columns={columns2.filter(element=> (element.field == 'District_Name' || element.field  == 'Actual' || element.field == data3))} rows={data1} getRowId={(row) => generateRandom()} ></DataGrid></> : <></>}</>
            :
            <h1 style={{ color: 'red' }}> {error} </h1>
          :
          <span> <Spinner /> </span>}



      </div>
      <div className="sec-3">
        {data === "Wheat" ? perf ? <><h1> Model Performance</h1>
          <div className='Model-perf' style={
            { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', marginTop: 20 }
          }> <img src={ep_wheat} alt="" style={{ width: '50vw' }} />
          </div></> : <></> : <></>}

        {data === "Soya" ? perf ? <><h1> Model Performance</h1>
          <div className='Model-perf' style={
            { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', marginTop: 20 }
          }> <img src={ep_soy} alt="Early prediction for soy: MAE by weeks before harvest" style={{ width: '50vw' }} />
          </div></> : <></> : <></>}

        {data === "Corn" ? perf ? <><h1> Model Performance</h1>
          <div className='Model-perf' style={
            { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', marginTop: 20 }
          }> <img src={ep_corn} alt="Early prediction for corn: MAE by weeks before harvest" style={{ width: '50vw' }} />
          </div></> : <></> : <></>}

        {data === "Rice" ? perf ? <><h1> Model Performance</h1>
          <div className='Model-perf' style={
            { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', marginTop: 20 }
          }> <img src={ep_rice} alt="" style={{ width: '50vw' }} />
          </div></> : <></> : <></>}


      </div>
      {/* <Button className='search' onClick={()=>{setyeild(true)}}> Click here to Get Avg Yield For Last 3 years</Button>
    
    {yeild?<><h5>Note: Click each Table row in the below Table to get Advisory</h5><Table className='table' striped bordered hover>
      <thead>
        <tr>
          <th>District Name</th>
          <th>Avg Yeild for Last 3 Years</th>
        </tr>
      </thead>
      <tbody>
        {data==="Wheat"?<>{distperf.map((distperf)=>{ for (let index = 0; index < data2.length; index++) {
          if(data2[index]==distperf.dist_id){
            return(<>
            <tr onClick={()=>{setadv(true);data1.map((data1)=>{
              if(data1.DistrictID==data2[index]){
               if(data1.Predicted>distperf.YieldBuAc){
                 setcomp("high") 
              }
              else{
                setcomp("low")
              }}
            })
            
            }}><td>{distperf.dist}</td><td>{distperf.YieldBuAc}</td></tr>
            </>);
          }
          
          
        } 
      }
        )}</>:data==="Corn"?<>{cornData.map((cornData)=>{ for (let index = 0; index < data2.length; index++) {
          if(data2[index]==cornData.Dist_ID){
            return(<>
            <tr onClick={()=>{setadv(true);data1.map((data1)=>{
              if(data1.Dist_ID==data2[index]){
               if(data1.Predicted>cornData.Average_yield){
                 setcomp("high") 
              }
              else{
                setcomp("low")
              }}
            })}}><td>{cornData.District_Name}</td><td>{cornData.Average_yield}</td></tr>
            </>);
          }
          
          
        } 
      }
        )}</>:<></>}
        
      </tbody>
    </Table></>:<></>}
    {adv?<>{comp==="high"?<div className='middle advisory' style={{padding:10, fontSize:20, textAlign:'left'
    }}><h1>ADVISORY</h1><h3>Higher Yield prediction</h3>
<b>Expected Conditions:</b> <br /> Our model indicates a higher-than-average yield for your crops this
season. This could be due to favorable weather conditions, improved farming practices, or
better seed quality. <br />
<b style={{textAlign:'left'}}>Advisory:</b><br />
<div style={{marginLeft: 50, marginRight: 50}}>
● Plan for Storage: With higher yields, it's essential to plan for adequate storage to
prevent post-harvest losses. Ensure your storage facilities are clean, dry, and pest-free. <br />
● Market Strategy: Consider the possibility of price fluctuations due to increased supply. <br />
● Value Addition: Explore opportunities for value addition, such as processing or
packaging, to increase your returns from the higher yield. <br />
</div></div>:<></>}</>:<></> }
  
{adv?<>{comp==="low"?<div className='middle advisory' style={{padding:10, fontSize:20, textAlign:'left'
    }}><h1>ADVISORY</h1><h3>Lower Yield Prediction</h3>
<b>Expected Conditions:</b> <br /> Our model has predicted a lower-than-average yield this season,
possibly due to adverse weather conditions, pest infestations, or other factors. <br />
<b style={{textAlign:'left'}}>Advisory:</b><br />
<div style={{marginLeft: 50, marginRight: 50}}>
● Cost Management: Review and manage your input costs carefully. Prioritize essential
expenditures and avoid unnecessary costs. <br />
● Crop Insurance: Ensure your crops are insured against potential risks. If you haven't
already, consider enrolling in the government's crop insurance schemes to protect your
investment. <br />
● Efficient Use of Resources: Focus on optimizing the use of water, fertilizers, and
pesticides to reduce waste and improve efficiency.
</div></div>:<></>}</>:<></> } */}
      <SiteFooter />
    </>
  )
}

export default Early_prediction
