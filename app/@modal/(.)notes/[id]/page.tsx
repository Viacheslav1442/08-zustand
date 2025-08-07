import { ReactNode } from "react";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "../../../../components/NotePreview/NotePreview";
import styles from "../../../../css/Modal.module.css";
import { useRouter } from "next/navigation";

type Props = {
    params: { id: string };
};

export default async function NoteModalPage({ params }: Props) {
    const { id } = params;

    const note = await fetchNoteById(id);

    return (
        <div className={styles.modalBackdrop}>
            <NotePreview note={note} />
        </div>
    );
}