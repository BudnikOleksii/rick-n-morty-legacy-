import { FC } from 'react';
import Button from '@mui/material/Button';

interface Props {
  item: string;
  onClick: (item?: string) => void;
}

export const ButtonLink: FC<Props> = ({ item, onClick }) => (
  <Button key={item} sx={{ color: '#fff' }} onClick={() => onClick(item)}>
    {item}
  </Button>
);
