import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const randomNumber = function(drinksArray) {
  console.log(drinksArray);
  const randomIndex = Math.floor(Math.random() * drinksArray.length);
  return randomIndex;
}

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/drink-by-name", async (req, res) => {
    const drinkName = req.body.drinkName;
    try {
      //console.log(API_URL + drinkName);
      const result = await axios.get(API_URL + drinkName);

    const randomDrinkIndex = randomNumber(result.data.drinks);
    res.render("index.ejs", {
      drinkName: result.data.drinks[randomDrinkIndex].strDrink,
      howToMake: result.data.drinks[randomDrinkIndex].strInstructions
    });

    // res.render("index.ejs", {
    //      drinkName: JSON.stringify(result.data.drinks[randomDrinkIndex].strDrink),
    //      howToMake: JSON.stringify(result.data.drinks[randomDrinkIndex].strInstructions)
    //      });
    } catch (error) {
      res.render("index.ejs", {
        error: "Drink not found. Please try another name."
      });
    }
 });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });