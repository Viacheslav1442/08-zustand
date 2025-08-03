import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "../../lib/api";

export default async function NotesPage() {
    const queryClient = new QueryClient();


    const initialData = await fetchNotes(1, 12, "");


    await queryClient.prefetchQuery({
        queryKey: ["notes", 1, ""],
        queryFn: () => Promise.resolve(initialData),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient initialData={initialData} />
        </HydrationBoundary>
    );
}