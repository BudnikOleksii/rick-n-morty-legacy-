import { RootState } from '../../app/store';

export const selectNotificationInfo = (state: RootState) => state.actionsInfo;
export const selectIsActionInProcess = (actionType: string) => (state: RootState) => {
  return state.actionsInfo.actions.includes(actionType);
};
