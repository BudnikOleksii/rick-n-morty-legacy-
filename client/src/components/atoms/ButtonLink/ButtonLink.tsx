import { FC } from 'react';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { NAME_SPACES } from '../../../constants';

interface Props {
  item: string;
  onClick: (item?: string) => void;
}

export const ButtonLink: FC<Props> = ({ item, onClick }) => {
  const { t } = useTranslation();

  return (
    <Button key={item} sx={{ color: '#fff' }} onClick={() => onClick(item)}>
      {t(`paths.${item}`, { ns: NAME_SPACES.main })}
    </Button>
  );
};
