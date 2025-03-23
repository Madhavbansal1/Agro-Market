import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomeScreen, LoginScreen,  ProductsDetails, AddProducts, YourProducts, ComplaintScreen,NotFound,  PricePrediction, CropPredictor, ProfileScreen } from './screens';
import PrivateRoutes from "./auth/PrivateRoutes";
import {useNavigate} from 'react-router-dom'


function App() {

 const nav =  useNavigate();
  window.nav = nav;
  const toastContainerOptions = {
    position: 'top-center',
    autoClose: 1000, 
  };
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' exact element={<HomeScreen/>} />
          <Route path='/agroproducts' exact element={<ProductsDetails/>} />
          <Route path='/products/add' exact element={<AddProducts/>} />
          <Route path='/products/myproducts' exact element={<YourProducts/>} />
          <Route path='/complaints' exact element={<ComplaintScreen/>} />
          <Route path="/predict-price" element={<PricePrediction />} />
          <Route path="/predict-crop" element={<CropPredictor />} />
          <Route path='/profile' exact element={<ProfileScreen/>} />
        </Route>

        <Route path='/login' exact element={<LoginScreen/>} />
        <Route path='/*' element={<NotFound/>}/>
      </Routes>

      <ToastContainer {...toastContainerOptions} />
    </>
  )
}

export default App