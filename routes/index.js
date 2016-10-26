var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage= multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'views/uploads/');
    },

    filename: function (req,file,cb) {
        console.log(req);
        cb(null,Date.now()+file.originalname);
    }
});

var upload = multer({storage: storage});

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


router.post('/apply',upload.any(),function(req, res, next) {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(req.body.name);
    console.log(req.body.lname);
    console.log(req.body.tel);
    console.log(req.body.email);
    console.log(req.body.addr);
    console.log(req.body.comment);
    console.log(req.body.gridRadios);

    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    //res.render(res);
    res.render('apply');

    res.send(req.files);


});

module.exports = router;
