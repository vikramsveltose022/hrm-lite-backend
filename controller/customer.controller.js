import { Customer } from "../model/customer.model.js";

export const saveCustomerDetails = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.ShopImage = req.file.filename;
        }
        const customer = await Customer.create(req.body)
        return customer ? res.status(200).json({ message: "Customer Details Saved Successfull", status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const viewCustomerDetail = async (req, res, next) => {
    try {
        const customer = await Customer.find({ status: "Active" }).sort({ sortorder: -1 })
        return (customer.length > 0) ? res.status(200).json({ Customer: customer, status: true }) : res.status(404).json({ message: "Customer Not Found", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const viewCustomerDetailById = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id)
        return customer ? res.status(200).json({ Customer: customer, status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const deleteCustomerDetail = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id)
        if (!customer) {
            return res.status(404).json({ message: "Customer Not Fount", status: false })
        }
        customer.status = "Deactive"
        await customer.save();
        return res.status(200).json({ message: "Customer Delete Successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const updatedCustomerDetail = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.ShopImage = req.file.filename;
        }
        const customer = await Customer.findById(req.params.id)
        if (!customer) {
            return res.status(404).json({ message: "Customer Not Found", status: false })
        }
        const updatedData = req.body;
        await Customer.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        return res.status(200).json({ message: "Customer Detail Updated Successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}