"use client";

import { useState } from "react";
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

    const { data } = useQuery<FetchNoteResponse>({
        queryKey: ["notes", debouncedSearchQuery, currentPage, tag],
        queryFn: () =>
            fetchNotes(
                currentPage,
                limit,
                debouncedSearchQuery,
                tag !== "All" ? tag : "All"
            ),
        initialData,
        placeholderData: () => initialData,
    });

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h2>Notes filtered by &quot;{tag}&quot;</h2>

            <SearchBox value={searchQuery} onChange={handleSearch} />

            <button onClick={() => setIsModalOpen(true)}>Add Note</button>

            <NoteList notes={data?.notes ?? []} />

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil((data?.total ?? 0) / limit)}
                onPageChange={handlePageChange}
            />

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={() => setIsModalOpen(false)}
                    />
                </Modal>
            )}
        </div>
    );
}