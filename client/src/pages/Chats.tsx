import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTemplate } from '../components/templates/PageTemplate';
import { ChatsList } from '../components/organisms/ChatsList';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectChats } from '../features/chats/chats-selectors';
import { chatsLoadingStart } from '../features/chats/chats-slice';
import { registerAction } from '../features/actions-info/actions-info-slice';
import { PATHS } from '../constants';

const Chats = () => {
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const page = params.get('page');
  const dispatch = useAppDispatch();
  const { chats, chatsInfo } = useAppSelector(selectChats);

  useEffect(() => {
    dispatch(registerAction(chatsLoadingStart.type));
    dispatch(
      chatsLoadingStart({
        params: `?page=${page || 1}`,
      })
    );
  }, [page]);

  const handlePageChange = (pageNumber: number) => {
    navigate(`${PATHS.chats}?page=${pageNumber}`);
  };

  return (
    <PageTemplate
      title="All chats"
      info={chatsInfo}
      currentPage={Number(page)}
      onPageChange={handlePageChange}
    >
      {chats && chats.length > 0 && <ChatsList chats={chats} />}

      {chats && chats.length === 0 && <h2>There are no active chats, create one</h2>}
    </PageTemplate>
  );
};

export default Chats;
