import express from "express";
import { DeleteLeave, SaveLeave, UpdatedLeave, ViewLeave, ViewLeaveById, ViewLeaveByUser } from "../controller/manageLeave.controller.js";

const router = express.Router();

router.post("/save-mange-leave", SaveLeave)
router.get("/view-mange-leave", ViewLeave)
router.get("/view-mange-leave-user/:id", ViewLeaveByUser)
router.get("/view-mange-leave-by-id/:id", ViewLeaveById)
router.put("/update-mange-leave/:id", UpdatedLeave)
router.delete("/delete-mange-leave/:id", DeleteLeave)

export default router;