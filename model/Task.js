
import mongoose from "mongoose";

const TaskModel = new mongoose.Schema({
    name : {
        type : String,
        minlength : 5,
        required : [true, 'Name is required']
    },

    status : {
        type : String,
        enum : {
            values : ['completed', 'pending', 'failed']
        },
        default : 'pending'
    },

    description : {
        type : String,
        minlength : 10,
        required : [true, 'Description is required']
    },

    startDate : {
        type : Date,
        required : [true, 'Start date is required'],
    },

    endDate : {
        type : Date,
        required : [true, 'End date is required']
    },

    priority : {
        type : String,
        enum : {
            values : ['urgent', 'critical', 'normal']
        },
        default : 'normal'
    },

    assignerId : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true, 'Assigner Id is required']
    },

    assigner : {
        type : String,
        required : [true, 'Assigner is required']
    },

    assignee : {
        type : String,
        required : [true, 'Assignee is required']
    }


}, {timestamps : true})

export default mongoose.model('Task', TaskModel)