# Drizzle Demo

A beginner-friendly backend project demonstrating how to connect a PostgreSQL database with Node.js using Drizzle ORM and Docker.

## 📌 About the Project

Drizzle Demo is a backend learning project created to understand database operations using PostgreSQL and Drizzle ORM.

This project helps demonstrate how a backend application can connect to a database, create tables, manage database schemas, and perform database operations.

## 🚀 Technologies Used

- **Node.js** — JavaScript runtime for running backend code.
- **PostgreSQL** — Relational database for storing data.
- **Drizzle ORM** — TypeScript-first ORM for working with databases.
- **Docker** — Runs PostgreSQL inside a container.
- **Drizzle Kit** — Manages database schema changes and migrations.
- **Git & GitHub** — Used for version control and project hosting.

## ✨ Features

- PostgreSQL database integration.
- Database management using Drizzle ORM.
- Database schema definition.
- Migration generation using Drizzle Kit.
- Database migrations.
- PostgreSQL setup using Docker.
- Backend development practice.

## 📁 Project Structure

The project structure look like this:

```text
drizzle-demo/
├── index.js
│── schema.js
│── server.js 
├── drizzle/
├── drizzle.config.js
├── docker-compose.yml
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 🛠️ Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Shivani12singh/drizzle-demo.git
```

### Step 2: Navigate to the Project Folder

```bash
cd drizzle-demo
```

### Step 3: Install Dependencies

```bash
npm install
```

This command installs the packages listed in `package.json`.


Replace `your_password` with your PostgreSQL password and update the database name, username, and port to match your configuration.

**Important:** Never upload your real database password or other secrets to GitHub.

### Step 5: Start PostgreSQL with Docker

If your project contains a `docker-compose.yml` file configured for PostgreSQL, run:

```bash
docker compose up -d
```

Check the running containers:

```bash
docker ps
```

### Step 6: Generate Database Migrations

```bash
npm run db:generate
```

This generates migration files based on the database schema configured for Drizzle Kit.

### Step 7: Run Database Migrations

```bash
npm run db:migrate
```

This applies the generated migrations to your PostgreSQL database.

**Note:** These commands work when the corresponding scripts exist in `package.json` and your database connection is configured correctly.

## 🗄️ Database

This project uses PostgreSQL to store structured data.

Drizzle ORM helps define and query database tables using JavaScript or TypeScript.

The database connection is configured through environment variables, such as `DATABASE_URL`.

## 📚 What I Learned

Through this project, I am practicing:

- Backend development with Node.js.
- PostgreSQL database configuration.
- Running databases with Docker.
- Connecting applications to PostgreSQL.
- Defining database schemas with Drizzle ORM.
- Generating and running database migrations.
- Managing project versions with Git and GitHub.

## 🔒 Security

- Keep `.env` out of version control.
- Never commit passwords, API keys, or database credentials.
- Use environment variables to configure database connections.
- Do not expose database credentials in public repositories.

## 👩‍💻 Author

**Shivani Singh**

GitHub: [Shivani12singh](https://github.com/Shivani12singh)

## 📄 License

This project is intended for learning and practice. 