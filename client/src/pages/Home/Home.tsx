import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authStart, selectUser } from '../../features/userSlice';

const Home = () => {
  const user = useAppSelector(selectUser);
  // TODO if !user redirect to public route!
  const dispatch = useAppDispatch();
  console.log(user);

  useEffect(() => {
    dispatch(
      authStart({
        login: 'admin@gmail.com',
        password: '12345678',
      })
    );
  }, []);

  return <div>Home page</div>;
};

export default Home;
