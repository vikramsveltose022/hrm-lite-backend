import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    Image: {
        type: String
    },
    Name: {
        type: String
    },
    DOB: {
        type: String
    },
    Address: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    },
    Contact: {
        type: String
    },
    Designation: {
        type: String
    },
    AadharNo: {
        type: String
    },
    PanNo: {
        type: String
    },
    ReferalName: {
        type: String
    },
    ReferalContactNo: {
        type: String
    },
    status: {
        type: String,
        default: "Active"
    }

}, { timestamps: true });

export const Employee = mongoose.model("employee", employeeSchema);
