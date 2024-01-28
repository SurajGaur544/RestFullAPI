const express = require('express');
const Student = require("../models/student")
const StudentRouter = new express.Router();

// StudentRouter.post('/student', (req, res) => {
//     console.log(req.body)
//     const user = new Student(req.body);
//     user.save().then(()=> {
//         res.status(201)
//         .send({ user })
//     }).catch((e) => {
//         res.status(400)
//         .send({ e })
//     })
    
// });

StudentRouter.post('/student', async(req, res)=> {
    try{
        const user = new Student(req.body);
        const result = await user.save()
        if(!result){
            res.status(404).send({ message: "data not match" })
        }
        return res.status(201).send({ message: "success", result });
    }catch(e) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

//  get the student data

StudentRouter.get('/student', async (req, res) => {
    try{
        
        const studentRes = await Student.find();
        if(!studentRes){
            res.status(404).json({ })
        }
        return res.status(200).send(studentRes)
    }catch(e){
        res.status(500).json({ message: "Internal Server Error", e })
    }
})



// get the student data using id

// StudentRouter.get('/student/:id', async (req, res) => {
//     try{
//           const _id = req.params.id;
//           const studentResult = await Student.findById(_id);
//           if(!studentResult){
//             res.status(404).json({ message: "Id not a valid"})
//           }
//           return res.status(200).json({ message: "success", studentResult });
//     }catch(e){
//         res.status(500).json({ message: "Internal Server Error"})
//     }
// })

// get the student data using name

// StudentRouter.get('/student/:name',async(req, res) => {
//     try{
//         const name = req.params.name;
//         const studentData = await Student.find({ name : {
//             $regex: name,
//             $options: 'i'
//           },});
//         console.log(studentData);
//         if(!studentData){
//             res.status(404).json({ message: "data not match" });
//         }
//         return res.status(200).json({ message: "success", studentData });
//     }catch(e){
//         res.status(404).json({ message: "Internal Server Error"});
//     }
// })


//  Delete the student documrnt 

StudentRouter.delete('/student/:id', async (req, res) => {
    try{
       const id = req.params.id;
       const result = await Student.findByIdAndDelete(id);
       if(!result){
        res.status(404).json({ message: "Id is not match" });
       }
       return res.status(200).json({ message: "success", result: "Deleted", result });
    }catch(e){
        res.status(500).json({ message: "Internal Server Error" });
    }
})


//  Update the student Data using patch and change some specific record

// StudentRouter.patch('/student/:id', async(req, res) => {
//     try{
//        const _id = req.params.id;
//        const result = await Student.findByIdAndUpdate( _id, req.body );
//        if(!result){
//         res.status(404).json({ message: "Id not found" })
//        }
//        return res.status(200).json({ message: "success", result });
//     }catch(e){
//         res.status(500).json({ message: "Internal Server Error" ,e });
//     }
// })

StudentRouter.patch('/student/:id', async(req, res) => {
    try{
       const _id = req.params.id;
       const result = await Student.findByIdAndUpdate( _id, req.body,{
        new: true
       } );
       if(!result){
        res.status(404).json({ message: "Id not found" })
       }
       return res.status(200).json({ message: "success", result });
    }catch(e){
        res.status(500).json({ message: "Internal Server Error" ,e });
    }
})


module.exports = StudentRouter;