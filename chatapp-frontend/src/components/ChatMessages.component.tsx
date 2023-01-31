import styled from 'styled-components';
import { IoMdSend } from 'react-icons/io';
import { useContext, useEffect, useRef, useState } from 'react';
import { getAllMessages, getUserById, postCreateMessage } from '../utils/api';
import { Message } from '../utils/types/Message';
import { AuthContext } from '../utils/context/AuthContext';
import { useParams } from 'react-router-dom';
import { User } from '../utils/types/User';
import { flushSync } from 'react-dom';

export const ChatMessages = () => {
  const messageRef = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [recipient, setRecipient] = useState<User>();
  const { user } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();

  const fetchAllMessages = async () => {
    if (!id) return;
    const messages = (await getAllMessages(id)).data;
    // const messages = await (
    //   await axios.get(`http://localhost:5000/api/message/${id}/all`, {
    //     withCredentials: true,
    //   })
    // ).data;
    console.log(messages);
    setMessages(messages);
  };

  const fetchRecipient = async () => {
    if (!id) return;
    const recipient = (await getUserById(id)).data;
    // const messages = await (
    //   await axios.get(`http://localhost:5000/api/message/${id}/all`, {
    //     withCredentials: true,
    //   })
    // ).data;
    console.log(recipient);
    setRecipient(recipient);
  };

  const handleCreateMesage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    const messageToSend = (await postCreateMessage(id, { content: message }))
      .data;

    flushSync(() => {
      setMessages([...messages, messageToSend]);
      setMessage('');
    });

    messageRef.current.lastElementChild!.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    fetchAllMessages();
    fetchRecipient();
  }, [id]);

  return (
    <ChatMessagesLayout>
      <p className="message-receiver">{recipient?.email.split('@')[0]}</p>

      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id}>
            <div
              ref={messageRef}
              className={`message ${
                user?.id === message.recipientId ? 'received' : 'sent'
              }`}
            >
              <div className="content">
                <p>{message.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="messages-container">
              <div className="message sent">
                <div className="content">
                  <p>Hello! How are you?</p>
                </div>
              </div>
              <div className="message received">
                <div className="content">
                  <p>I'm fine and you?</p>
                </div>
              </div>
              <div className="message sent">
                <div className="content">
                  <p>Hello! How are you?</p>
                </div>
              </div>
              <div className="message sent">
                <div className="content">
                  <p>Hello! How are you?</p>
                </div>
              </div>
            </div> */}
      <InputContainer onSubmit={handleCreateMesage}>
        <input
          type="text"
          placeholder="Type Your Message Here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="submit-btn">
          <IoMdSend size={25} />
        </button>
      </InputContainer>
    </ChatMessagesLayout>
  );
};

const ChatMessagesLayout = styled.div`
  display: grid;
  grid-template-rows: 20% 70% 10%;
  width: 100%;
  padding: 5px;

  .message-receiver {
    text-align: center;
    font-size: 20px;
    padding: 10px;
  }

  .messages-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 0;
    }

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }

    .sent {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }

    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

const InputContainer = styled.form`
  width: 100%;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: #ffffff34;
  margin-bottom: 10px;

  input {
    width: 100%;
    height: 60%;
    background-color: transparent;
    color: white;
    border: none;
    padding: 1rem;
    font-size: 1.2rem;
    overflow-wrap: break-word;

    &::selection {
      background-color: #9186f3;
    }

    &:focus {
      outline: none;
    }
  }

  button {
    padding: 0.3rem 2rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4e0eff;
    border: none;
    height: 100%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #997af0;
    }

    svg {
      color: white;
    }
  }
`;
