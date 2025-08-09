import type { FetchNotesResponse } from "@/lib/api";
import { fetchNotes } from "@/lib/api";
import NotesClient from "../[...slug]/Notes.client";

type Props = {
    params: Promise<{ slug?: string[] }>;
};

export default async function Page({ params }: Props) {
    const resolvedParams = await params;
    const tag = resolvedParams.slug?.[0] ?? "All";

    const data: FetchNotesResponse = await fetchNotes(
        1,
        12,
        "",  // search порожній
        tag !== "All" ? tag : undefined
    );

    return <NotesClient initialData={data} tag={tag} />;
}