import { PropsWithChildren, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChatMessages } from './components/ChatMessages.component';
import { Home } from './components/Home.component';
import { Login } from './components/Login.component';
import { SetAvatar } from './components/SetAvatar.component';
import { SignUp } from './components/SignUp.component';
import { User as UserComponent } from './components/User.component';
import { AuthContext } from './utils/context/AuthContext';
import { User } from './utils/types/User';

type Props = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const AppWithProviders = ({
  children,
  user,
  setUser,
}: PropsWithChildren & Props) => {
  return (
    <AuthContext.Provider value={{ user: user, updateAuthUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'user/:id',
        element: <ChatMessages />,
      },
    ],
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: 'avatar',
    element: <SetAvatar />
  }
]);

export const App = () => {
  const [user, setUser] = useState<User>();

  return (
    <AppWithProviders user={user} setUser={setUser}>
      <RouterProvider router={router} />
    </AppWithProviders>
  );
};
