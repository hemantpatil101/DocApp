import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';  
import axios from 'axios'
import { hideLoading, showLoading } from '../Redux/Features/alertSlice';
import { setUser } from '../Redux/Features/userSlice';
export default function ProtectedRoutes({children}){
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.user);

    const getUser = async() => {
        try{
          dispatch(showLoading());

          const res =  await axios.post('/api/v1/user/getUserData',{
             token:localStorage.getItem('token'),
          },{
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`,
            }
          })

          dispatch(hideLoading());

          if(res.data.success)
          {
             dispatch(setUser(res.data.data));
             console.log(res.data);
          }
          else
          {
              localStorage.clear();
              return <Navigate to='/login'/>
          }
        }
        catch(error)
        {
          localStorage.clear();
          dispatch(hideLoading());
           console.log(error);
        }
    }
    
    useEffect(() => {
      if (!user) {
        getUser();
      }
    }, [user, getUser]);
  

    if(localStorage.getItem('token'))
    {
        return children;
    }
    else
    {
        return <Navigate to='/login'/>
    }
    /*
    useEffect(() => {
      const fetchData = async () => {
          if (!user) {
              if (localStorage.getItem('token')) {
                  await getUser();
              } else {
                  return <Navigate to='/login' />;
              }
          }
      };
  
      fetchData();
  }, [user, getUser]);
  */

}
