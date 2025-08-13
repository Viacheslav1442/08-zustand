import CreateNotePageClient from "./CreateNotePage.client";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";

export const metadata = {
    title: "Create Note - NoteHub",
    description: "Create a new note in NoteHub",
    openGraph: {
        title: "Create Note - NoteHub",
        description: "Create a new note in NoteHub",
        url: `${baseUrl}/notes/action/create`,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
};

export default function CreateNotePage() {
    return <CreateNotePageClient />;
}
