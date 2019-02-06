const express = require('express')
const databaseConnection = require('../Utils/DatabaseUtil')
const router = express.Router()
router.use(express.json())
const Joi = require('joi')
const validation = require('../Utils/ValidationUtil')
const setHeaders = require('../Utils/CORSUtil')

router.get('/api/countries', setHeaders, (req, res) => {
    databaseConnection.query('SELECT * FROM country', (err, rows, fields) => {
        if (!err) {
            res.send(rows)
            return
        } else {
            res.send(err)
            return
        }
    });
})

router.get('/api/country/:id', setHeaders, validation.validateId, (req, res) => {
    // const schema = {
    //     id: Joi.number().required()
    // };
    // const result = Joi.validate(req.params, schema)
    // if (result.error) {
    //     res.status(400).send(result.error.details)
    //     return;
    // }

    databaseConnection.query('SELECT * FROM country WHERE id=?', req.params.id, (err, rows, fields) => {
        if (!err) {
            if (rows.length == 0) {
                res.json({ message: "can't find you are looking for" })
                return
            }
            res.send(rows)
            return
        } else {
            res.send(err)
            return
        }
    });
})

router.post('/api/savecountry', setHeaders, validation.validateCountry, (req, res) => {
    /*console.log(req.body);
    let post = {
        id: 243,
        country_name: 'mycountry2',
        saarc_status: 'NO',
        created_by_user: 1,
        modified_by_user: 1,
        creation_time: '12-12-12',
        modification_time: '12-12-12'
    }
    console.log(post);*/

    /*
    const schema = {
        id: Joi.number().required(),
        country_name: Joi.string().required(),
        saarc_status: Joi.string().required(),
        created_by_user: Joi.number().required(),
        modified_by_user: Joi.number().required(),
        creation_time: Joi.date().required(),
        modification_time: Joi.date().required()
    };
    const result = Joi.validate(req.body, schema)
    if (result.error) {
        res.status(400).send(result.error.details)
        return;
    }
    */

    let query = 'INSERT INTO country SET ?';
    databaseConnection.query(query, req.body, (err, result) => {
        if (err) {
            res.json({
                message: 'Error occurred while saving the record',
                result: err
            });
            return
        }else{
            res.json({
                message: 'The record saved successfully',
                result: result
            });
            return
        }
    })
})

router.post('/api/updatecountry', setHeaders, (req, res)=>{
    /*let post = {
        id: 242,
        country_name: 'mycountrymachan2',
        saarc_status: 'NO',
        created_by_user: 1,
        modified_by_user: 1,
        creation_time: '12-12-12',
        modification_time: '12-12-12'
    }*/
    let query = 'UPDATE country SET ? WHERE id =' + req.body.id
    databaseConnection.query(query, req.body, (err, result) => {
        if (err) {
            res.json({
                message: 'Error occurred while updating the record',
                result: err
            });
            return
        }else{
            res.json({
                message: 'The record updated successfully',
                result: result
            });
            return
        }
    })
})

router.get('/api/deletecountry/:id', setHeaders, validation.validateId, (req, res)=>{
    // const schema = {
    //     id: Joi.number().required()
    // };
    // const result = Joi.validate(req.params, schema)
    // if (result.error) {
    //     res.status(400).send(result.error.details)
    //     return;
    // }

    databaseConnection.query('SELECT * FROM country WHERE id=?', req.params.id, (err, rows, fields) => {
        if (!err) {
            if (rows.length == 0) {
                res.json({ message: "can't find what you are trying to delete" })
                return
            }else{
                databaseConnection.query('DELETE FROM country WHERE id=?', req.params.id, (err, result)=>{
                    if(!err){
                        res.json({
                            message: 'The record deleted successfully',
                            result: result
                        });
                        return   
                    }else{
                        res.json({
                            message: 'Error occurred while deleting the record',
                            result: err
                        });
                        return
                    }
                })
            }
        } else {
            res.send(err)
            return
        }
    });
})

module.exports = router

