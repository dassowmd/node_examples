
const express = require('express');
const router = express.Router()

const courses = [
    {id: 1, name:'course1'},
    {id: 2, name:'course2'},
    {id: 3, name:'course3'},
]
router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Course not found')
    res.send(course);
});

router.post('/', (req, res) => {
    const result = validateCourse(req.body)
    if (result.error) {
        return res.status(400).send(result.error)
    }
    const course = {
        id: courses.length + 1, name: req.body.name
    }
    courses.push(course);
    res.send(course)
});

router.put('/:id', (req, res) => {    
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Course not found')

    const result = validateCourse(req.body)
    if (result.error) {
        return res.status(400).send(result.error)
    }

    course.name = req.body.name;
    res.send(course)
})

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Course not found')
    courses.splice(courses.indexOf(course), 1)
    res.send(`Deleted course id: ${course.id}`);
})

module.exports = router;