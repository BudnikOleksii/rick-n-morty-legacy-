import React, { useEffect } from 'react';
import { getUsers } from '../../api/userService';

const Home = () => {
  // Test interceptors
  useEffect(() => {
    getUsers().then((res) => console.log(res));
  }, []);
  return <div>Home page</div>;
};

export default Home;
