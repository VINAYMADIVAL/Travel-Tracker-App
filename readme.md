# Travel Tracker App

A simple Express.js application with PostgreSQL back-end, fully hosted on Render.

---

## 🚀 Live Demo

Visit the app: `[https://travel-tracker-app-1mty.onrender.com/]`

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Local Setup](#local-setup)
5. [Database Setup](#database-setup)
6. [Deployment on Render](#deployment-on-render)
7. [Environment Variables](#environment-variables)
8. [Future Improvements](#future-improvements)
9. [Security](#security)

---

## Project Overview

**Travel Tracker** allows users to log and view visited countries. Built with Express.js, EJS, and PostgreSQL, it provides a server-side rendered interface with dynamic data querying.

---

## Features

- 📝 Log visited countries per user
- 🌐 Search country names (partial match)
- 🖥️ Server-rendered UI with EJS templates
- 🚀 Hosted serverless on Render

---

## Prerequisites

- Node.js v14+
- PostgreSQL (local) for development
- Render CLI (optional)

---

## Local Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/travel-tracker.git
   cd travel-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```env
   DATABASE_URL=postgres://user:pass@localhost:5432/dbname
   ```
4. Run locally:
   ```bash
   npm start
   ```
5. View at [http://localhost:3000](http://localhost:3000)

---

## Database Setup

Follow these detailed steps to provision and initialize your PostgreSQL database using Render:

1. **Create the database on Render**  
   - In the Render dashboard, click **New → Database** and choose **PostgreSQL**.  
   - Select the **Free Plan**, pick your region, and enter a name (e.g. `travel-tracker-db`).  
   - Click **Create Database** to provision your instance.

2. **Retrieve the connection URL**  
   - Once the database is ready, click your database in the sidebar.  
   - Go to the **Connect** tab.  
   - Copy the **External Database URL** (for local CLI/GUI connections).  
   - Copy the **Internal Database URL** (for your Render web service).

3. **Connect locally with `psql`**  
   ```bash
   psql "postgres://user:password@host:port/dbname"

- When prompted, enter your database name,username, and password from the URL.

4. **Load your schema** `(queries.sql)`
At the `psql` prompt:

```sql
\i /full/path/to/queries.sql
```
- This creates countries, users, visited_countries tables and seeds demo data.

5. **Import** `countries.csv`
Still in the `psql` session:

```sql
\copy countries(country_code, country_name)
   FROM '/full/path/to/countries.csv'
   DELIMITER ',' CSV HEADER;
```
- Replace /full/path/to/countries.csv with your actual CSV path.

6. **Verify your data**

```sql
SELECT * FROM countries LIMIt 9;
SELECT * FROM visited_countriess
SELECT * FROM users;
```
---

## Deployment on Render

1. Push your code to GitHub.
2. Go to Render dashboard and create a **Web Service**.
3. Connect your GitHub repo.
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `node index.js`
6. Add **Environment Variable**:
   ```bash
   DATABASE_URL=postgres://<user>:<pass>@<host>:5432/<dbname>
   ```
7. Deploy and obtain your Render URL.

---

## Environment Variables

| Key            | Description                         |
|----------------|-------------------------------------|
| `DATABASE_URL` | Connection string for PostgreSQL  (Internal Database URL)  |

---

## Future Improvements

- 🌟 Sort visits by date
- 🔐 Add user authentication
- 🗑️ Delete visits if enetered mistakenly
- 🤗 Lokking forward for ur suggestions

---

## Security

- Credentials stored in environment variables
- Database only accessible internally via Render
- No secrets exposed to the frontend

---

