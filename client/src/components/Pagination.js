import React from 'react';
import { Button } from 'reactstrap';


function Pagination({ page, totalPages, onPageChange }) {

  function handlePageChange(nextPage) {
    onPageChange(nextPage)
  }

  let currentPage = page;
  let previousPage = page - 1;
  const hasPreviousPage = page > 1;
  const hasNextPage = totalPages > page;
  const nextPage = page + 1;
  const lastPage = totalPages;



  return (
    <div>
      <div>
        <Button disabled={!hasPreviousPage} onClick={() => handlePageChange(page - 1)}>Trang sau</Button>
        {' '}
        <Button hidden={!(currentPage !== 1 && previousPage !== 1)} onClick={() => handlePageChange(1)}>1</Button>
        {' '}
        <Button hidden={!hasPreviousPage} onClick={() => handlePageChange(page - 1)}>{previousPage}</Button>
        {' '}
        <Button color='primary' size='lg'>{page}</Button>
        {' '}
        <Button hidden={!hasNextPage} onClick={() => handlePageChange(totalPages)}>{lastPage}</Button>
        {' '}
        <Button disabled={!hasNextPage} onClick={() => handlePageChange(nextPage)}>Next page</Button>
      </div>
    </div>
  )
}

export default Pagination