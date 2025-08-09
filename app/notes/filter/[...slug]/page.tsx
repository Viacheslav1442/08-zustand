import type { FetchNoteResponse } from "@/types/note";
import { fetchNotes } from "@/lib/api";
import NotesClient from "../[...slug]/Notes.client";

type Props = {
    params: { slug?: string[] };
};

export default async function Page({ params }: Props) {
    const tag = params.slug?.[0] ?? "All";


    const data: FetchNoteResponse = await fetchNotes(1, 12, "", tag === "All" ? "" : tag);

    return <NotesClient initialData={data} tag={tag} />;
}
