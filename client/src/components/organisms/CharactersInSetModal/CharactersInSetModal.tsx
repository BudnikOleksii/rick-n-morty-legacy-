import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import PersonIcon from '@mui/icons-material/Person';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { ListItemComponent } from '../../molecules/ListItemComponent';
import { modalStyles } from '../../../modal-styles';
import { ICharacterInSet } from '../../../types/set';
import { NAME_SPACES } from '../../../constants';

interface Props {
  isOpen: boolean;
  onOpen: (open: boolean) => void;
  characters: ICharacterInSet[];
}

export const CharactersInSetModal: FC<Props> = ({ isOpen, onOpen, characters }) => {
  const { t } = useTranslation();

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
                name={t('sets.character', { ns: NAME_SPACES.pages })}
                value={character.name}
                icon={<PersonIcon />}
              />
            ))}
          </List>
        ) : (
          <Typography>{t('sets.no_characters', { ns: NAME_SPACES.pages })}</Typography>
        )}
      </Box>
    </Modal>
  );
};
