const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/', (req, res) => {
    res.render('student/addOrEdit', {
        viewTitle: 'Insert Student'
    })
});

router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertRecord(req, res)
    } else {
        updateRecord(req, res)
    }
});

function insertRecord(req, res) {
    const student = new Student({
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city
    });
    student.save()
        .then(doc => {
            res.redirect('student/list');
        })
        .catch(err => {
            console.log("Error during insertion " + err)
        })
}

function updateRecord(req, res) {
    Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
        .then(doc => {
            if (doc) {
                res.redirect('student/list');
            } else {
                console.log('No student found with that ID.');
            }
        })
        .catch(err => {
            console.log('Error during update: ' + err);
        });
}


router.get('/list', (req, res) => {
    Student.find()
        .then(docs => {
            res.render('student/list', {
                list: docs
            });
        })
        .catch(err => {
            console.log('Error in retrieval: ' + err);
        });
});

router.get('/:id', (req, res) => {
    Student.findById(req.params.id)
        .then(doc => {
            if (doc) {
                res.render('student/addOrEdit', {
                    viewTitle: 'Update Student',
                    student: doc
                });
                console.log(doc);
            } else {
                console.log('No student found with that ID.');
            }
        })
        .catch(err => {
            console.log('Error in finding student by ID: ' + err);
        });
});



router.get('/delete/:id', (req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(doc => {
            if (doc) {
                res.redirect('/student/list');
            } else {
                console.log('No student found with that ID.');
                res.redirect('/student/list');
            }
        })
        .catch(err => {
            console.log('Error in deletion: ' + err);
        });
});


module.exports = router