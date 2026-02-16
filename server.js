const express = require("express");
const app = express();
const PORT = 5080


//Middleware setting json for handling//
app.use(express.json());


// routing in express//
app.get("/api/v2/students", (req, res) => {
    res.json({ message: "this is the student portal page" })
});


//dynamic routing ( getting specific ID) //
app.get("/api/v2/students/:id", (req, res) => {
    const id = req.params.id;
    res.json({
        message: `this student with id ${id} has been fetched`
    });


});
app.get("/api/v2/students", (req, res) => {
    res.json({
        message: "all students list"
    });
    console.log(req.url)
});





// BASIC API IN EXPRESS //


// Posting a student //
let StudentDatabase = [];
app.get("/api/v2/students", (req, res) => {
    return res.json({
        message: StudentDatabase
    });
});



app.post("/api/v2/students", (req, res) => {
    const { firstName, lastName, age, classLevel, departmental } = req.body;
    if (!firstName || lastName || age === undefined || classLevel || deparmental) {
        return res.status(400).json({ message: "All fields are required" });
    };


    const parseAge = Number(age);
    if (Number.isNaN(parseAge) || parseAge <= 0) {
        return res.status(404).json({
            message: "Age must be  a positive number"
        })
    };


    const newStudent = {
        id: StudentDatabase.length + 1,
        firstName,
        lastName,
        age: parseAge,
        classLevel,
        departmental,
    };

    StudentDatabase.push(newStudent);
    return res.status(404).json({
        message: "Student created successfully",
        data: StudentDatabase
    });
});


// fetching a student by their user id query params //
app.get("/api/v2/students/:id", (req, res) => {
    const studentInfo = studentDatabase.findById(req.params.id)
    //     (std) => std.id === parseInt(req.params.id)
    // );
    if (!studentInfo) {
        return res.status(500).json({ message: "students not found" })
    }
    res.json({
        message: "student retrieved successfully",
        data: studentInfo,

    });

});



// app.patch("/api/v2/students/:id", async (req,res) => {
//     const updateStudent = await studentDatabase.findByIdAndUpdate(req.params.id, req.body {new: true});
//     if (!updateStudent ) {
//         return res.status(404).json({ 
//             message: "Student Update failed"});
//     }
//     res.status(200).json({ message: "Student updated successfully"});

// } );

app.patch("/api/v2/students/:id", async (req, res) => {
    try {
        const updateStudent = await studentDatabase.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updateStudent) {
            return res.status(404).json({
                message: "Student updated failed"
            });
        }
        res.status(200).json({
            message: "Student updated successfully",
            data: updataStudent
        });
    } catch (error) {
        res.status(500).json({
            message: "error", error: error.message
        });
    }
})






// app.delete("/api/v2/students/:id", async (req,res) => {

//     const deleteStudent =  await studentDatabase.findByIdAndDelete(req.params.id);
//     if (!deleteStudent) {
//         return res.status(404).json({
//             message: "User not found"
//         });
//     }
//     res.status(200).json({
//         message: "User deleted successfully"
//     });

// });
app.delete("/api/v2/students/:id", async (req, res) => {
    try {
        const deleteStudent = await studentDatabase.findByIdAndDelete(req.params.id);
        if (!deleteStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        res.status(202).json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "error", error: error.message
        })

    }

})




app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
});