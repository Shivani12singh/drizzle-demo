require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");
const { eq } = require("drizzle-orm");
const { tasks } = require("./schema");

const app = express();
const PORT = 3000;

// Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Connect Drizzle ORM to the PostgreSQL connection pool
const db = drizzle(pool);

// Middleware
app.use(cors());
app.use(express.json());

// Home route: check whether the API is running
app.get("/", (req, res) => {
  res.json({
    message: "To-Do List API is running successfully!",
  });
});

// 1. CREATE a new task
app.post("/api/tasks", async (req, res) => {
  try {
    const { title } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        error: "Please provide a valid task title.",
      });
    }

    const newTask = await db
      .insert(tasks)
      .values({
        title: title.trim(),
      })
      .returning();

    res.status(201).json({
      message: "Task created successfully!",
      task: newTask[0],
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ error: "Failed to create task." });
  }
});

// 2. READ all tasks, with an optional completed filter
app.get("/api/tasks", async (req, res) => {
  try {
    const { completed } = req.query;

    let allTasks;

    if (completed === "true" || completed === "false") {
      allTasks = await db
        .select()
        .from(tasks)
        .where(eq(tasks.completed, completed === "true"));
    } else {
      allTasks = await db.select().from(tasks);
    }

    res.json(allTasks);
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ error: "Failed to retrieve tasks." });
  }
});

// 3. READ one task by ID
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Invalid task ID." });
    }

    const result = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, id));

    if (result.length === 0) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Get task error:", error);
    res.status(500).json({ error: "Failed to retrieve task." });
  }
});

// 4. UPDATE a task
app.patch("/api/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Invalid task ID." });
    }

    const updates = {};

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          error: "Title must be a non-empty string.",
        });
      }

      updates.title = title.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({
          error: "Completed must be true or false.",
        });
      }

      updates.completed = completed;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        error: "Provide a title or completed value to update.",
      });
    }

    const updatedTask = await db
      .update(tasks)
      .set(updates)
      .where(eq(tasks.id, id))
      .returning();

    if (updatedTask.length === 0) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.json({
      message: "Task updated successfully!",
      task: updatedTask[0],
    });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ error: "Failed to update task." });
  }
});

// 5. DELETE a task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Invalid task ID." });
    }

    const deletedTask = await db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();

    if (deletedTask.length === 0) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.json({
      message: "Task deleted successfully!",
      task: deletedTask[0],
    });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ error: "Failed to delete task." });
  }
});

// Start the server after checking the database connection
async function startServer() {
  try {
    await pool.query("SELECT 1");

    app.listen(PORT, () => {
      console.log(`To-Do List API running at http://localhost:${PORT}`);
      console.log("PostgreSQL database connected successfully!");
    });
  } catch (error) {
    console.error("Could not start the API:", error.message);
    await pool.end();
    process.exitCode = 1;
  }
}

startServer();
