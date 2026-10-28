
require("dotenv").config();

const { drizzle } = require("drizzle-orm/node-postgres");
const { eq } = require("drizzle-orm");
const { tasks } = require("./schema");

const db = drizzle(process.env.DATABASE_URL);

async function main() {
  try {
    // Insert a new task
    const insertedTasks = await db
      .insert(tasks)
      .values({
        title: "Learn Docker and Drizzle ORM",
      })
      .returning();

    console.log("Task inserted successfully:");
    console.log(insertedTasks);

    // Read all tasks
    const allTasks = await db.select().from(tasks);

    console.log("All tasks:");
    console.log(allTasks);

    // Mark the inserted task as completed
    const updatedTasks = await db
      .update(tasks)
      .set({ completed: true })
      .where(eq(tasks.id, insertedTasks[0].id))
      .returning();

    console.log("Updated task:");
    console.log(updatedTasks);
  } catch (error) {
    console.error("Database error:", error);
  } finally {
    await db.$client.end();
  }
}

main();

