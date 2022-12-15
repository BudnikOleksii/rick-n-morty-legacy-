import React, { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Pagination from '@mui/material/Pagination';
import { Heading } from '../../molecules/Heading';
import { IResponseInfo } from '../../../types/response';
import { Maybe } from '../../../types/helper-types';

interface Props {
  title: string;
  info: Maybe<IResponseInfo>;
  currentPage: number;
  onPageChange: (page: number) => void;
  children: ReactNode;
}

export const PageTemplate: FC<Props> = (props) => {
  const { title, info, currentPage, onPageChange, children } = props;

  return (
    <Box component="main" sx={{ p: 3, width: '100%' }}>
      <Toolbar />
      <Heading title={title} />

      {children}

      {info && info.total > 0 && (
        <Pagination
          sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}
          count={info.pages}
          variant="outlined"
          shape="rounded"
          page={currentPage || 1}
          onChange={(_, pageNumber) => {
            onPageChange(pageNumber);
          }}
        />
      )}
    </Box>
  );
};
