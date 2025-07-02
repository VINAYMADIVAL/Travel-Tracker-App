import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import "dotenv/config";

const app = express();
const port = 3000;

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries where user_id=$1",[currentUserId]);
  const response = await db.query("SELECT * FROM users");
  let countries = [];
  let users = [];
  console.log(response.rows);
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  response.rows.forEach((user) => {
    users.push(user);
  });
  return [users,countries];
}
app.get("/", async (req, res) => {
  const [users,countries] = await checkVisisted();
  res.render("index.ejs",{
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
});
app.post("/add", async (req, res) => {

  try {
    const input = req.body.country;
    console.log(input);
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    console.log(typeof result.rows[0].country_code);
    const countryCode = result.rows[0].country_code;
    try {
      await db.query("INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",[countryCode,currentUserId]);
      res.redirect("/");
    } catch (err) {
      const [users,countries] = await checkVisisted();
      res.render("index.ejs",{
      countries: countries,
      total: countries.length,
      users: users,
      color: "teal",
      error: 'Country Already Visited, add new countries',
    });
    }
  } catch (err) {
      const [users,countries] = await checkVisisted();
      res.render("index.ejs",{
      countries: countries,
      total: countries.length,
      users: users,
      color: "teal",
      error: 'Country does not exist, try again',
    });
  }
});
app.post("/user", async (req, res) => {
  if(req.body.add === "new") {
    res.render("new.ejs");
  }
  else{
    currentUserId = parseInt(req.body.user);
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;
  await db.query("INSERT INTO users (name, color) VALUES ($1, $2)",[name, color]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
