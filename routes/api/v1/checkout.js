var express = require('express');
var router = express.Router();
var Request = require('request');

router.options('/iniciarTransacao', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
});

router.get('/iniciarTransacao', function (req, res, next) {
    var data = '......';
    var ulrServico = process.env.PagSeguroWS + 
                    "/sessions?email=" + process.env.PagSeguroEMail + 
                    "&token=" + process.env.PagSeguroAPIToken;
    Request.post({
        "headers": {"Content-Type": "application/x-www-form-urlencoded"},
        "url": ulrServico,
    }, (error, response, body) => {
        if (error) {
            res.send(error);
        }
        
        var parseString = require('xml2js').parseString;
        parseString(response.body, function (err, result) {
            data = result;
        });

        res.send(data);
    });
});

module.exports = router;