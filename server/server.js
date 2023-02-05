const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/summarize", async (req, res) => {
  console.log(req.body)
  const transcript = req.body.transcript + '.';

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "summarize: \n" + transcript,
    temperature: 0,
    max_tokens: 60,
  });
  console.log(response.data.choices)
  res.send(response.data.choices[0].text)
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});