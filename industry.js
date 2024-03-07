const express = require("express");
const router = new express.Router();
const db = require("./db");
const ExpressError = require("./expressError");


router.post('/indistries', async (req, res, next) => {
try{
    const {name, indus} = req.body
    const creatIndus = await db.query(`INSERT INTO biztimedb (name, indus) VALUES ($1, $2) RETURNIN id, code, name, indus`, [id, code, name, indus]);
    return res.status(201).json(creatIndus[0])

} catch(err){
    
    return next(error)
}
});

router.get('/industries', async (req, res, next) => {
    try{
        const getAllIndus = await db.query(`SELECT * FROM industries`)
        return res.status(201).json(getAllIndus.rows);

    } catch(error){

        return next(error)
    }
})