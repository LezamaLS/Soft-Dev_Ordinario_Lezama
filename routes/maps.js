const express = require('express')
const router = express.Router()
const Map = require('./models/map')

router.get('/', async (req, res) => {
    try{
        const maps = await Map.find()
        res.json(maps) 
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getMap, (req, res) => {
    res.json(res.map)
})

router.post('/', async (req, res) => {
    const map = new Map({
        name: req.body.name,
        sites: req.body.sites,
    })
    try{
        const newMap = await map.save()
        res.status(201).json(newMap)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

router.patch('/:id', getMap, async (req, res) => {
    if (req.body.name != null){
        res.map.name = req.body.name
    }
    if (req.body.sites != null){
        res.map.sites = req.body.sites
    }
    try{
        const uptdatedMap = await res.map.save()
        res.json(uptdatedMap)
    } catch (err) {
        res.status(400).json({ message: err.message })

    }
 })

router.delete('/:id', getMap, async (req, res) => {
    try{
        await res.map.remove()
        res.json({ message: 'Deleted Map' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getMap(req, res, next) {
    let map
    try{
        map = await Map.findById(req.params.id)
        if (map == null) {
            return res.status(404).json({ message: 'Can not find map' })
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
    res.map = map
    next()
}

module.exports = router