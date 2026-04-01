const mongoose = require("mongoose");
const Review = require("./models/Review");

mongoose.connect("mongodb+srv://gishmafuser:Gishmaf1234@gishmafcluster.xmycpic.mongodb.net/gishmaf?retryWrites=true&w=majority");

async function seed() {
  await Review.insertMany([
    {
      bookId: "book1",
      email: "alice@gmail.com",
      rating: 5,
      comment: "Absolutely loved this book!",
      verified: true,
    },
    {
      bookId: "book2",
      email: "mike@gmail.com",
      rating: 5,
      comment: "Changed my perspective completely.",
      verified: true,
    },
  ]);

  console.log("Seeded reviews");
  process.exit();
}

seed();