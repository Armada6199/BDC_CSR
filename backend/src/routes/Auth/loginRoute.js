const router = require("express").Router();
router.post('/login',handleLogin);
const mockUser={
    email:'moh.abdin27@gmail.com',
    password:123,
    hasPrevLoan:true,
    currentSalary:3500, 
    employeeName:'Mohamad Abdin',
    fileNumber:22,
    jobTitle:"Software Developer",
    joiningDate:"2019-4-17",
    employeeLevel:2,
    jobLevel:1,
    employeeNumber:1111,
    workPlace:'Inspire',
    activeLoans: [
        { activeLoanLeftMonths: 10, activeLoanLayer: 'First Layer',activeLoanPayPerMonthInput:200, activeLoanType: 'Home Loan' },
        // { activeLoanLeftMonths: 5000, activeLoanLayer: 'Second Layer',activeLoanPayPerMonthInput:233, activeLoanType: 'Land Loan' },
      ],
}
async function handleLogin(req,res,next){
    const {email,password}=req.body;
    try {
        if(mockUser.email==email&&mockUser.password==password){
            res.send(mockUser)
        }else res.status(401).send('invalid credintals')
    } catch (error) {
        next(error)
    }
}
module.exports=router