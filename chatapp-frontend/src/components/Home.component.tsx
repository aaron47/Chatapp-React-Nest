import styled from 'styled-components';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import { User as UserComponent } from './User.component';
import { getAllUsers, postLogoutUser } from '../utils/api';
import { useEffect, useState } from 'react';
import { User } from '../utils/types/User';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const fetchAllUsers = async () => {
    const users = (await getAllUsers()).data;
    setUsers(users);
  };

  async function handleLogout() {
    await postLogoutUser();
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <AuthenticatedRoute>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <HomeContainer>
        <ChatContainer>
          <div className="chat-layout">
            <h1>Chat</h1>
            <Link to="/avatar">Set your avatar</Link>

            <FriendsSideBar>
              {users.map((user) => (
                <UserComponent key={user.id} user={user} />
              ))}
            </FriendsSideBar>
          </div>

          <Outlet />
        </ChatContainer>
      </HomeContainer>
    </AuthenticatedRoute>
  );
};

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow-y: hidden;
`;

const ChatContainer = styled.section`
  background-color: #00000076;
  width: 800px;
  height: 600px;
  display: flex;
`;

const FriendsSideBar = styled.section`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  height: 100%;
  gap: 1rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
`;
