import ReactPaginate from "react-paginate";
import css from "../../css/Pagination.module.css";

interface PaginationProps {
    pageCount: number;
    currentPage: number;
    onPageChange: (selectedPage: number) => void;
}

export default function Pagination({ pageCount, currentPage, onPageChange }: PaginationProps) {
    return (
        <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            forcePage={currentPage - 1}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={(event) => onPageChange(event.selected + 1)}
            containerClassName={css.pagination}
            activeClassName={css.active}
            disabledClassName={css.disabled}
        />
    );
}