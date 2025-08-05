import Notes from '../../../../app/notes/Notes.client';

export default function NotesPage({ params }: { params: { slug?: string[] } }) {
    const tag = params.slug?.[0]; // або undefined для "All notes"
    return <Notes tag={tag} />;
}