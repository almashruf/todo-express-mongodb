import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import { Todo } from "./models/todo.model.js";
dotenv.config();
const app = express();
const port = process.env.port || 4000;

//middleware
app.use(express.json());

connectToDB();

//todo apis

app.get("/todos", async (req, res) => {
  try {
    const result = await Todo.find();
    res.json({
      success: true,
      message: "Todo Lists Retreived Successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed To Retreive",
    });
  }
});

app.post("/create", async (req, res) => {
  const todoDetails = req.body;
  try {
    const result = await Todo.create(todoDetails);
    res.json({
      success: true,
      message: "Todo is Created Successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to create todo",
    });
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Todo.findById(id);

    res.json({
      success: true,
      message: "Todo is retrieved successfully",
      data: result,
    });
  } catch {
    res.json({
      success: false,
      message: "Failed to retrieve Todo ",
      data: result,
    });
  }
});

app.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedTodo = req.body;
  try {
    const result = await Todo.findByIdAndUpdate(id, updatedTodo, {
      new: true,
    });
    res.json({
      success: true,
      message: "Todo is updated sucessfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "failed to update the todo",
      data: result,
    });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "todo is deleted succesfully",
      data: null,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "failed to delete",
      data: null,
    });
  }
});

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
