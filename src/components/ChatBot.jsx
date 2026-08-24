import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import { Sparkles, X, Send, Key, RotateCcw } from 'lucide-react';
import { getStoredApiKey, saveStoredApiKey } from '../utils/storage';
import { sendMistralChat } from '../utils/mistralApi';

export default function ChatBot({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [inputKey, setInputKey] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi! I am Link Value AI. Ask me for study resource links, computer science concept doubt explanations, or semester roadmaps!'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSaveKey = (e) => {
    e.preventDefault();
    if (!inputKey.trim()) return;
    saveStoredApiKey(inputKey);
    setApiKey(inputKey.trim());
    setInputKey('');
  };

  const handleClearKey = () => {
    saveStoredApiKey('');
    setApiKey('');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim() || loading) return;

    if (!apiKey) {
      alert('Please enter your Mistral API Key first to chat.');
      return;
    }

    const userText = inputMsg.trim();
    const updatedMessages = [...messages, { role: 'user', text: userText }];
    setMessages(updatedMessages);
    setInputMsg('');
    setLoading(true);

    try {
      const apiHistory = updatedMessages.map((m) => ({
        role: m.role,
        content: m.text
      }));

      const reply = await sendMistralChat({ apiKey, messages: apiHistory });
      setMessages([...updatedMessages, { role: 'assistant', text: reply }]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: 'assistant', text: `⚠️ Error: ${err.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-drawer">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <Sparkles size={18} className="chatbot-sparkle" />
          <span>Link Value AI</span>
        </div>
        <button className="chatbot-close-btn" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {!apiKey ? (
        <div className="key-setup-box">
          <Key size={24} className="key-icon" />
          <h3>Enter Mistral API Key</h3>
          <p>
            To activate Link Value AI, paste your free Mistral API key below.
            It will be stored securely in your browser's local storage.
          </p>
          <form onSubmit={handleSaveKey} className="key-form">
            <input
              type="password"
              placeholder="Paste Mistral API Key..."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              required
            />
            <button type="submit" className="save-key-btn">Save Key & Start</button>
          </form>
        </div>
      ) : (
        <>
          <div className="key-status-bar">
            <span className="key-active-dot"></span>
            <span>API Key Active</span>
            <button className="change-key-btn" onClick={handleClearKey}>
              <RotateCcw size={11} /> Change Key
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`chat-bubble ${m.role === 'user' ? 'user-bubble' : 'ai-bubble'}`}
              >
                <p>{m.text}</p>
              </div>
            ))}
            {loading && (
              <div className="chat-bubble ai-bubble loading-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chatbot-input-bar">
            <input
              type="text"
              placeholder="Ask a CS doubt or ask for study links..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
            />
            <button type="submit" disabled={!inputMsg.trim() || loading}>
              <Send size={16} />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
