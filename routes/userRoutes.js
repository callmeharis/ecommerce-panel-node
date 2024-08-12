const express = require('express')
const { createUser, updateUser, deleteUser, loginUser, SendResetPasswordEmailUser, changePasswordUser } = require('../Controllers/userController')

const userRouter = express.Router()

userRouter.post('/createuser', createUser)
userRouter.put('/userUpdate/:id', updateUser)
userRouter.delete('/delete/:userId', deleteUser)
userRouter.post('/loginuser', loginUser)
userRouter.post('/resetPass', SendResetPasswordEmailUser)
userRouter.post('/changeuserpass/:token', changePasswordUser)
module.exports = userRouter