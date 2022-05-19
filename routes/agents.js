const express = require('express')
const router = express.Router()
const Agent = require('./models/agent')

router.get('/', async (req, res) => {
    try{
        const agents = await Agent.find()
        res.json(agents) 
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getAgent, (req, res) => {
    res.json(res.agent)
})

router.post('/', async (req, res) => {
    const agent = new Agent({
        name: req.body.name,
        role: req.body.role,
    })
    try{
        const newAgent = await agent.save()
        res.status(201).json(newAgent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

router.patch('/:id', getAgent, async (req, res) => {
    if (req.body.name != null){
        res.agent.name = req.body.name
    }
    if (req.body.role != null){
        res.agent.role = req.body.role
    }
    try{
        const updatedAgent = await res.agent.save()
        res.json(updatedAgent)
    } catch (err) {
        res.status(400).json({ message: err.message })

    }
 })

router.delete('/:id', getAgent, async (req, res) => {
    try{
        await res.agent.remove()
        res.json({ message: 'Deleted Agent' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getAgent(req, res, next) {
    let agent
    try{
        agent = await Agent.findById(req.params.id)
        if (agent == null) {
            return res.status(404).json({ message: 'Can not find agent' })
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
    res.agent = agent
    next()
}

module.exports = router