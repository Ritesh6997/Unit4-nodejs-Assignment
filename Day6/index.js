const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

const connect = () => {
  return mongoose.connect(
    'mongodb+srv://Ritesh6997:Ritesh6997@cluster0.9cfqh.mongodb.net/practice_test?retryWrites=true&w=majority',
  )
}

// USER SCHEMA
// Step 1 :- creating the schema
const sectionSchema = new mongoose.Schema(
  {
    sectiionName: { type: String, required: true },
    booksId: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true },
    ],
  },
  {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
  },
)

// ?Step 2 : creating the model
const Section = mongoose.model('section', sectionSchema) // book => section

// POST SCHEMA
// Step 1 :- creating the schema
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'section',
      required: true,
    },
    authorId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author',
        required: true,
      },
    ],
    checkedout: { type: String },
    checkedin: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
  },
)

// // Step 2 :- creating the model
const Book = mongoose.model('book', bookSchema) // post => posts

// COMMENT Schema
// Step 1 :- creating the schema
const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bookId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        required: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

// Step 2 :- creating the model
const Author = mongoose.model('author', authorSchema)

// CRUD OPERATIONS
// get => getting data from the server
// post => adding data to the server
// put / patch => updating data in the server
// delete => deleting data from the server

// section CRUD
app.get('/section', async (req, res) => {
  try {
    const section = await Section.find().lean().exec()
    return res.status(200).send({ section: section }) // []
  } catch (err) {
    return res
      .status(500)
      .send({ message: 'Something went wrong .. try again later' })
  }
})

app.post('/section', async (req, res) => {
  try {
    const section = await Section.create(req.body)
    return res.status(201).send(section)
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }
})

// body => req.body
// url => req.params
// query string => req.query

app.get('/section/:id', async (req, res) => {
  try {
    const section = await Section.findById(req.params.id)
      .populate({
        path: 'booksId',
        select: { title: 1, _id: 0 },
      })  
      .lean()
      .exec()
    // db.section.findOne({_id: Object('622893471b0065f917d24a38')})

    return res.status(200).send(section)
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }
})

app.patch('/section/:id', async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec()
    console.log(req.body)
    // db.section.update({_id: Object('622893471b0065f917d24a38')}, {$set: {req.body}})

    return res.status(200).send(section)
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }
})

app.delete('/section/:id', async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id)
    // db.section.deleteOne({_id: Object('622893471b0065f917d24a38')})

    return res.status(200).send(section)
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }
})
//author curd
app.get('/author', async (req, res) => {
  try {
    const author = await Author.find().lean().exec()
    return res.status(200).send(author)
  } catch (error) {
    return res.status(500).send({ message: err.message })
  }
})
app.post('/author', async (req, res) => {
  try {
    const author = await Author.create(req.body)
    res.status(201).send(author)
  } catch (error) {
    return res.status(500).send({ message: err.message })
  }
})
app.get('/author/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
      .populate({
        path: 'bookId',
        select: { title: 1, _id: 0 },
      })
      .lean()
      .exec()
    return res.status(200).send(author)
  } catch (error) {
    return res.status(500).send({ message: err.message })
  }
})

app.get('/author/:id/:id2', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
      .populate({
        path: 'bookId',
        select: { title: 1, _id: 1 },
        populate: { path: 'sectionId', select: { sectiionName: 1, _id: 1 } },
      })
      .lean()
      .exec()
    let ans = await check(author)

    async function check(author) {
      arr = []
      let arr_books = await author.bookId
      for (let i = 0; i < arr_books.length; i++) {
        if (arr_books[i].sectionId._id == req.params.id2) {
          arr.push(arr_books[i].title)
        }
      }
      return arr
    }

    return res.status(200).send(ans)
  } catch (error) {
    return res.status(500).send({ message: err.message })
  }
})

app.patch('/author/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.body, {
      new: true,
    })
      .lean()
      .exec()
    return res.status(200).send(author)
  } catch (error) {
    return res.status(500).send({ message: err.message })
  }
})
app.delete('/author/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id)
    return res.status(200).send(author)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
})

// CURD BOOK
app.get('/book', async (req, res) => {
  try {
    const book = await Book.find().lean().exec()
    return res.status(200).send(book)
  } catch (error) {
    return res.status(500).send({ message: err.message })
  }
})
app.post('/book', async (req, res) => {
  try {
    const book = await Book.create(req.body)
    let section1 = await Section.findById(req.body.sectionId)

    section1.booksId.push(book._id)
    let section = await Section.findByIdAndUpdate(
      req.body.sectionId,
      section1,
      {
        new: true,
      },
    )
    let author1 = await Author.find({ _id: req.body.authorId })
    for (let i = 0; i < author1.length; i++) {
      author1[i].bookId.push(book._id)
      await author1[i].save()
      // let section = await Section.findByIdAndUpdate(req.body.authorId[i], author1[i],{
      //   new: true,
      // });
    }
    console.log(author1)
    // let author = await Author.updateMany({"_id":req.body.authorId},  {$set:{"bookId":author1}} );
    // console.log(req.body);
    res.status(201).send(book)
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
})
app.get('/book/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate({
        path: 'authorId',
        select: { name: 1, _id: 0 },
      })
      .lean()
      .exec()
    return res.status(200).send(book)
  } catch (error) {
    return res.status(500).send({ message: err.message })
  }
})
app.patch('/book/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.body, {
      new: true,
    })
      .lean()
      .exec()
    return res.status(200).send(book)
  } catch (error) {
    return res.status(500).send({ message: err.message })
  }
})
app.delete('/book/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    return res.status(200).send(book)
  } catch (error) {
    return res.status(500).send({ message: err.message })
  }
})

app.listen(5000, async () => {
  try {
    await connect()
  } catch (err) {
    console.log(err)
  }

  console.log('listening on port 5000')
})
