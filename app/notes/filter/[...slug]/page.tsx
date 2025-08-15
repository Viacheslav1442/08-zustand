import type { FetchNotesResponse } from "@/lib/api";
import { fetchNotes } from "@/lib/api";
import NotesClient from "../[...slug]/Notes.client";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const rawTag = slug?.[0] ?? "All";
    const tagForUI = decodeURIComponent(rawTag);

    const title =
        tagForUI === "All"
            ? "Notes — All | NoteHub"
            : `Notes tagged “${tagForUI}” | NoteHub`;

    const description =
        tagForUI === "All"
            ? "Browse all notes on NoteHub."
            : `Browse notes filtered by the “${tagForUI}” tag on NoteHub.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url:
                tagForUI === "All"
                    ? "https://your-site.com/notes"
                    : `https://your-site.com/notes/filter/${encodeURIComponent(tagForUI)}`,
            siteName: "NoteHub",
        },
        alternates: {
            canonical:
                tagForUI === "All"
                    ? "/notes"
                    : `/notes/filter/${encodeURIComponent(tagForUI)}`,
        },
    };
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params;
    const tag = resolvedParams.slug?.[0] ?? "All";

    const data: FetchNotesResponse = await fetchNotes(
        1,
        12,
        "",
        tag !== "All" ? tag : undefined
    );

    return <NotesClient initialData={data} tag={tag} />;
}
