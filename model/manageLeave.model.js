import mongoose from "mongoose";

const LeaveMangeSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    LeaveType: {
        type: String
    },
    NoOfYearly: {
        type: Number
    },
    NoOfmonthly: {
        type: Number
    },
    CheckStatus: {
        type: String
    },
    status: {
        type: String,
        default: "Active"
    }
}, { timestamps: true })

export const LeaveManage = mongoose.model("leaveManage", LeaveMangeSchema)