
export async function askDoubtZeroKey(topic) {
  try {
    const cleanTopic = encodeURIComponent(topic.trim().replace(/\s+/g, '_'));
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${cleanTopic}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Concept not found for "${topic}". Try another CS topic.`);
    }

    const data = await response.json();
    return {
      title: data.title,
      summary: data.extract,
      url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${cleanTopic}`
    };
  } catch (error) {
    console.error('ZeroKey Doubt API Error:', error);
    throw error;
  }
}

export async function searchStackOverflowDoubt(query) {
  try {
    const cleanQuery = encodeURIComponent(query.trim());
    const url = `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&site=stackoverflow&q=${cleanQuery}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`StackOverflow API Error (${response.status})`);
    }

    const data = await response.json();
    const topItem = data.items?.[0];

    if (!topItem) {
      throw new Error(`No StackOverflow answers found for "${query}".`);
    }

    return {
      title: topItem.title,
      link: topItem.link,
      isAnswered: topItem.is_answered,
      score: topItem.score
    };
  } catch (error) {
    console.error('StackOverflow API Error:', error);
    throw error;
  }
}


export async function askGeminiDoubt(apiKey, question) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error('Google Gemini API Key is required.');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `You are a concise, helpful CS college study assistant. Answer this doubt clearly in 2-3 sentences: ${question}`
          }
        ]
      }
    ]
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Gemini API Error (${response.status}): ${response.statusText}`);
  }

  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return reply || 'No response returned from Gemini.';
}


export async function fetchStudyTip() {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    return { quote: data.quote, author: data.author };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
