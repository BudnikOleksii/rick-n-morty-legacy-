import React, { FC } from 'react';
import { ICharacter } from '../../../types/character';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import PersonIcon from '@mui/icons-material/Person';
import Modal from '@mui/material/Modal';
import { ListItemComponent } from '../../molecules/ListItemComponent';
import { modalStyles } from '../../../modal-styles';

interface Props {
  isOpen: boolean;
  onOpen: (open: boolean) => void;
  characters: Omit<ICharacter, 'location' | 'episodes'>[];
}

export const CharactersInSetModal: FC<Props> = ({ isOpen, onOpen, characters }) => {
  return (
    <Modal
      open={isOpen}
      onClose={() => onOpen(false)}
      aria-labelledby="modal-characters"
      aria-describedby="modal-characters-list-for-current-set"
    >
      <Box sx={modalStyles}>
        {characters.length > 0 ? (
          <List>
            {characters.map((character) => (
              <ListItemComponent
                key={character.id}
                name="Character"
                value={character.name}
                icon={<PersonIcon />}
              />
            ))}
          </List>
        ) : (
          <div>There are no characters in set</div>
        )}
      </Box>
    </Modal>
  );
};
