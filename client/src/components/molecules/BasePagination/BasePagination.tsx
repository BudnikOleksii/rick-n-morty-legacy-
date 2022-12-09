import React, { FC } from 'react';
import Pagination from '@mui/material/Pagination';

interface Props {
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const BasePagination: FC<Props> = ({ pages, currentPage, onPageChange }) => {
  return (
    <Pagination
      sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}
      count={pages}
      variant="outlined"
      shape="rounded"
      page={currentPage || 1}
      onChange={(_, pageNumber) => {
        onPageChange(pageNumber);
      }}
    />
  );
};
