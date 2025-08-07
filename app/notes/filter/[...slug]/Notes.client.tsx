interface NotesProps {
    tag?: string;
}

export default function Notes({ tag }: NotesProps) {
    const notes = [
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
        <div>
            <h2>Notes {tag ? ` - Filtered by "${tag}"` : ""}</h2>
            <ul>
                {filteredNotes.map((note) => (
                    <li key={note.id}>{note.title}</li>
                ))}
            </ul>
        </div>
    );
}