import { Table } from 'antd';
import axios from 'axios'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Appointments = () => {
    const { user } = useSelector((state) => state.user);
    console.log(user);
    const [appointments,setAppointments] = useState([]);
    const getAppointments = async() => {
        try{
           const res = await axios.post('/api/v1/user/user-appointments',
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
        },
      ];
    
  return (
    <>
       <h1>Your Appointments</h1>
       <Table columns={columns} dataSource={appointments}/>
    </>
  )
}

export default Appointments