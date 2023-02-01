const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 5000;

// set the uri value
const uri =
  "mongodb+srv://admin:password123.s1@cluster0.f2fwnlj.mongodb.net/?retryWrites=true&w=majority";

// connect to the uri
async function main() {
  await mongoose.connect(uri);
}

main()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
