const nodemailer=require('nodemailer')

const transporter=nodemailer.createTransport({
    service: "gmail",
    auth:{
           user:'is170404123@gmail.com',
           pass:"mzxz yqle imss gdvm"
    }
})
module.exports=transporter