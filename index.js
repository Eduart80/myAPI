const Joi = require("joi"); //Joi V.13.1.0
const express = require("express");
const func = require("joi/lib/types/func");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

// app.get()
// app.post()
// app.put()
// app.delete()

const courses = [
  { id: 1, name: "loni-1" },
  { id: 2, name: "loni-2" },
  { id: 3, name: "loni-3" },
  { id: 4, name: "loni-4" },
];

// GET all
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
//get by id
app.get("/api/courses/:id", (req, res) => {
  //res.send(req.params); //params for rquired/essencial values
  //res.send(req.query); //query to provide additional data
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("ID was not found.");
  res.send(course);
});

//POST
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

//PUT
app.put("/api/courses/:id", (req, res) => {
  //look for course
  //if not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("ID was not found.");
  //validate
  //if invalid, return 400 Bad request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update
  course.name = req.body.name;
  //return update status
  res.send(course);
});
//DELETE
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("ID was not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send("OK");
});
///////////
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(2).required(),
  };
  return Joi.validate(course, schema);
}
///////////////
//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listenig on port ${port}...`));
//assign the port manualy by using (export PORT=4000)

//for Joi V.17
// const schema = Joi.object({
//   name: Joi.string().min(2).required(),
//   email: Joi.string().min(3).required(),
//   city: Joi.string().min(3).required(),
// });

// const validate = schema.validate(req.body);
