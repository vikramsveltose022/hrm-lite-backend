import express from "express";
import { DeleteHoliday, SaveHoliday, UpdatedHoliday, ViewHoliday, ViewHolidayById, ViewHolidayByUser } from "../controller/holiday.controller.js";

const router = express.Router();

router.post("/save-holiday", SaveHoliday)
router.get("/view-holiday", ViewHoliday)
router.get("/view-holiday-user/:id", ViewHolidayByUser)
router.get("/view-holiday-by-id/:id", ViewHolidayById)
router.put("/update-holiday/:id", UpdatedHoliday)
router.delete("/delete-holiday/:id", DeleteHoliday)

export default router;