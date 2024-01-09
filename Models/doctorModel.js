const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId:{
      type:String,
    },
    firstName:{
       type:String,
       required:[true,'Firstname is required']
    },
    lastName:{
        type:String,
        required:[true,'Lastname is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
     },
     phone:{
        type:String,
        required:[true,'Phone No. is required']
     },
     website:{
        type:String,
     },
     address:{
        type:String,
        required:[true,'Address is required']
     },
     experience:{
      type:String,
      required:[true,'Experience is required']
   },
     Specialization:{
        type:String,
        required:[true,'Specialization is required']
     },
     feesPerConsultation:{
        type:Number,
        required:[true,'Fees is required']
     },
     status:{
        type:String,
        default:'Pending'
     },
     timings:{
        type:Object,
        required:[true,'Timing is required']
     }
},
{timestamps:true}
);

const doctorModel = mongoose.model('doctors',doctorSchema);
module.exports = doctorModel; 