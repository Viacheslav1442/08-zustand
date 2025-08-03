'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import Modal from '@/components/Modal/Modal';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { fetchNotes, FetchNotesResponse } from '@/lib/api';
import NoteForm from '@/components/NoteForm/NoteForm';

import css from '../page.module.css';

interface NotesClientProps {
    initialData: FetchNotesResponse;
}

export default function NotesClient({ initialData }: NotesClientProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const perPage = 12;

    const { data } = useQuery<FetchNotesResponse>({
        queryKey: ['notes', searchQuery, currentPage],
        queryFn: () => fetchNotes(currentPage, perPage, searchQuery),
        placeholderData: keepPreviousData,
        initialData,
    });

    const toggleModal = () => setIsModalOpen(prev => !prev);


    const changeSearchQuery = useDebouncedCallback((newQuery: string) => {
        setCurrentPage(1);
        setSearchQuery(newQuery);
    }, 300);

    const totalPages: number = data?.totalPages ?? 0;
    const notes = data?.notes ?? [];

    return (
        <div className={css.app}>
            <main>
                <section>
                    <header className={css.toolbar}>
                        <SearchBox value={searchQuery} onChange={changeSearchQuery} />
                        {totalPages > 1 && (
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                            />
                        )}
                        <button className={css.button} onClick={toggleModal}>
                            Create note +
                        </button>
                    </header>

                    {isModalOpen && (
                        <Modal onClose={toggleModal}>
                            <NoteForm onClose={toggleModal} />
                        </Modal>
                    )}

                    {notes.length > 0 && <NoteList notes={notes} />}
                </section>
            </main>
        </div>
    );
}
