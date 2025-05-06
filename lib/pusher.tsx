'use client'
import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

const InvitationMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pusherInstance, setPusherInstance] = useState<Pusher | null>(null);

  useEffect(() => {
    // Initialize Pusher only once
    const pusher = new Pusher('7e45d0fe0e2b99ef0b11', {
      cluster: 'ap1',
      forceTLS: true, // Using forceTLS instead of encrypted (which is deprecated)
    });
    
    setPusherInstance(pusher);
    
    // Subscribe to the 'messages' channel
    const channel = pusher.subscribe('messages');
    
    // Listen for the 'new-message' event
    channel.bind('new-message', (data: Message) => {
      console.log('New message received: ', data);
      // Update state with the new message
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    
    // Error handling for pusher connection
    pusher.connection.bind('error', (err: any) => {
      console.error('Pusher connection error:', err);
    });
    
    // Cleanup when component unmounts
    return () => {
      channel.unbind_all();
      pusher.unsubscribe('messages');
      pusher.disconnect();
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="invitation-messages">
      <h1>Live Invitation Messages</h1>
      
      {messages.length === 0 ? (
        <p>Waiting for new messages...</p>
      ) : (
        <ul className="message-list">
          {messages.map((message) => (
            <li key={message.id} className="message-item">
              <strong>{message.sender}:</strong> {message.text}
              <span className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InvitationMessages;