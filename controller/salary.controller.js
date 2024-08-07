import moment from "moment";
import { Employee } from "../model/employee.model.js";
import { Holiday } from "../model/holiday.model.js";
import { Salary } from "../model/salary.model.js";
import { Shift } from "../model/shift.model.js";
import axios from "axios";
import { LeaveManage } from "../model/manageLeave.model.js";
import { Leave } from "../model/leave.model.js";

export const CreateSalary = async (req, res, next) => {
    try {
        const previousMonthStart = moment().subtract(1, 'months').startOf('month').toDate();
        const previousMonthEnd = moment().subtract(1, 'months').endOf('month').toDate();
        let LeaveCount = 0;
        let totalHoliday = 0;
        let latest = [];
        let employee = [];
        let totalHours = 0;
        let totalOverTime = 0;
        let overTimeAmount = 0;
        let totalWorkingDays = 0;
        let bonusAmount = 0;
        let hours;
        let salary;
        let pfAmount = 0
        let totalSundayHours;
        const current = new Date()
        const month = current.getMonth()
        // const formattedMonth = (month < 10 ? "0" : "") + month;
        const year = current.getFullYear()
        const holiday = await Holiday.find({ userId: req.params.userId, Month: month })
        if (holiday.length > 0) {
            totalHoliday = holiday.length
        }
        const user = await Employee.find({ userId: req.params.userId, status: "Active" })
        if (user.length === 0) {
            return res.status(404).json({ message: "User Not Found", status: false })
        }
        for (let id of user) {
            if (id.Shift) {
                // console.log(id.Shift.shiftName)
                const WorkingHour = await Shift.findOne({ userId: req.params.userId, shiftName: id.Shift.shiftName })

                // console.log(WorkingHour)
                hours = await WorkingHour?.totalHours
            } else {
                continue;
            }
            const lastMonth = await SundayCheck()
            const data = await totalWorkingHours(id._id)
            totalWorkingDays = await data.attendanceTotal.length;
            if (data.attendanceTotal.length > 0) {
                totalHours = data.totalMonthHours;
                totalOverTime = data.totalOverTime
                if (totalOverTime > 0) {
                    overTimeAmount = ((id.Salary / (lastMonth.daysInPreviousMonth)) / hours) * totalOverTime;
                }
            }
            const leave = await LeaveManage.find({
                Employee: id._id,
                $or: [{ startDate: { $gte: previousMonthStart, $lte: previousMonthEnd } },
                { endDate: { $gte: previousMonthStart, $lte: previousMonthEnd } }]
            });
            if (leave.length === 0) {
                // console.log("leave not found")
            }
            for (let id of leave) {
                const checkLeave = await Leave.findById(id.LeaveType)
                if (!checkLeave) {
                    // console.log("leave manage not found")
                }
                const yes = (checkLeave.CheckStatus === "Paid") ? LeaveCount++ : false
            }
            // const lastMonth = await SundayCheck()
            // console.log("lastMonth : " + lastMonth.daysInPreviousMonth)
            // totalSundayHours = (lastMonth.sundays) * hours
            const finalHours = (totalHours + ((LeaveCount + totalHoliday) * hours)) //+totalSundayHours
            salary = (((id.Salary / (lastMonth.daysInPreviousMonth)) / hours) * finalHours)
            const CheckSalary = (totalHours === 0) ? salary = 0 : salary;
            let latestSalary = {
                userId: id.userId,
                employeeId: id._id,
                employeeName: id.Name,
                panCard: id.PanNo,
                basicSalary: id.Salary,
                salaryMonth: month,
                totalSalary: CheckSalary,
                totalHours: totalHours,
                DayHours: hours,
                // totalSundayHours: totalSundayHours,
                totalWorkingDays: totalWorkingDays,
                overTimeAmount: overTimeAmount,
                employee: employee
            }
            // await Salary.create(latestSalary)
            latest.push(latestSalary)
            employee = []
            totalHours = 0
            totalOverTime = 0
            overTimeAmount = 0
            totalWorkingDays = 0
            totalSundayHours = 0;
        }
        return res.send(latest)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const totalWorkingHours = async function totalWorkingHours(data) {
    try {
        const res = await axios.get(`https://dms-node.rupioo.com//attendance-calculate-employee/${data}`)
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}
export const SundayCheck = async () => {
    try {
        const currentMonth = new Date().getMonth();
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const year = new Date().getFullYear();
        const daysInPreviousMonth = new Date(year, previousMonth + 1, 0).getDate();
        let sundays = 0;
        const firstDayOfPreviousMonth = new Date(year, previousMonth, 1).getDay();
        for (let day = firstDayOfPreviousMonth === 0 ? 1 : 2; day <= daysInPreviousMonth; day++) {
            const date = new Date(year, previousMonth, day);
            if (date.getDay() === 0) {
                sundays++;
            }
        }
        return { sundays, daysInPreviousMonth }
    } catch (err) {
        console.error(err);
    }
};
export const ViewSalary = async (req, res, next) => {
    try {
        const salary = await Salary.find({ userId: req.params.userId }).sort({ sortorder: -1 }).populate({ path: "employeeId", model: "employee" })
        return (salary.length > 0) ? res.status(200).json({ Salary: salary, status: true }) : res.status(500).json(404).json({ message: "Not Found", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}