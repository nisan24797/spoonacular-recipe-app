import React from "react";
import { Pagination as MuiPagination, Stack } from "@mui/material";

const Pagination = ({ currentPage, totalResults, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / 5);

  const handleChange = (event, value) => {
    onPageChange(value - 1);
  };

  return (
    <Stack spacing={2} alignItems="center" marginTop={4}>
      <MuiPagination
        count={totalPages}
        page={currentPage + 1}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        size="large"
      />
    </Stack>
  );
};

export default Pagination;
