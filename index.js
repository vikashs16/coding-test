let express = require('express');
let bodyParser= require('body-parser');
let database = require('./db');
let db = require('./model')

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())


// user register info
app.post('/api/register',async (req,res) =>{
    try {
        if(!Array.isArray(req.body.teachers)){
            let checkStudentData = await db.teacher.findOne({teachers:req.body.teachers})
            if(checkStudentData){
                let teacherInfo = await db.teacher.updateOne({ 
                    $addToSet: { students: { $each: [req.body.students] } } 
                })
                res.send({
                    status:"success",
                    message:"Update Data succesfully",
                    data:teacherInfo
                })
            }else{
                const studentData = new db.teacher({
                    teachers: req.body.teachers,
                    students: req.body.students
                });
    
                let data = await studentData.save();
                if(data){
                    res.send(data);
                }else{
                    res.status(500).send({
                        message:err.message || "Insert data sucessfully."
                    });
                }
            }
        }else if(!Array.isArray(req.body.student)){
            let checkStudentData = await db.student.findOne({students:req.body.students})
            if(checkStudentData){
                let teacherInfo = await db.student.updateOne({ 
                    $addToSet: { teachers: { $each: req.body.teachers } } 
                })
                res.send({
                    status:"success",
                    message:"Update Data succesfully",
                    data:teacherInfo
                })
            }else{
                const studentData = new db.student({
                    students: req.body.students,
                    teachers: req.body.teachers
                });
                let data = await studentData.save();
                if(data){
                    res.send(data);
                }else{
                    res.status(500).send({
                        message:err.message || "Insert data sucessfully."
                    });
                }
            }
        }else{
            res.send({
                message:"Params value is not correct."
            });
        }
    }catch(err){
        console.log("data not save!", err);
    }
});

app.get('/api/commonstudents',async (req,res) =>{
    try {
        let arrData= []
        let finArr = []
        if(Array.isArray(req.query.teachers)){
            for(var i=0; i<=req.query.teachers.length; i++){
                let arrTeacherData = await db.teacher.find({ 
                     "teachers": req.query.teachers[i]
                })
                arrData.push(...arrTeacherData)   
            }
            arrData.filter((item)=>{finArr.push(...item.students)})
            res.send({students:finArr})
        }else{
            let teacherData = await db.teacher.findOne({
                teachers:req.query.teachers
            });
            if(teacherData){
                res.send({students:teacherData.students });
            }else{
                res.send({status:404,message:"data not found!"});
            }
        }
    }
    catch(err){
        console.log("data not save!", err);
    }
});

app.post('/api/suspend',async (req,res) =>{
    try{
        let checkStudentData = await db.suspend.findOne({students:req.body.students})
        if(checkStudentData){
            res.send({
                students:checkStudentData.students
            })
        }else{
            const suspendData = new db.suspend({
                students: req.body.students,
                teachers: req.body.teachers
            });
            let data = await suspendData.save();
            if(data){
                res.send(data.students);
            }else{
                res.status(500).send({
                    message:err.message || "Insert data sucessfully."
                });
            }
        }
    }
    catch(err){
        console.log("data not save!", err);
    }
})

app.listen(8080 ,()=>{
    console.log('connect to database and server has been start 8080')
})
    

