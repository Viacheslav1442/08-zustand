import Notes from '../[...slug]/Notes.client';


type Props = {
    params: Promise<{ slug?: string[] }>;
};





export default async function NotesPage({ params }: Props) {
    const resolvedParams = await params;
    const tag = resolvedParams.slug?.[0];
    return <Notes tag={tag} />;
}