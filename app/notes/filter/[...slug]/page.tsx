import type { FetchNoteResponse } from "@/types/note";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import NotesClient from "../[...slug]/Notes.client";

type Props = {
    params: Promise<{ slug?: string[] }>;
};

export default async function Page({ params }: Props) {
    const resolvedParams = await params;
    const tag = resolvedParams.slug?.[0] ?? "All";


    const data: FetchNotesResponse = await fetchNotes(1, 12, tag);



    return <NotesClient initialData={data} tag="All" />
}
