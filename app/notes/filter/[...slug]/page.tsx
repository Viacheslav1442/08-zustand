import type { FetchNotesResponse } from "@/lib/api";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const tag = resolvedParams.slug[0] === "All" ? undefined : resolvedParams.slug[0];

    return {
        title: `Notes: ${tag || "All"}`,
        description: `List of notes filtered by tag: ${tag || "All"}. Ability to view, edit and delete notes. Create a new note.`,
        openGraph: {
            title: `Notes: ${tag || "All"}`,
            description: `List of notes filtered by tag: ${tag || "All"}. Ability to view, edit and delete notes. Create a new note.`,
            url: `https://08-zustand-blue.vercel.app/notes/filter/${tag || "All"}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: `Notes: ${tag || "All"}`,
                }
            ],
            type: 'article',
        },
    };
}

export default async function FilteredNotesPage({ params }: Props) {
    const resolvedParams = await params;
    const tag = resolvedParams.slug[0] === "All" ? undefined : resolvedParams.slug[0];

    let initialData: FetchNotesResponse;

    try {

        initialData = await fetchNotes(1, 12, "", tag);

        if (!initialData.notes.length) {
            const fallback = await fetchNotes(1, 12);
            initialData = fallback;
        }
    } catch (err) {
        console.error("fetchNotes failed:", err);

        initialData = { total: 0, notes: [], totalPages: 0, page: 1, perPage: 12 };
    }

    return <NotesClient initialData={initialData} tag={tag || "All"} />;
}
