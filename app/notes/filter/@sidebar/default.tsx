import Link from "next/link";

const TAGS = ["All", "work", "personal", "important"] as const;

export default function SidebarDefault() {
    return (
        <aside aria-label="Notes sidebar">
            <nav aria-label="Notes filters">
                <h3>Filters</h3>

                <ul>
                    {TAGS.map((tag) => {
                        const href = tag === "All" ? "/notes" : `/notes/filter/${tag}`;
                        const label =
                            tag === "All"
                                ? "All notes"
                                : tag.charAt(0).toUpperCase() + tag.slice(1);

                        return (
                            <li key={tag}>
                                <Link href={href} className="sidebar__link">
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="sidebar__actions">
                <Link href="/notes" className="sidebar__create">
                    Add note
                </Link>
            </div>
        </aside>
    );
}