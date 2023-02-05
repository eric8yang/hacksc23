require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
const express = require('express');
// const cors = require('cors');

const app = express();

// app.use(cors());
app.use(express.json());

app.post("/api/summarize", async (req, res) => {
  console.log(req.body)
  const transcript = req.body.transcript + '.';

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Summarize this conversation using bullet points: \n" + transcript,
    temperature: 0,
    max_tokens: 2048,
  });
  console.log(response.data.choices)
  res.send(response.data.choices[0].text)
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});