import React, { useEffect } from 'react';
import { getUsers } from '../api/userService';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/userSlice';

const Home = () => {
  const user = useAppSelector(selectUser);
  console.log(user);
  // Test interceptors
  // useEffect(() => {
  //   getUsers().then((res) => console.log(res));
  // }, []);
  return <div>Home page</div>;
};

export default Home;
