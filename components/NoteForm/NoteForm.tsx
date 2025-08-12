"use client";

import { FormEvent, useEffect, useState } from "react";
import { useNoteStore } from "../../lib/store/noteStore";
import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";

export default function NoteForm() {
    const router = useRouter();
    const { draft, setDraft, clearDraft } = useNoteStore();

    const [form, setForm] = useState(draft);

    useEffect(() => {
        setForm(draft);
    }, [draft]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const updated = { ...form, [name]: value };
        setForm(updated);
        setDraft({ [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {

            console.log("Creating note:", form);
            clearDraft();
            router.back();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <label className={css.label}>
                Title:
                <input
                    className={css.input}
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                />
            </label>

            <label className={css.label}>
                Content:
                <textarea
                    className={css.textarea}
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                />
            </label>

            <label className={css.label}>
                Tag:
                <select
                    className={css.select}
                    name="tag"
                    value={form.tag}
                    onChange={handleChange}
                >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                </select>
            </label>

            <div className={css.actions}>
                <button type="submit" className={css.button}>
                    Save
                </button>
                <button type="button" className={css.buttonCancel} onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}
