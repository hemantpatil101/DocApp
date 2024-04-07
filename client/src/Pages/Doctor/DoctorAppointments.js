import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import { Table, message } from 'antd'
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

const DoctorAppointments = () => {
    
    const { user } = useSelector((state) => state.user);
    //console.log(user);
    const [appointments,setAppointments] = useState([]);
    const getAppointments = async() => {
        try{
           const res = await axios.post(`${process.env.REACT_URL}/api/v1/doctor/doctor-appointments`,
           {userId:user._id},
           {headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
               }
           })

           if(res.data.success)
           {
               setAppointments(res.data.data);
               
           }
        }
        catch(error)
        {
           console.log(error);
        }
    }
    
    const handleStatus = async (record, status) => {
        try {
          const res = await axios.post(
            "/api/v1/doctor/update-status",
            { appointmentsId: record._id, status },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (res.data.success) {
            message.success(res.data.message);
            getAppointments();
          }
        } catch (error) {
          console.log(error);
          message.error("Something Went Wrong");
        }
      };
    

    useEffect(() => {
       getAppointments();
    },[])

    const columns = [
        {
          title: "Id",
          dataIndex: "_id",
        },
        // {
        //   title: "Name",
        //   dataIndex: "name",
        //   render: (text, record) => (
        //     <span>
        //       {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        //     </span>
        //   ),
        // },
        // {
        //   title: "Phone",
        //   dataIndex: "phone",
        //   render: (text, record) => <span>{record.doctorInfo.phone}</span>,
        // },
        {
          title: "Date & Time",
          dataIndex: "date",
          render: (text, record) => (
            <span>
              {moment(record.date).format("DD-MM-YYYY")} &nbsp;
              {moment(record.time).format("HH:mm")}
            </span>
          ),
        },
        {
          title: "Status",
          dataIndex: "status",
        }
        ,
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
            <div className="d-flex">
                {record.status === "Pending" && (
                <div className="d-flex">
                <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approved")}>
                Approved
                </button>
                <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}>
                Reject
                </button>
            </div>)}
            </div>),
        },
    ];

  return (
    <>
      <Layout>
        <Table columns={columns} dataSource={appointments}/>
      </Layout>
    </>
  )
}

export default DoctorAppointments