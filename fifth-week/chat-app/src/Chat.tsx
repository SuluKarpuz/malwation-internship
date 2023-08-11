import React, { useState } from "react";
import { useSubscription, useMutation } from "@apollo/client";
import gql from "graphql-tag";

const MESSAGES_SUBSCRIPTION = gql`
  subscription {
    messagesSubscription {
      id
      user
      text
    }
  }
`;

const POST_MESSAGE_MUTATION = gql`
  mutation PostMessage($user: String!, $text: String!) {
    postMessage(user: $user, text: $text)
  }
`;

const Chat = () => {
  const [user, setUser] = useState("");
  const [text, setText] = useState("");

  const { data, loading, error } = useSubscription(MESSAGES_SUBSCRIPTION);

  const [postMessage] = useMutation(POST_MESSAGE_MUTATION);

  const handleSend = async () => {
    if (user.trim() === "" || text.trim() === "") {
      return;
    }

    await postMessage({ variables: { user, text } });

    setUser("");
    setText("");
  };

  if (loading) return <p className="text-gray-700">Loading chat app...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const messages = data.messagesSubscription;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Chat Messages</h1>
      <ul className="w-full max-w-lg">
        {messages.map((message) => (
          <li key={message.id} className="mb-2">
            <strong className="text-blue-500">{message.user}:</strong>{" "}
            <span className="text-gray-700">{message.text}</span>
          </li>
        ))}
      </ul>
      <div className="flex space-x-4 mt-4">
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="border border-gray-400 rounded py-2 px-4 w-1/3"
        />
        <input
          type="text"
          placeholder="Type your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-400 rounded py-2 px-4 w-2/3"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
