import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { patchSetAvatar } from '../utils/api';
import { AuthContext } from '../utils/context/AuthContext';

export const SetAvatar = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  function generateAvatar() {
    setBackgroundColor(Math.floor(Math.random() * 16777215).toString(16));

    setAvatarUrl(
      `https://ui-avatars.com/api/?background=${backgroundColor}&color=fff&name=${
        user?.email.split('@')[0]
      }`
    );
  }

  async function handleSetAvatar() {
    await patchSetAvatar(String(user?.id!), avatarUrl);
    navigate('/');
  }

  useEffect(() => {
    console.log(user);
  }, [avatarUrl, backgroundColor]);

  return (
    <AvatarContainer>
      <div className="container">
        <img src={user?.avatarUrl} />

        <button onClick={generateAvatar}>Generate Avatar</button>
        <button onClick={handleSetAvatar}>Set</button>
      </div>
    </AvatarContainer>
  );
};

const AvatarContainer = styled.div`

  .container {
    background-color: #1c1c3b;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem 0;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  button {
    padding: 0.5rem 1rem;
    color: #fff;
    background-color: #000000b7;
    border: none;
    font-size: 1.2rem;

    &:hover {
      cursor: pointer;
      background-color: #00000076;
    }
  }

  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  gap: 1rem 0;
`;
