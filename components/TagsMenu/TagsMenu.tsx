"use client";

import Link from "next/link";
import css from "../../css/TagsMenu.module.css";
import { useState } from "react";

const tags = ["work", "personal", "important"];

const TagsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={css.menuContainer}>
            <button
                className={css.menuButton}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                Notes ▾
            </button>
            {isOpen && (
                <ul className={css.menuList}>
                    {tags.map((tag) => (
                        <li key={tag} className={css.menuItem}>
                            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                                {tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TagsMenu;