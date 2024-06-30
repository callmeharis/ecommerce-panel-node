const Admin = require('../models/adminModel')
const transporter = require('../middleware/transporter')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


exports.createAdmin = async (req, res) => {
    const { username, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const createAdmin = new Admin({
            username,
            email,
            password: hashedPassword,
            phone
        });
        await createAdmin.save()
        return res.status(201).json({ message: "admin created ", createAdmin })


    } catch (error) {
        console.log('Admin not found');
        res.status(404).json({ message: " Admin not found" })

    }
}

exports.updateAdmin = async (req, res) => {
    const { id } = req.params;

    const changes = req.body
    try {
        const Admin_up = await Admin.findByIdAndUpdate(id, changes, { new: true });

        if (!Admin_up) {
            return res.status(404).json({ message: ' admin not found' })
        }
        res.status(200).json({ Admin_up })

    } catch (error) {
        console.log('Error in updating');
        res.status(500).json({ message: 'An error occured while opdating the Admin' })

    }

};

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const login = await Admin.findOne({ email });
        if (!login) {
            return res.status(404).json({ message: 'error' })

        }
        res.status(200).json({ login })

    } catch (error) {
        console.log('wrong email and password');
        res.status(500).json({ message: 'error' });
    }
};
exports.SendResetPasswordEmailAdmin = async (req, res) => {
    const { email } = req.body;
    try {
        const admin = await Admin.findOne({ email })
        if (!admin) {
            res.status(404).json({ mesage: " admin not found with this email" })
        }
        const token = jwt.sign({ adminId: Admin._id, email: Admin.email }, process.env.JWT_SECRET, { expiresIn: "1d" })

        const mailOption = {
            from: process.env.HOST_MAIL,
            to: email,
            subject: "reset password",
            text: `this is reset password link\n ${token}`
        }
        await transporter.sendMail(mailOption)
        return res.status(200).json({ mesage: 'email send sucessfully' })

    } catch (error) {
        console.log(error.message);

    }
};

exports.changePasswordAdmin = async (req, res) => {
    const { token } = req.params
    const { newPassword } = req.body
    try {
        const tokenDetails = jwt.verify(token, process.env.JWT_SECRET)
        const { adminId } = tokenDetails
        const admin = await Admin.findByIdAndUpdate(adminId, { passsword: newPassword }, { new: true })
        if (!admin) {
            return res.status(404).json({ mesg: " Password reset succesfully", newPassword })
        }

        res.status(200).json({ mesg: 'password changed successfully' })

    } catch (error) {
        console.log(error.message);

    }


};

exports.deleteAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const Admin_del = await Admin.findByIdAndDelete(id);

        if (!Admin_del) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });

    } catch (error) {
        console.error('Error in deleting:', error);
        res.status(500).json({ message: 'An error occurred while deleting the student' });
    }
};
