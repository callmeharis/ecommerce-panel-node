const Admin = require('../Models/adminModel')


exports.createAdmin = async (req, res) => {
    const { username, email, password, phone } = req.body;


    try {
        const createAdmin = new Admin({
            username,
            email,
            password,
            phone
        });
        await createAdmin.save()
        return res.status(201).json({ message: "admin created ", createAdmin })


    } catch (error) {
        console.log('Admin not found');
        res.status(404).json({ message: " Admin not found" })

    }
}