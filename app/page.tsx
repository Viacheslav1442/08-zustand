import { getNotes } from "../../services/noteService";
import NotesClient from "./NotesClient";
import type { Note } from "@/types/note";

export default async function NotesPage() {
  let notes: Note[] = [];

  try {
    notes = await getNotes();
  } catch (error) {

    console.error("Failed to load notes:", error);
  }

  return <NotesClient initialNotes={notes} />;
}