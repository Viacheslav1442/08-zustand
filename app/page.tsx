import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "./notes/Notes.client";
import { fetchNotes } from "../lib/api";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const initialData = await fetchNotes(1, 12, "");

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes(1, 12, ""),
  });

  return (
    <main>
      <header>
        <h1>NoteHub – Your Notes in One Place</h1>
        <p>Browse and manage your personal notes easily and efficiently.</p>
      </header>

      <section aria-label="List of Notes">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NotesClient initialData={initialData} />
        </HydrationBoundary>
      </section>
    </main>
  );
}