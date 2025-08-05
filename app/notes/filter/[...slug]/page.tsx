import Notes from '../[...slug]/Notes.client';


type Props = {
    params: {
        slug?: string[];
    };
};





export default function NotesPage({ params }: Props) {
    const tag = params.slug?.[0];
    return <Notes tag={tag} />;
}