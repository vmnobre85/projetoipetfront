const mongoose = require("mongoose");

require("dotenv").config();

mongoose.set("strictQuery", true);

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBCLUSTER}.mongodb.net/?retryWrites=true&w=majorit`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: {
        w: "majority",
        j: true,
        wtimeout: 1000,
      },
    }
  );
  console.log("Conectado com sucesso");
}

main().catch((err) => {
  console.log(err);
});

module.exports = main;
