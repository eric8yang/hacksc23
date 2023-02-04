const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/summarizedText", (req, res) => {
  const summarizedText = req.body.summarizedText;

  database.ref("summarizedTexts").push({
    text: summarizedText
  })
  .then(() => {
    res.send({ success: true });
  })
  .catch(error => {
    res.status(500).send({ error });
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});