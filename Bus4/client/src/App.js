import { useState } from 'react';
import Login from './components/Login';
//import Signup from './Signup';
import { locations } from './utils';
import Header from './components/Header';
import BusSearch from './components/BusSearch';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Registro from './components/Registro';
import RegisBus from './components/RegisBus';
import { UserProvider } from "./context/UserContext";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import BusLayout from './components/BusLayout';
import ReservationCreate from './components/ReservationCreate';
import MisReservas from './components/MisReservas';


function App() {
  const [searchState, setSearchState] = useState({
    from: locations[0],
    to: locations[2],
    date: '',
  });

  return (
    <div>
      <UserProvider>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<PublicRoute><Login /></PublicRoute>}></Route>
          <Route path='/Registro' element={<PublicRoute><Registro/></PublicRoute>}></Route>
          <Route path='/BusSearch' element={<PrivateRoute><BusSearch searchState={searchState} setSearchState={setSearchState} /></PrivateRoute>}></Route>
          <Route path='/RegisBus' element={<AdminRoute><RegisBus/></AdminRoute>}></Route>
          <Route path='/bus/:id'  element={<PrivateRoute><BusLayout/></PrivateRoute>}></Route>
          <Route path='/reservas/crear/:busId' element={<PrivateRoute><ReservationCreate/></PrivateRoute>}></Route>
          <Route path='/mis-reservas' element={<PrivateRoute><MisReservas/></PrivateRoute>}></Route>
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
