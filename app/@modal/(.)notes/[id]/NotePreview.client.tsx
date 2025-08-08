"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "../../../../components/Modal/Modal";
import styles from "../../../../css/NotePreview.module.css";
import type { Note } from "@/types/note";

type Props = {
    id: string;
};

export default function NotePreview({ id }: Props) {
    const router = useRouter();

    const { data: note, isLoading, isError } = useQuery<Note>({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });

    const closeModal = () => {
        router.back();
    };

    return (
        <Modal onClose={closeModal}>
            <div className={styles.modalContent}>
                <button className={styles.closeBtn} onClick={closeModal}>
                    ×
                </button>

                {isLoading && <p>Loading note...</p>}
                {isError && <p>Error loading note.</p>}

                {note && (
                    <>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                        {/* додатковий контент нотатки */}
                    </>
                )}
            </div>
        </Modal>
    );
}