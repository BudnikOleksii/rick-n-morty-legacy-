import { RootState } from '../../app/store';

export const selectNotificationInfo = (state: RootState) => state.notifications;
