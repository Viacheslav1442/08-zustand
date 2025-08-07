"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { FetchNoteResponse, Note, NoteTag } from "@/types/note";

interface NotesClientProps {
    initialData: FetchNoteResponse;
    tag: NoteTag | string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
    const [currentPage] = useState(1);
    const [searchQuery] = useState("");

    const { data } = useQuery<FetchNoteResponse>({
        queryKey: ["notes", searchQuery, currentPage, tag],
        queryFn: () =>
            fetchNotes(currentPage, 12, searchQuery, tag !== "All" ? tag : "All"),
        initialData,
        placeholderData: () => initialData,
    });

    return (
        <div>
            <h2>Notes filtered by &quot;{tag}&quot;</h2>

            <ul>
                {data?.notes.map((note: Note) => (
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <ul>
                            {note.tags.map((t) => (
                                <li key={t}>{t}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}