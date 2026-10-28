const { pgTable, serial, varchar, boolean } = require("drizzle-orm/pg-core");

const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  completed: boolean("completed").default(false),
});

module.exports = { tasks };
