import type { FetchNoteResponse, NoteTag } from "@/types/note";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage({
    params,
}: {
    params: { slug?: string[] };
}) {
    const tag = params.slug?.[0] ?? "All";

    const data: FetchNoteResponse = await fetchNotes(1, 12, "", tag);

    return <NotesClient initialData={data} tag={tag} />;
}