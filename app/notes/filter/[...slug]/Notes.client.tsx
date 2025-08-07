interface NotesProps {
    tag?: string;
}

interface Note {
    id: number;
    title: string;
    tags: string[];
}

export default function Notes({ tag }: NotesProps) {
    const notes: Note[] = [
        { id: 1, title: "Note 1", tags: ["Work", "Important"] },
        { id: 2, title: "Note 2", tags: ["Personal"] },
        { id: 3, title: "Note 3", tags: ["Work"] },
    ];

    const filteredNotes =
        tag && tag !== "All"
            ? notes.filter((note) =>
                note.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
            )
            : notes;

    return (
        <div className="notes">
            <h2 className="notes__title">
                Notes {tag ? ` - Filtered by "${tag}"` : ""}
            </h2>
            <ul className="notes__list">
                {filteredNotes.map((note) => (
                    <li key={note.id} className="note">
                        <h3 className="note__title">{note.title}</h3>
                        <ul className="note__tags">
                            {note.tags.map((t) => (
                                <li key={t} className="note__tag">
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}