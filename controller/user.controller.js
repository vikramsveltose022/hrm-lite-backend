import dotenv from "dotenv"
import { User } from "../model/user.model.js";
import Jwt from "jsonwebtoken";
dotenv.config()

export const SaveUserDetails = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.Image = req.file.filename;
        }
        const user = await User.create(req.body)
        return user ? res.status(200).json({ message: "user details saved successfull", status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewUserDetails = async (req, res, next) => {
    try {
        const user = await User.find({ status: "Active" }).sort({ sortorder: -1 })
        return (user.length > 0) ? res.status(200).json({ User: user, status: true }) : res.status(404).json({ message: "Employee Not Found", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const ViewUserDetailById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        return user ? res.status(200).json({ User: user, status: true }) : res.status(400).json({ message: "something went wrong", status: false })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const DeleteUserDetail = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: "Not Fount", status: false })
        }
        user.status = "Deactive"
        await user.save();
        return res.status(200).json({ message: "delete successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const UpdateUserDetail = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.Image = req.file.filename;
        }
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: "Not Found", status: false })
        }
        const updatedData = req.body;
        await User.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        return res.status(200).json({ message: "updated successfull", status: true })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error", status: false })
    }
}
export const UserLogin = async (req, res, next) => {
    try {
        const { Email, Password } = req.body;
        let existingAccount = await User.findOne({ Email })
        if (!existingAccount) {
            return res.status(400).json({ message: "Incorrect email", status: false });
        }
        if (existingAccount && existingAccount.Password !== Password) {
            return res.status(400).json({ message: "Incorrect password", status: false });
        }
        const token = Jwt.sign({ subject: Email }, process.env.TOKEN_SECRET_KEY);
        if (existingAccount) {
            // await User.updateOne({ email }, { $set: { latitude, longitude, currentAddress } });
            return res.json({ message: "Login successful", User: { ...existingAccount.toObject(), Password: undefined, token }, status: true, });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error", status: false });
    }
};

export const forgetPassword = async (request, response, next) => {
    try {
        const { email } = request.body;
        const otp = Math.floor(100000 + Math.random() * 900000);
        const user = await User.findOne({ email });
        const user1 = await Customer.findOne({ email });
        if (!user && !user1) {
            return response.status(404).json({ message: "User not found" });
        }
        var mailOptions = {
            from: {
                name: "Distribution Management System",
                address: "vikramsveltose022@gmail.com",
            },
            to: email,
            subject: "Password has been reset",
            html: '<div style={{fontFamily: "Helvetica,Arial,sans-serif",minWidth: 1000,overflow: "auto",lineHeight: 2}}<div style={{ margin: "50px auto", width: "70%", padding: "20px 0" }}><div style={{ borderBottom: "1px solid #eee" }}><a href=""style={{ fontSize: "1.4em",color: "#00466a" textDecoration: "none",fontWeight: 600}}></a></div><p style={{ fontSize: "1.1em" }}>Hi,</p><p>The password for your Distribution Management System Password has been successfully reset</p><h2 value="otp" style={{ background: "#00466a", margin: "0 auto",width: "max-content" padding: "0 10px",color: "#fff",borderRadius: 4}}>' +
                otp +
                '</h2><p style={{ fontSize: "0.9em" }}Regards,<br />Distribution Management System</p><hr style={{ border: "none", borderTop: "1px solid #eee" }} /></div</div>',
        };
        await transporterss.sendMail(mailOptions, (error, info) => {
            !error ? response.status(201).json({ user: user, message: "send otp on email", status: true }) : console.log(error) || response.json({ error: "something went wrong" });
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal Server error" });
    }
};
export const otpVerify = async (req, res, next) => {
    try {
        const { otp, email } = req.body;
        if (otp == otp) {
            delete resetOTP[email];
            return res.status(201).json({ message: "otp matched successfully", status: true });
        } else {
            return res.status(400).json({ error: "Invalid otp", status: false });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error...", status: false });
    }
};
export const updatePassword = async (request, response, next) => {
    try {
        const userId = request.params.id;
        const newPassword = request.body.password;
        const confirmPassword = request.body.confirmPassword;
        if (newPassword !== confirmPassword) {
            return response.status(400).json({ error: "Passwords don't match", status: false });
        } else {
            // Use bcrypt to hash the new password
            // const hashedPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt(15));
            const userUpdate = await User.updateOne({ _id: userId }, { password: request.body.password });
            const customerUpdate = await Customer.updateOne({ _id: userId }, { password: request.body.password });
            if ((userUpdate && userUpdate.modifiedCount > 0) || (customerUpdate && customerUpdate.modifiedCount > 0)) {
                return response.status(200).json({ Message: "Password updated successfully", status: true });
            }
            return response.status(400).json({ Message: "Unauthorized User...", status: false });
        }
    } catch (err) {
        console.error(err);
        return response.status(500).json({ Message: "Internal Server Error...", status: false });
    }
};