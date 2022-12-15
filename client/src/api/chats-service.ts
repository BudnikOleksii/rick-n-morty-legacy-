import { AxiosResponse } from 'axios';
import $api, { ENDPOINTS } from './index';
import { IChat, IChatResponse, IMessagesResponse } from '../types/chat-messages';

export const getChats = (params: string = ''): Promise<AxiosResponse<IChatResponse[]>> => {
  return $api.get<IChatResponse[]>(ENDPOINTS.chats + params);
};

export const getChatById = (id: number | string): Promise<AxiosResponse<IChat>> => {
  return $api.get<IChat>(ENDPOINTS.chatById(id));
};

export const getChatMessages = (
  id: number | string,
  params: string = ''
): Promise<AxiosResponse<IMessagesResponse>> => {
  return $api.get<IMessagesResponse>(ENDPOINTS.chatMessages(id) + params);
};
