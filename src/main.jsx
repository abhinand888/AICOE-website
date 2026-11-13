import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Variability_prediction from './variability_prediction.jsx'
import Early_prediction from './early_prediction.jsx'
import NextCropCycle from './ncc.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CYP_with_crop from './cyp.jsx'
import Home from './Home.jsx'
import AppPage from './AppPage.jsx'
import './index.css' // site theme: keep this last so it applies on top

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crop_yield_prediction" element={<App title='App'></App>} />
      <Route path="/variability_prediction" element={<Variability_prediction title='About'></Variability_prediction>} />
      <Route path="/early_prediction" element={<Early_prediction title='About'></Early_prediction>} />
      <Route path="/next_crop_cycle" element={<NextCropCycle title='About'></NextCropCycle>} />
      <Route path="/cyp_with_crop" element={<CYP_with_crop title='About'></CYP_with_crop>} />
        <Route path="/multi_horizon_prediction" element={<AppPage title='Multi Horizon Prediction' tag='Multi-year'
          intro='Predicting crop yields for multiple future years, so planning can look beyond a single season.' />} />
        <Route path="/farm_level_prediction" element={<AppPage title='Farm Level Prediction' tag='Field scale'
          intro='Bringing crop analytics closer to individual farms and field-level needs.' />} />
        <Route path="/semantic_crop_segmentation" element={<AppPage title='Semantic Crop Segmentation' tag='Computer Vision'
          intro='Using computer vision to outline crop regions in satellite imagery, pixel by pixel.' />} />
        <Route path="/crop_classification" element={<AppPage title='Crop Classification' tag='Computer Vision'
          intro='Identifying which crop is grown in each field from satellite observations.' />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
