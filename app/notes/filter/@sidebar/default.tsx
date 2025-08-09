import Link from "next/link";

const TAGS = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export default function SidebarDefault() {
    return (
        <aside aria-label="Notes sidebar">
            <nav aria-label="Notes filters">
                <h3>Filters</h3>

                <ul>
                    {TAGS.map((tag) => {
                        const href = `/notes/filter/${tag}`;
                        const label = tag === "All" ? "All notes" : tag;

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
