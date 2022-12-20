import React, { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { modalStyles } from '../../../modal-styles';
import { ConfirmButton } from '../../atoms/ConfirmButton';
import { IMessage } from '../../../types/chat-messages';
import { useAppDispatch } from '../../../app/hooks';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { deleteMessageStart } from '../../../features/messages/messages-slice';

interface Props {
  message: IMessage;
  onFormClose: () => void;
}

export const MessageActionsBlock: FC<Props> = ({ message, onFormClose }) => {
  const { id, chat_id } = message;
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMessageDelete = () => {
    dispatch(registerAction(deleteMessageStart.type));
    dispatch(deleteMessageStart({ id, chat_id }));

    handleClose();
  };

  return (
    <Box>
      <IconButton color="warning" aria-label="edit message" onClick={onFormClose}>
        <EditIcon />
      </IconButton>

      <IconButton color="error" aria-label="delete message" onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyles}>
          Are you sure you want delete current message?
          <ConfirmButton onConfirm={handleMessageDelete} />
        </Box>
      </Modal>
    </Box>
  );
};
