import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../app/hooks';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { ConfirmButton } from '../../atoms/ConfirmButton';
import { IMessage } from '../../../types/chat-messages';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { deleteMessageStart } from '../../../features/messages/messages-slice';
import { modalStyles } from '../../../modal-styles';
import { NAME_SPACES } from '../../../constants';

interface Props {
  message: IMessage;
  onToggleEditMode: () => void;
}

export const MessageActionsBlock: FC<Props> = ({ message, onToggleEditMode }) => {
  const { id, chat_id } = message;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
  const handleOpen = () => setOpenConfirmModal(true);
  const handleClose = () => setOpenConfirmModal(false);

  const handleMessageDelete = () => {
    dispatch(registerAction(deleteMessageStart.type));
    dispatch(deleteMessageStart({ id, chat_id }));

    handleClose();
  };

  return (
    <Box>
      <IconButton color="warning" aria-label="edit message" onClick={onToggleEditMode}>
        <EditIcon />
      </IconButton>

      <IconButton color="error" aria-label="delete message" onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>

      <Modal
        open={openConfirmModal}
        onClose={handleClose}
        aria-labelledby="modal-delete_message"
        aria-describedby="modal-delete_message"
      >
        <Box sx={modalStyles}>
          <Typography textAlign="center">
            {t('chat.delete_confirm', { ns: NAME_SPACES.pages })}
          </Typography>
          <ConfirmButton onConfirm={handleMessageDelete} />
        </Box>
      </Modal>
    </Box>
  );
};
