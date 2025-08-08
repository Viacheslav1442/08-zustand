"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../css/NotePreview.module.css";
import type { Note } from "@/types/note";

type Props = {
    note: Note;
};

export default function NotePreview({ note }: Props) {
    const router = useRouter();

    const closeModal = () => {
        router.back();
    };

    return (
        <div className={styles.modalContent}>
            <button className={styles.closeBtn} onClick={closeModal}>
                ×
            </button>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            {/* додатковий контент нотатки */}
        </div>
    );
}