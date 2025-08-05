import Notes from '../[...slug]/Notes.client';

interface PageProps {
    params: { slug?: string[] };
}

export default function NotesPage({ params }: PageProps) {
    const tag = params.slug?.[0];
    return <Notes tag={tag} />;
}