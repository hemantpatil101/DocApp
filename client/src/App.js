import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import HomePage from './Pages/HomePage';
import { useSelector } from 'react-redux';
import Spinner from './Components/Spinner';
import ProtectedRoutes from './Components/ProtectedRoutes';
import PublicRoute from './Components/PublicRoute';
import ApplyDoctor from './Pages/ApplyDoctor';
import Notification from './Pages/Notification';
import Doctors from './Pages/Admin/Doctors';
import Users from './Pages/Admin/Users';
import Profile from './Pages/Doctor/Profile';
import BookingPage from './Pages/BookingPage';
import Appointments from './Pages/Appointments';
import DoctorAppointments from './Pages/Doctor/DoctorAppointments';
function App() {
    const {loading} = useSelector(state => state.alerts);

  return (
    <>
      <BrowserRouter>
          {loading ? <Spinner/> :
           (<Routes>
           <Route path='/' element={
            <ProtectedRoutes>
               <HomePage/>
            </ProtectedRoutes>
           }/>
           <Route path='/apply-doctor' element={
            <ProtectedRoutes>
               <ApplyDoctor/>
            </ProtectedRoutes>
           }/>
           <Route path='/login' element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
           }/>
           <Route path='/notification' element={
            <ProtectedRoutes>
              <Notification/>
            </ProtectedRoutes>
           }/>
           <Route path='/admin/doctors' element={
            <ProtectedRoutes>
               <Doctors/>
            </ProtectedRoutes>
           }/>

          <Route path='/appointments' element={
            <ProtectedRoutes>
               <Appointments/>
            </ProtectedRoutes>
           }/>

           <Route path='/doctor-appointments' element={
            <ProtectedRoutes>
               <DoctorAppointments/>
            </ProtectedRoutes>
           }/>

           <Route path='/doctor/book-appointment/:doctorId' element={
            <ProtectedRoutes>
               <BookingPage/>
            </ProtectedRoutes>
           }/>

            <Route path='/admin/users' element={
            <ProtectedRoutes>
              <Users/>
            </ProtectedRoutes>
           }/>

            <Route path='/doctor/profile/:id' element={
            <ProtectedRoutes>
              <Profile/>
            </ProtectedRoutes>
           }/>

           <Route path='/register' element={
            <PublicRoute>
              <Register/>
            </PublicRoute>
           }/>
           </Routes>)
          }
          
      </BrowserRouter>
    </>
  );
}

export default App;
