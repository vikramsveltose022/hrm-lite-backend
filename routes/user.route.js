import express from "express"
import { DeleteUserDetail, SaveUserDetails, UpdateUserDetail, UserLogin, ViewUserDetailById, ViewUserDetails } from "../controller/user.controller.js";

const router = express.Router();

router.post("/save-user", SaveUserDetails);
router.get("/view-user", ViewUserDetails)
router.get("/view-user-by-id/:id", ViewUserDetailById)
router.delete("/delete-user/:id", DeleteUserDetail)
router.put("/update-user/:id", UpdateUserDetail)
router.post("/user-login", UserLogin)

export default router;