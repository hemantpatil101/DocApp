import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import axios from 'axios';
import { Table, message } from 'antd';

const Doctors = () => {
  const [doctors,setDoctors] = useState([]);

    const getDoctors = async() => {
      try{
        const res = await axios.get(`${process.env.REACT_APP_URL}/api/v1/admin/getAllDoctors`,
        {
           headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`,
           }
        });

        if(res.data.success)
        {
           setDoctors(res.data.data);
           console.log(res.data.data);
        }
      }
      catch(error)
      {
         console.log(error);
         message.error(error);
      }
    }
    
    const handleAccountStatus = async(record,status) => {
        try{
           const res = await axios.post(`${process.env.REACT_APP_URL}/api/v1/admin/changeAccountStatus`,
           {doctorId:record._id,status:status},
           {
              headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
              }
           })

           if(res.data.success)
           {
              message.success(res.data.success);
           }
        }
        catch(error)
        {
           console.log(error);
           message.error(error.message)
        }
    }

    useEffect(() =>{
      getDoctors();
    },[])
    
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        render: (text, record) => (
          <span>
            {record.firstName} {record.lastName}
          </span>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
      },
      {
        title: "phone",
        dataIndex: "phone",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record) => (
          <div className="d-flex">
            {record.status === "Pending" ? (
              <button className="btn btn-success" onClick={() => handleAccountStatus(record,'Approved')}>Approve</button>
            ) : (
              <button className="btn btn-danger" onClick={() => handleAccountStatus(record,'Rejected')}>Reject</button>
            )}
          </div>
        ),
      },
    ];
  

  return (
    <Layout>
      <h1 className="text-center m-2">Doctors List</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  )
}

export default Doctors