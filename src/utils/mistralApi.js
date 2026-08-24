const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

export async function sendMistralChat({ apiKey, messages }) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error('Please enter your Mistral API Key to start chatting.');
  }

  const systemMessage = {
    role: 'system',
    content: `You are Link Value AI, a concise and helpful CS study assistant. 
Help students with:
1. Suggesting top-tier CS study links, docs, tutorials, and courses.
2. Explaining core computer science, algorithms, web development, AI/ML, and academic concepts clearly and concisely.
3. Providing clean roadmaps for semesters or subject domains.
Keep answers concise, clear, and well-formatted.`
  };

  const payload = {
    model: 'mistral-small-latest',
    messages: [systemMessage, ...messages],
    temperature: 0.7,
    max_tokens: 800
  };

  const response = await fetch(MISTRAL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey.trim()}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    let errorDetail = 'API request failed';
    try {
      const errJson = await response.json();
      errorDetail = errJson.message || errJson.error?.message || response.statusText;
    } catch {
      errorDetail = response.statusText;
    }

    if (response.status === 401) {
      throw new Error('Invalid Mistral API Key. Please verify your key.');
    } else if (response.status === 429) {
      throw new Error('Mistral rate limit reached. Please wait a moment.');
    } else {
      throw new Error(`Mistral Error (${response.status}): ${errorDetail}`);
    }
  }

  const data = await response.json();
  const choice = data.choices?.[0];
  if (!choice || !choice.message?.content) {
    throw new Error('No response returned from Mistral AI.');
  }

  return choice.message.content;
}
