import express from "express"
import fetch from "node-fetch"
import oneLinerJoke from "one-liner-joke"

const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))

async function getMemes() {
  const url = "https://api.imgflip.com/get_memes"
  const response = await fetch(url)
  const data = await response.json()
  return data.data.memes
}

function getRandomJoke() {
  return oneLinerJoke.getRandomJoke().body
}

function getJokeOfTheDay() {
  return oneLinerJoke.getRandomJoke().body
}


app.get("/", (req, res) => {
  res.render("home")
})

app.get("/joke", (req, res) => {
  const joke = getRandomJoke()
  res.render("joke", { joke })
})

app.get("/meme", async (req, res) => {
  const memes = await getMemes()
  const random = memes[Math.floor(Math.random() * memes.length)]
  res.render("meme", { meme: random })
})

app.get("/jokeoftheday", (req, res) => {
  const joke = getJokeOfTheDay()
  res.render("jokeoftheday", { joke })
})

app.get("/about", (req, res) => {
  res.render("about")
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log("Server running on port " + port))
