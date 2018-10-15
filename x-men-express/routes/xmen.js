const express = require('express');
const router = express.Router();
const xMenService = require('../services/x-men-service')

/**
 * Return all X-Men, if a name is supplied as a query parameter
 * Will return a list of X-Men with that name
 */
router.get('/', function(req, res, next) {
    if (req.query.name) {
        res.send(xMenService.getAllXmenFilteredByName(req.query.name))
    }
    else res.send(xMenService.getAllXmen());
});

/**
 * Returns the requested X-Man if found
 * Otherwise returns a 404
 */
router.get('/:id', function(req, res, next) {
    const xMan = xMenService.getXMan(req.params.id)
    if(xMan)
        res.send(xMan)
    else {
        res.status(404)
        res.send(`Could not find X-Man with id: ${req.params.id}`)
    }
});

/**
 * An example to show middleware and chaining next
 * function
 */
router.post('/', function (req, res, next) {
    console.log(req.body)
    next()
});


/**
 * Creates the X-Man in the Service
 * Returns the X-Man with an assigned id
 */
router.post('/', function (req, res, next){
    res.format({
        json: () => {
            res.send(xMenService.addXMan(req.body))
        },
        text: () => {
            const xMan = xMenService.addXMan(req.body)
            res.send(`id: ${xMan.id} \nname:${xMan.name}`)
        }
    })
    
});

/**
 * Edits the Xman at the given id
 * Returns a 404 if X-Man is not found
 */
router.put('/:id', function (req, res, next){
    const xMan = xMenService.updateXMan(req.params.id, req.body)
    if(xMan)
        res.send(xMan)
    else {
        res.status(404)
        res.send(`Could not find X-Man with id: ${req.params.id} to update`)
    }
});

/**
 * Deletes the X-Man with the assigned id
 */
router.delete('/:id', function (req, res, next){
    const result = xMenService.deleteXMan(req.param('id'))
    if(result){
        res.status(204)
        res.send()
    }
    else {
        res.status(404)
        res.send(`Could not find X-Man with id: ${req.params.id} to delete`)
    }
});

module.exports = router;