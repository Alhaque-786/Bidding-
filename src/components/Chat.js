import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = ({ match }) => {
  const projectId = match.params.projectId;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ user: '', text: '' });

  useEffect(() => {
    // Fetch chat messages for the specific project from the backend API
    axios.get(`/api/chat/${projectId}`)
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching chat messages:', error));
  }, [projectId]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    // Submit a new message to the backend API
    axios.post(`/api/chat/${projectId}`, newMessage)
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error sending message:', error));

    // Clear the form
    setNewMessage({ user: '', text: '' });
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.user}: {message.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <label>User:
          <input type="text" value={newMessage.user} onChange={(e) => setNewMessage({ ...newMessage, user: e.target.value })} />
        </label>
        <label>Text:
          <input type="text" value={newMessage.text} onChange={(e) => setNewMessage({ ...newMessage, text: e.target.value })} />
        </label>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Chat;
