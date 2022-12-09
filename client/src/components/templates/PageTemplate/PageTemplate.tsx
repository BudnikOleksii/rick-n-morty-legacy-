import React, { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { NotificationBlock } from '../../organisms/NotificationBlock';
import { Heading } from '../../molecules/Heading';
import { IErrors, IResponseInfo } from '../../../types/response';
import Pagination from '@mui/material/Pagination';
import { Maybe } from '../../../types/maybe';

interface Props {
  title: string;
  isLoading: boolean;
  errors: IErrors;
  onCloseNotification: () => void;
  info: Maybe<IResponseInfo>;
  currentPage: number;
  onPageChange: (page: number) => void;
  children: ReactNode;
}

export const PageTemplate: FC<Props> = (props) => {
  const {
    title,
    isLoading,
    errors,
    onCloseNotification,
    info,
    currentPage,
    onPageChange,
    children,
  } = props;

  return (
    <Box component="main" sx={{ p: 3, width: '100%' }}>
      <Toolbar />
      <NotificationBlock
        isloading={isLoading}
        errors={errors}
        onCloseNotification={onCloseNotification}
      />

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
