import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import Layout from '../Components/Layout';
import { Row,Col } from 'antd';
import DoctorList from '../Components/DoctorList';
const HomePage = () => {
    const [doctors,setDoctors] = useState([]);
    const getUserData = async() => {
      try{
        const res = await axios.get(`${process.env.REACT_APP_URL}/api/v1/user/getAllDoctors`,
        {
           headers:{
             Authorization: `Bearer ${localStorage.getItem('token')}`,
           }
        })
        if(res.data.success)
        {
            setDoctors(res.data.data);
        }
      }
      catch(error)
      {
        console.log(error);
      }
    }

    useEffect(() => {
      getUserData();
    },[]);
    
  return (
    <>
    {/*<Layout>
       <h1 className='text-center homepageh1' >All Doctors</h1>
       <Row>
          {doctors && doctors.map(doctor => (
            <DoctorList doctor={doctor}/>
          ))}
       </Row>
          </Layout> */}
    <Layout>
      <h1 className='text-center homepageh1'>All Doctors</h1>
      {doctors && doctors.map((doctor, index) => (
        <Row key={index} style={{ marginBottom: 16 }} justify="center" align="middle">
          <Col>
            <DoctorList doctor={doctor} />
          </Col>
        </Row>
      ))}
    </Layout>
    </>
  )
}

export default HomePage