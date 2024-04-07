import React from 'react'
import { Form, Input, message } from 'antd'
import '../RegisterStyls.css'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../Redux/Features/alertSlice';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <>
      <div className='form-container'>
        <Form layout='vertical' onFinish={onfinishHandler} className='register-form'>
          <h1>Register Form</h1>
          <Form.Item label='Name' name='name'>
            <Input type='text' required />
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <Input type='email' required />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input type='password' required />
          </Form.Item>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button className='btn btn-primary' type='submit'>
              Register
            </button>
            <Link to='/login' className='m-2'>
              Already a User, Login
            </Link>

          </div>

        </Form>
      </div>
    </>
  )
}

export default Register