import { fetchNotes } from "@/lib/api";
import NotesClient from "./NotesClient";
import type { Note } from "@/types/note";

export default async function NotesPage() {
    let notes: Note[] = [];

    try {
        const response = await fetchNotes(1, 12, "");
        notes = response.notes;
    } catch (error) {
        console.error("Failed to load notes:", error);
    }

    return <NotesClient initialNotes={notes} />;
}