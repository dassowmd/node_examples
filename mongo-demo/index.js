const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:db')

// To turn on debugging set an env variable DEBUG=app:db

mongoose.connect('mongodb://localhost/playground')
    .then(() => dbDebugger('Connected to mongodb'))
    .catch(err => dbDebugger('Could not connect to mongodb', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type:Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

const course = new Course({
    name: 'Django Course',
    author: 'Mel',
    tags: ['Python', 'backend '],
    isPublished: true
});

async function createCourse(course)
    {
        dbDebugger('Starting createCourse')
        const result = await course.save();
        console.log(result);
    }
// createCourse(course)

// getCourses();

async function getCourses(){
    dbDebugger('Starting getCourses')
    // Comparison operators
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    const courses = await Course
        // .find({author:'Matt', isPublished: true})
        // .find({price: { $gt: 10}, $lte: 20}) // Greater than 10, less than or equal to 20
        // .find({ price: {$in: [10,15,20]}}) // Price in array

        // // logical operators
        // .find()
        // // .or([{'author':'Matt'}, {isPublished: true}])
        // .and([{'author':'Matt'}, {isPublished: true}])

        // //regex
        // // Starts with Ma
        // .find({author: /^Ma/})
        //
        // // Ends with tt
        // .find({author: /tt$/})

        // Contains 'at'
        .find({author: /.*at.*/i}) // i means case insensitive, can be used on all regex queries

        .limit(10)
        .sort({name:1})
        .select({name: 1, tags: 1}) // columns to select

        .count() // Would not use with limit, sort and select above

    console.log(courses)
}

// paginatedCourses(1, 10)
//     .then(courses => console.log(courses))

async function paginatedCourses(pageNumber, pageSize){
    dbDebugger('Starting paginatedCourses')
    const courses = await Course
        .find({author:'Matt', isPublished:true})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({name:1, tags:1})
        // .select({name: 1, tags: 1}); // columns to select
    return courses

}

async function updateCourse(id){
    dbDebugger('Starting updateCourse')
    const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true
    course.author = 'Another author'

    const result = await course.save();
    console.log(result)
};

updateCourse('5b1f3a2af7d9c3312c711a87');