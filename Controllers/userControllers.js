const userModel = require('../Models/userModel');
const doctorModel = require('../Models/doctorModel');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const appointmentModel = require('../Models/appointmentModel');

const loginController = async(req,res) => {
    try{
       const user = await userModel.findOne({email:req.body.email});
       if(!user)
       {
          return res.status(200).send({
             success:false,
             message:'User not Found',
          })
       }

       const isMatch = await bcrypt.compare(req.body.password,user.password);
       if(!isMatch)
       {
          return res.status(200).send({
             message:'Invalid Email or Password',
             success:false
          })
       }

       const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:'1d',
       })

       res.status(200).send({
            message:"Login Successful",
            success:true,
            token
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            message:error.message
        })
    }
};

const registerController = async(req,res) => {
    try{
        console.log("Details: " + req.body);
       const existingUser = await userModel.findOne({email:req.body.email});

       if(existingUser)
       {
          res.status(500).send({
              success:false,
              message:'User Already Exist'
          })
       }
       
       const password = req.body.password;
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt);
       req.body.password = hashedPassword;

       const newUser = new userModel(req.body);

       await newUser.save();

       res.status(201).send({
        success:true,
        message:"Registration Successful",
       })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:error.message,
        })
    }
};

const authController = async(req,res) => {
    try{
        const user = await userModel.findById({ _id:req.body.userId })
        user.password = undefined;
        if(!user)
        {
            return res.status(200).send({
                message:'User Not Found',
                success:false,
            })
        }
        else
        {
            res.status(200).send({
                success:true,
                data:user
            })
        }
        
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            message:'auth error',
            success:false,
            error
        })
    }
}
const applyDoctorController = async(req,res) => {
     try{
        console.log("Body" + req);
        const newDoc = await doctorModel({...req.body,status:'Pending'});
        await newDoc.save();
        
        const adminUser = await userModel.findOne({isAdmin:true});
        const notification = adminUser.notification;
        notification.push({
            type:'apply-doctor-request',
            message:`${newDoc.firstName} ${newDoc.lastName} has Applied for Doctor Account`,
            data:{
                doctorId:newDoc._id,
                name:`${newDoc.firstName} ${newDoc.lastName}`,
                onClickPath:'/admin/doctors'
            }
        })

        await userModel.findByIdAndUpdate(adminUser._id,{notification});

        res.status(201).send({
            success:true,
            message:'Doctor Account Applied Successfully',
        })
     }
     catch(error)
     {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while applying for doctor",
        })
     }
}

const getAllNotificationsController = async(req,res) =>{
   try{
     const user = await userModel.findOne({_id:req.body.userId});
     const notification = user.notification;
     const seenNotification = user.seenNotification;
     seenNotification.push(...notification);

     user.notification = [];
     user.seenNotification = seenNotification;

     const updatedUser = await user.save();

     res.status(200).send({
        success:true,
        message:'All Notifications Read',
        data : updatedUser,
     })
   }
   catch(error)
   {
      console.log(error);
      res.status(500).send({
        success:false,
        message:'Error in Notification',
        error
      })
   }
}

const deleteAllNotificationsController = async(req,res) =>{
    try{
       const user = await userModel.findOne({_id:req.body.userId});
       user.notification = []
       user.seenNotification = []

       const updatedUser = await user.save();

       updatedUser.password = undefined
       console.log(user);
       res.status(200).send({
          message:"Deleted All Notifications",
          success:true,
          updatedUser,
       })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Unable to delete all Notifications',
            error,
        })
    }
}

const getAllDoctorsControllers = async(req,res) =>{
    try{
       const doctors = await doctorModel.find({status:"Approved"});
       res.status(200).send({
          success:true,
          message:'Doctors list fetched successfully',
          data:doctors
       })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Unable to get all Doctors',
            error,
        })
    }
}

const bookAppointmentController = async(req,res) =>{
     try{
        console.log(req.body)
        req.body.date = moment(req.body.date,"DD-MM-YYYY").toISOString();
        console.log(req.body.date);
        req.body.time = moment(req.body.time,"HH-mm").toISOString();

        req.body.status = "Pending"
        const newAppointment = new appointmentModel(req.body);
        await newAppointment.save();

        const user = await userModel.findOne({_id:req.body.doctorInfo.userId});
        
        user.notification.push({
            type:'New-Appointment-Request',
            message:`A new Appointment request from ${req.body.userInfo.name}`,
            onClickPath:'/doctor/doctor-appointments'
        })

        await user.save();

        res.status(200).send({
            success:true,
            message:'Appointment Booked Successfully',
        })
     }
     catch(error)
     {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Unable to Book AppointMent',
            error,
        })
     }
}

const bookingAvailabilityController = async(req,res) => {
    try{
        const date = moment(req.body.date,"DD-MM-YYYY").toISOString();
        const fromTime = moment(req.body.time, "HH:mm")
        .subtract(1, "hours")
        .toISOString();
       const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
       const doctorId = req.body.doctorId;
       console.log(doctorId + " " + date);
       const appointments = await appointmentModel.find({
      doctorId,
      date,
      /*time: {
        $gte: fromTime,
        $lt: toTime,
      },*/ });
        console.log(`${fromTime}->${toTime}`)
        //console.log("Appointments-->" + appointments);
        if(appointments.length>0)
        {
            return res.status(200).send({
                success:true,
                message:'No'
            })
        }
        else
        {
            return res.status(200).send({
                success:true,
                message:'Yes'
            })
        }

    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Unable to Check Availability',
            error,
        })
    }
}

const userAppointmentController = async(req,res) => {
    console.log(req.body);
    try{
       const appointments = await appointmentModel.find({
          userId:req.body.userId,
       });
       res.status(200).send({
        success:true,
        message:'User AppointMents Fetched Successfully',
        data:appointments
       })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in user Appointments',
            error,
        })
    }
}
module.exports = {loginController,registerController,authController,applyDoctorController,
    getAllNotificationsController,deleteAllNotificationsController,getAllDoctorsControllers,
    bookAppointmentController,bookingAvailabilityController,userAppointmentController };