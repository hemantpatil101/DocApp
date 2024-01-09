import React from 'react'
import { Form, Input,message } from 'antd'
import '../RegisterStyls.css'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../Redux/Features/alertSlice';
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const onfinishHandler = async(values) => {
     try{
        dispatch(showLoading());
        const {data} = await axios.post('/api/v1/user/login',values);
        
        window.location.reload();

        dispatch(hideLoading());
        if(data.success)
        {
            localStorage.setItem('token',data.token);
            message.success('Login Successful');
            navigate('/');
        }
        else
        message.error(data.message);
     }
     catch(error)
     {
        dispatch(hideLoading());
        console.log(error);
        message.error("Something went wrong");
     }
  }

return (
    <>
       <div className='form-container'>
         <Form layout='vertical' onFinish={onfinishHandler} className='register-form'>
           <h1>Login Form</h1>
           <Form.Item label='Email' name='email'>
             <Input type='email' required/>
           </Form.Item>
           <Form.Item label='Password' name='password'>
             <Input type='password' required/>
           </Form.Item>
           <Link to='/register' className='m-2'>
            Not a User, Register
           </Link>
           <button className='btn btn-primary' type='submit'>
            Login
           </button>
         </Form>
       </div>
    </>
)
}

export default Login