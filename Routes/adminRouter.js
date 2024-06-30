const express = require("express");
const { createAdmin } = require("../Controllers/adminController");



const adminRouter = express.Router()


adminRouter.post('/createAdmin', createAdmin)

module.exports= adminRouter;
