import React from 'react';
import { useState, useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
}) => {
  // Function to generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always include current page
    pageNumbers.push(currentPage);

    // Add next two pages if they exist
    if (currentPage + 1 <= totalPages) {
      pageNumbers.push(currentPage + 1);
    }

    if (currentPage + 2 <= totalPages) {
      pageNumbers.push(currentPage + 2);
    }

    // If we're not on page 1, show page 1
    if (currentPage > 1) {
      pageNumbers.unshift(1);
    }

    // If there's a gap between page 1 and the other pages, add ellipsis indicator
    if (currentPage > 2) {
      pageNumbers.splice(1, 0, 'ellipsis-start');
    }

    // If there are more pages after the displayed ones, add ellipsis
    if (currentPage + 2 < totalPages) {
      pageNumbers.push('ellipsis-end');
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handlePrevious = () => {
    if (hasPreviousPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              className={
                !hasPreviousPage
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>

          {pageNumbers.map((pageNumber, index) => {
            if (
              pageNumber === 'ellipsis-start' ||
              pageNumber === 'ellipsis-end'
            ) {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={pageNumber === currentPage}
                  onClick={() => onPageChange(pageNumber)}
                  className="cursor-pointer"
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={
                !hasNextPage
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
