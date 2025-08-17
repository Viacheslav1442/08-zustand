import type { FetchNotesResponse } from "@/lib/api";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    return {
        title: `${slug[0]} notes`,
        description: `List of your notes filtered by tag ${slug[0]}. Ability to view, edit and delete notes. Create a new note`,
        openGraph: {
            title: `${slug[0]} notes`,
            description: `List of your notes filtered by tag ${slug[0]}. Ability to view, edit and delete notes. Create a new note`,
            url: `https://08-zustand-blue.vercel.app/notes/filter/${slug[0]}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: `${slug[0]} notes`,
                },
            ],
        },
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
