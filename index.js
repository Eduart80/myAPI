"use strict";
require("dotenv").config();
const Joi = require("joi"); //Joi V.13.1.0
const express = require("express");
const supertest = require("supertest");
const func = require("joi/lib/types/func");
const app = express();
const mongoose = require("mongoose");
const request = supertest("process.env.Link");

app.use(express.json());

const courses = [
  { id: 1, name: "loni-1" },
  { id: 2, name: "loni-2" },
  { id: 3, name: "loni-3" },
  { id: 4, name: "loni-4" },
];

app.get("/yahoo", async (req, res) => {
  res.send(res);
});

// app.get("get", (req, res) => {
//   res.send(courses);
// });

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("ID was not found.");
  res.send(course);
});

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

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("ID was not found.");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("ID was not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send("OK");
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(2).required(),
  };
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listenig on port ${port}...`));
