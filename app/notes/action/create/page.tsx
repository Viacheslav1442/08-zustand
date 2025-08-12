"use client";

import { useRouter } from "next/navigation";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNotePage.module.css";


const baseUrl = process.env.BASE_URL;

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
    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm onClose={handleClose} />
            </div>
        </main>
    );
}
