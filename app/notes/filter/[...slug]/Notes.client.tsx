"use client";

import Link from "next/link";
import css from "./NotesClient.module.css";

export default function NotesClient() {
    return (
        <div className={css.header}>
            <h1>Notes</h1>
            <Link href="/notes/action/create" className={css.createButton}>
                + Create note
            </Link>
            {/* Тут твоя логіка відображення списку нотаток */}
        </div>
    );
}
