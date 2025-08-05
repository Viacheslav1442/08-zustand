import Notes from '../[...slug]/Notes.client';

interface PageProps {
    params: { slug?: string[] } | Promise<{ slug?: string[] }>;
}

export default async function NotesPage({ params }: PageProps) {
    const resolvedParams = params instanceof Promise ? await params : params;
    const tag = resolvedParams.slug?.[0];
    return <Notes tag={tag} />;
}