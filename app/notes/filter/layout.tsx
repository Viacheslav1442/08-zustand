export default function FilterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ padding: "1rem" }}>
            <h1>Фільтрація нотаток</h1>
            <div>{children}</div>
        </div>
    );
}