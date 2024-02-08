/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useUser } from "../hooks/apiHooks";
import { UserResponse } from "../types/MessageTypes";

const Profile = () => {

  const [user, setUser] = useState<UserResponse['user'] | null>(null);
  const {getUserByToken} = useUser();


  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('token');
      const userResponse = await getUserByToken(token!);
      setUser(userResponse.user);
    }
    getUser();
  }, []);

  return (
    <>
      <h2>Profile page</h2>
      {user &&
      <>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Created: {new Date(user.created_at).toLocaleDateString('fi-FI')}</p>
      </>
      }
    </>
  )
};

export default Profile;
