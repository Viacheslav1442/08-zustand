import type { FetchNoteResponse } from "@/types/note";
import { fetchNotes } from "@/lib/api";
import NotesClient from "../[...slug]/Notes.client";

interface PageProps {
    params: { slug?: string[] };
}

export default async function Page({ params }: PageProps) {
    const tag = params.slug?.[0] ?? "All";

    const data: FetchNoteResponse =
        tag === "All"
            ? await fetchNotes(1, 12, "")
            : await fetchNotes(1, 12, "", tag);

    return <NotesClient initialData={data} tag={tag} />;
}
