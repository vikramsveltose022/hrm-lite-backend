import { Employee } from "../model/employee.model.js";


export const saveEmployeeDetails = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.Image = req.file.filename;
        }
        console.log("calling")
        console.log(req.body)
        const employee = await Employee.create(req.body)
        return employee ? res.status(200).json({ message: "employee details saved successfull", status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const viewEmployeeDetail = async (req, res, next) => {
    try {
        const employee = await Employee.find({ status: "Active" }).sort({ sortorder: -1 })
        return (employee.length > 0) ? res.status(200).json({ Employee: employee, status: true }) : res.status(404).json({ message: "Employee Not Found", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const viewEmployeeDetailById = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id)
        return employee ? res.status(200).json({ Employee: employee, status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const deleteEmployeeDetail = async (req, res, next) => {
    try {
        const empoloyee = await Employee.findById(req.params.id)
        if (!empoloyee) {
            return res.status(404).json({ message: "Not Fount", status: false })
        }
        empoloyee.status = "Deactive"
        await empoloyee.save();
        return res.status(200).json({ message: "delete successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const updatedEmployeeDetail = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.Image = req.file.filename;
        }
        const empoloyee = await Employee.findById(req.params.id)
        if (!empoloyee) {
            return res.status(404).json({ message: "Not Found", status: false })
        }
        const updatedData = req.body;
        await Employee.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        return res.status(200).json({ message: "updated successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}