const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/completion', async(req, res) => {
    const { prompt } = req.body;
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          });
        res.json({ completion: response.choices[0].text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
  });