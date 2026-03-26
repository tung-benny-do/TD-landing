const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.CUSTOM_OPENAI_API_KEY, 
  baseURL: "https://9router.vuhai.io.vn/v1"
});

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { userMessage } = req.body;
    
    const response = await openai.chat.completions.create({
      model: "ces-chatbot-gpt-5.4",
      messages: [
        { role: "system", content: "You are a highly skilled financial analytics bot guiding retail investors. You must speak in Vietnamese if asked." },
        { role: "user", content: userMessage || "Hello" }
      ],
      temperature: 0.7
    });

    const botReply = response.choices[0].message.content;
    return res.status(200).json({ reply: botReply });
    
  } catch (error) {
    console.error("Lỗi từ API LLM:", error.message);
    return res.status(500).json({ error: "Sorry, I am unable to reply at this time." });
  }
};
