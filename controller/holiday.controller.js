import { Holiday } from "../model/holiday.model.js";

export const SaveHoliday = async (req, res, next) => {
    try {
        const holiday = await Holiday.create(req.body)
        return holiday ? res.status(200).json({ message: "Holiday Saved Successfull!", status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const SaveHolidaymultiple = async (req, res, next) => {
    try {
        const holiday = await Holiday.create(req.body.Holidays)
        return holiday ? res.status(200).json({ message: "Holiday Saved Successfull!", status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewHoliday = async (req, res, next) => {
    try {
        const holiday = await Holiday.find({ status: "Active" }).sort({ sortorder: -1 })
        return (holiday.length > 0) ? res.status(200).json({ Holiday: holiday, status: true }) : res.status(404).json({ message: "Holiday Not Found", status: false })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewHolidayByUser = async (req, res, next) => {
    try {
        const holiday = await Holiday.find({ status: "Active", userId: req.params.id }).sort({ sortorder: -1 })
        return (holiday.length > 0) ? res.status(200).json({ Holiday: holiday, status: true }) : res.status(404).json({ message: "Holiday Not Found", status: false })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewHolidayById = async (req, res, next) => {
    try {
        const holiday = await Holiday.findById(req.params.id)
        return holiday ? res.status(200).json({ Holiday: holiday, status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const DeleteHoliday = async (req, res, next) => {
    try {
        const holiday = await Holiday.findByIdAndDelete(req.params.id)
        if (!holiday) {
            return res.status(404).json({ message: "Holiday Not Found", status: false })
        }
        return res.status(200).json({ message: "Holiday Deleted Successfull!", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const UpdatedHoliday = async (req, res, next) => {
    try {
        const holiday = await Holiday.findById(req.params.id)
        if (!holiday) {
            return res.status(404).json({ message: "Holiday Not Found", status: false })
        }
        const updatedData = req.body;
        await Holiday.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        return res.status(200).json({ message: "updated successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}