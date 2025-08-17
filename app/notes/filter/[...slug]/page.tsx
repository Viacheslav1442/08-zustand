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
        description: `${tag || "All"} notes list`,
        openGraph: {
            title: `Notes: ${tag || "All"}`,
            description: `${tag || "All"} notes list`,
            url: `https://08-zustand-ten-kappa.vercel.app/notes/filter/${tag || "All"}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: "NoteHub logo",
                }
            ],
            type: 'article',
        }
    };
}

export default async function FilteredNotesPage({ params }: Props) {
    const resolvedParams = await params;
    const tag = resolvedParams.slug[0] === "All" ? undefined : resolvedParams.slug[0];


    const initialData: FetchNotesResponse = await fetchNotes(
        1,    // page
        12,   // perPage
        "",   // search
        tag   // tag
    );

    return <NotesClient initialData={initialData} tag={tag || 'All'} />;
}
