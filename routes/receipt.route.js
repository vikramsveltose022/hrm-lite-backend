import express from "express";
import { DeletePayment, DeleteReceipt, SavePayment, SaveReceipt, UpdatePayment, UpdateReceipt, ViewReceipt, ViewReceiptById } from "../controller/receipt.controller.js";

const router = express.Router();

router.post("/save-receipt", SaveReceipt);
router.post("/save-payment", SavePayment)
router.get("/view-reciept/:database", ViewReceipt)
router.get("/view-receipt-by-id/:id", ViewReceiptById)
router.delete("/delete-receipt/:id", DeleteReceipt);
router.put("/update-receipt/:id", UpdateReceipt)
router.put("/update-payment/:id", UpdatePayment)
router.delete("/delete-payment/:id", DeletePayment);

export default router;