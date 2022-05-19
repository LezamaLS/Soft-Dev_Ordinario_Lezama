const express = require('express')
const router = express.Router()
const Weapon = require('./models/weapon')

router.get('/', async (req, res) => {
    try{
        const weapons = await Weapon.find()
        res.json(weapons) 
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getWeapon, (req, res) => {
    res.json(res.weapon)
})

router.post('/', async (req, res) => {
    const weapon = new Weapon({
        name: req.body.name,
        price: req.body.price,
        group: req.body.group,
        noise: req.body.noise
    })
    try{
        const newWeapon = await weapon.save()
        res.status(201).json(newWeapon)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

router.patch('/:id', getWeapon, async (req, res) => {
    if (req.body.name != null){
        res.weapon.name = req.body.name
    }
    if (req.body.price != null){
        res.weapon.price = req.body.price
    }
    if (req.body.group != null){
        res.weapon.group = req.body.group
    }
    if (req.body.noise != null){
        res.weapon.noise = req.body.noise
    }
    try{
        const updatedWeapon = await res.weapon.save()
        res.json(updatedWeapon)
    } catch (err) {
        res.status(400).json({ message: err.message })

    }
 })

router.delete('/:id', getWeapon, async (req, res) => {
    try{
        await res.weapon.remove()
        res.json({ message: 'Deleted Weapon' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getWeapon(req, res, next) {
    let weapon
    try{
        weapon = await Weapon.findById(req.params.id)
        if (weapon == null) {
            return res.status(404).json({ message: 'Can not find weapon' })
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
    res.weapon = weapon
    next()
}

module.exports = router