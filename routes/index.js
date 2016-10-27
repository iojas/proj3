var express = require('express');
var router = express.Router();
var multer = require('multer');
var mysql = require('mysql');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/apply', function(req, res, next) {
    res.render('apply');
});

router.get('/maliSamaj', function(req, res, next) {
    res.render('maliSamaj');
});

router.get('/About', function(req, res, next) {
  res.render('About', { title: 'Express' });
});




//for listing all files.
router.get('/allFiles', function(req, res, next) {

    const testFolder = 'views/uploads/';
    const fs = require('fs');
    var fi=[];
    fs.readdir(testFolder, (err, files) => {

        files.forEach(file => {
            console.log(file);

            fi.push(file);

        })
        console.log(fi);
        res.render('allFiles',{ fila:fi});


    })


});


///for downloading file
router.get('/views/uploads/:file(*)', function(req, res, next){
    var file = req.params.file;
    var temp=__dirname;
    var temp2=temp.substring(0,temp.length-7);
    var path = temp2 + '/views/uploads/' + file;
    //console.log(path);
    res.download(path);
});

var storage= multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'views/uploads/');
    },

    filename: function (req,file,cb) {
        //console.log("ooooooooooo");
        console.log(req.body.name);

        cb(null,Date.now()+req.body.name+req.body.lname+file.originalname);
    }
});

var upload = multer({storage: storage});
router.post('/apply',upload.any(),function(req, res, next) {
    var connection = mysql.createConnection({
        host: 'malisamaj1.crwqdxb9dkgh.us-west-2.rds.amazonaws.com',
        user: 'malisamaj',
        password: 'malisamaj',
        database: 'ojas'
    })

    connection.connect(function(err) {
        if (err) throw err
        console.log('You are now connected...');
        if(req.body.name=="" || req.body.lname=="" || req.body.tel=="" || req.body.addr=="" || req.body.gridRadios=="" || req.body.comment==""){
            console.log("Invalid Data");
        }else{
            connection.query('insert into applicant (name, lname, telephone, email, address, catagory, comments) values (?,?,?,?,?,?,?)',
                [req.body.name,req.body.lname,req.body.tel,req.body.email,req.body.addr,req.body.gridRadios,req.body.comment],
                function(err, result) {
                    if (err) throw err
                    console.log("added data successfully");
                })
        }



    })

    res.render('apply');
    res.send(req.files);


});

module.exports = router;
