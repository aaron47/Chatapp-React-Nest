import styled from 'styled-components';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import { User as UserComponent } from './User.component';
import { getAllUsers, postLogoutUser } from '../utils/api';
import { useContext, useEffect, useState } from 'react';
import { User } from '../utils/types/User';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../utils/context/AuthContext';

export const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useContext(AuthContext);

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

            <FriendsSideBar>
              <UserLayout>
                <img src={user?.avatarUrl} alt="User Avatar" />
                <UserInformationContainer>
                  <h1>Your Profile</h1>
                  <p className="status">Online</p>
                  <Link to="/avatar">Change Avatar</Link>
                </UserInformationContainer>
              </UserLayout>

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

const UserLayout = styled.div`
  cursor: pointer;
  background-color: #0000005a;
  display: flex;
  height: 50px;
  padding: 10px;
  width: fit-content;
  height: fit-content;
  margin-bottom: 2rem;

  &:hover {
    background-color: #000000b7;
  }

  &:active {
    background-color: #0000007e;
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

  a {
    color: #422da0;
    text-decoration: none;
    font-size: 10px;

    &:hover {
      color: #7660da;
    }
  }

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
