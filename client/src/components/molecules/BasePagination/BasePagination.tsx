import React, { FC } from 'react';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';

interface Props {
  pages: number;
  currentPage: number;
  baseEndpoint: string;
}

export const BasePagination: FC<Props> = ({ pages, currentPage, baseEndpoint }) => {
  const navigate = useNavigate();

  return (
    <Pagination
      sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}
      count={pages}
      variant="outlined"
      shape="rounded"
      page={currentPage || 1}
      onChange={(_, pageNumber) => {
        navigate(`${baseEndpoint}?page=${pageNumber}`);
      }}
    />
  );
};
