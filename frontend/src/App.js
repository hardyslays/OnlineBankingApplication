import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';

import { Header } from './Components/Header/Header';
import { HeaderLogout } from './Components/Header/HeaderLogout';
// import { Footer } from './Components/Footer/Footer';
import { Home } from './Components/Home/Home';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { Apply } from './Components/Apply/Apply';
import { Error } from './Components/Error/Error';
import { AdminLogin } from './Components/Admin/AdminLogin';
import { AdminDashboard } from './Components/Admin/AdminDashboard';
import { ApplySuccess } from './Components/Apply/ApplySuccess';
import { AdminApproval } from './Components/Admin/AdminApproval';
import { DashboardPage } from './Components/Dashboard/DashboardPage';
import Auth from './Services/Auth'
import { DisableCustomer } from './Components/Admin/DisableCustomer';
import { TransferSuccess } from './Components/Dashboard/TransferSuccess';


function App() {

  const { getToken } = Auth();

  const LoggedInRoutes = () => {
    return (
      <>
      <Routes>
        <Route path='/dashboard' element={<DashboardPage/>} />

        <Route path='/admin'>
            <Route path='login' element = {<AdminLogin/>} />
            <Route path = 'dashboard' element={ <AdminDashboard heading="Accounts and Customers"/>} />
            <Route path = 'accounts' element={ <AdminDashboard heading="Accounts" />} />
            <Route path = 'all' element={ <AdminDashboard heading="All Customers" />} />
            <Route path = 'approved' element={ <AdminDashboard heading="Approved Customers"/>} />
            <Route path = 'pending' element={ <AdminDashboard heading="Pending Customers"/>} />
            <Route path = 'customer/:id' element={<AdminApproval />} />
            <Route path = 'account/:id' element={<DisableCustomer />} />
        </Route>
        <Route path='/transaction/:id' element={<TransferSuccess/>}/>
        <Route element={<Error/>} />
      </Routes>
      </>
    )
  }


  return (
    <div className="App">
      <>
      {LoggedInRoutes()}
      <Routes>
        <Route exact path='/' element={<Navigate to={'/home'} />}/>

        <Route exact path='/home'element={<Home/>} />
        
        <Route path='/register' element={<Register/>} />
        
        <Route path='/login' element={<Login/>} />

        <Route path='/apply' element={<Apply/>} />
        
        <Route path='/apply-success' element={<ApplySuccess/>}/>
      </Routes>
      </>
    

    
    


    </div>
  );
}

export default App;
