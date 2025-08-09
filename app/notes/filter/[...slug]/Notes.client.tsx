"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import type { FetchNoteResponse, NoteTag } from "@/types/note";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../components/Pagination/Pagination";
import Modal from "../../../../components/Modal/Modal";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import NoteList from "../../../../components/NoteList/NoteList";

interface NotesClientProps {
    initialData: FetchNoteResponse;
    tag: NoteTag | string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const limit = 12;
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);


    useEffect(() => {
        setCurrentPage(1);
    }, [tag, debouncedSearchQuery]);

    const { data } = useQuery<FetchNoteResponse>({
        queryKey: ["notes", debouncedSearchQuery, currentPage, tag],
        queryFn: () =>
            fetchNotes(
                currentPage,
                limit,
                debouncedSearchQuery,
                tag !== "All" ? tag : ""
            ),
        initialData,
        placeholderData: () => initialData,
    });

    const totalPages = Math.ceil((data?.total ?? 0) / limit);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h2>Notes filtered by &quot;{tag}&quot;</h2>

            <SearchBox value={searchQuery} onChange={handleSearch} />

            <button onClick={() => setIsModalOpen(true)}>Add Note</button>

            {data?.notes?.length ? (
                <NoteList notes={data.notes} />
            ) : (
                <p>No notes found.</p>
            )}

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onClose={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </div>
    );
}
