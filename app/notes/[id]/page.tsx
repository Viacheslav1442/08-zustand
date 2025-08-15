import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import type { Note } from "@/types/note";

interface NoteDetailsProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata(
    { params }: NoteDetailsProps
): Promise<Metadata> {
    const { id } = await params;

    try {
        const note: Note = await fetchNoteById(id);

        const title = note.title ? `${note.title} | NoteHub` : `Note ${id} | NoteHub`;

        const description =
            note.description ??
            note.excerpt ??
            (typeof note.content === "string"
                ? note.content.replace(/<[^>]+>/g, "").slice(0, 160)
                : "Read note details on NoteHub.");

        const image = note.coverUrl ?? note.image ?? "/og-default.jpg";
        const canonical = `/notes/${id}`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                type: "article",
                url: canonical,
                siteName: "NoteHub",
                images: [
                    {
                        url: image,
                        width: 1200,
                        height: 630,
                        alt: note.title ?? "NoteHub note",
                    },
                ],
            },
            alternates: { canonical },
        };
    } catch {
        const fallbackTitle = "Note not found | NoteHub";
        const canonical = `/notes/${id}`;
        return {
            title: fallbackTitle,
            description: "This note could not be found.",
            openGraph: {
                title: fallbackTitle,
                description: "This note could not be found.",
                type: "article",
                url: canonical,
                siteName: "NoteHub",
            },
            alternates: { canonical },
            robots: { index: false, follow: false },
        };
    }
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient noteId={id} />
        </HydrationBoundary>
    );
}
