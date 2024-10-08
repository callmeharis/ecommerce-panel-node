const express = require("express")
const { createAdmin, updateAdmin, loginAdmin, deleteAdmin, SendResetPasswordEmailAdmin, changePasswordAdmin } = require("../Controllers/adminController")



const adminRouter = express.Router()


adminRouter.post('/createAdmin', createAdmin)
adminRouter.put('/update/admin/:id', updateAdmin)
adminRouter.post('/login', loginAdmin)
adminRouter.delete('/delete/admin/:id', deleteAdmin)
adminRouter.post('/reset/admin', SendResetPasswordEmailAdmin)
adminRouter.post('/change/password/admin/:token', changePasswordAdmin)


module.exports = adminRouter

