import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import Button from '@mui/material/Button';
import { ListItemComponent } from '../../molecules/ListItemComponent';
import { CardButtonsWrapper } from '../../atoms/CardButtonsWrapper';
import { ICharacterBaseInfo } from '../../../types/character';
import { NAME_SPACES, PATHS } from '../../../constants';

type Props = {
  character: ICharacterBaseInfo;
};
export const CharacterCard: FC<Props> = ({ character }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id, name, image, status, gender, type, species } = character;

  const handleOpenCharactersDetails = () => {
    navigate(`${PATHS.characters}/${id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: '300px',
        minHeight: '93%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardMedia component="img" image={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>

        <List>
          <ListItemComponent
            name={t('character.status', { ns: NAME_SPACES.cards })}
            value={status}
            icon={<MonitorHeartIcon />}
          />
          <ListItemComponent
            name={t('character.gender', { ns: NAME_SPACES.cards })}
            value={gender}
            icon={<TransgenderIcon />}
          />
          <ListItemComponent
            name={t('character.type', { ns: NAME_SPACES.cards })}
            value={type}
            icon={<Diversity3Icon />}
          />
          <ListItemComponent
            name={t('character.species', { ns: NAME_SPACES.cards })}
            value={species}
            icon={<Diversity2Icon />}
          />
        </List>
      </CardContent>

      <CardButtonsWrapper>
        <Button onClick={handleOpenCharactersDetails}>
          {t('character.details_btn', { ns: NAME_SPACES.cards })}
        </Button>
      </CardButtonsWrapper>
    </Card>
  );
};
