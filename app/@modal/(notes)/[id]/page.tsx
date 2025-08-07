import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";
import styles from "@/css/Modal.module.css";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function NoteModalPage({ params }: Props) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const note = await fetchNoteById(id);

    return (
        <div className={styles.modalBackdrop}>
            <NotePreview note={note} />
        </div>
    );
}