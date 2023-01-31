import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { User as UserType } from '../utils/types/User';

type Props = {
  user: UserType;
};

export const User: React.FC<Props> = ({ user }) => {
  return (
    <UserLayout>
      {user.isAvatarSet ? (
        <img src={user.avatarUrl} alt="User Avatar" />
      ) : (
        <img
          src={`https://ui-avatars.com/api/?background=000000&color=fff&name=${
            user.email.split('@')[0]
          }`}
          alt="Default User Avatar"
        />
      )}

      <UserInformationContainer>
        <Link to={`/user/${user.id}`}>
          <h1>{user.email.split('@')[0]}</h1>
          <p className="status">Online</p>
        </Link>
      </UserInformationContainer>
    </UserLayout>
  );
};

const UserLayout = styled.div`
  cursor: pointer;
  background-color: #0000005a;
  display: flex;
  height: 50px;
  padding: 10px;
  width: fit-content;
  height: fit-content;

  &:hover {
    background-color: #000000b7;
  }

  img {
    width: auto;
    height: 50px;
    margin-right: 10px;
    border-radius: 50%;
  }
`;

const UserInformationContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  .status {
    font-size: 10px;
  }

  h1 {
    font-size: 15px;
  }

  a {
    text-decoration: none;
  }
`;
