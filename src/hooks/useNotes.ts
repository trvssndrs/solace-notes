import { v4 as uuid } from "uuid";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

export type Note = {
  id: string;
  createdAt: string;
  title: string;
  body: string;
};

export type CreateNoteDto = {
  title: string;
  body: string;
};

export type EditNoteDto = {
  id: string;
  title: string;
  body: string;
};

const useNotes = () => {
  const params = useParams();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const localNotes = localStorage.getItem("notes");

    if (localNotes === null) {
      localStorage.setItem("notes", JSON.stringify([]));
      return;
    }

    setNotes(JSON.parse(localNotes));
  }, [setNotes]);

  const createNote = (createNoteDto: CreateNoteDto) => {
    const newNote = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      ...createNoteDto,
    };

    const update = [...notes, newNote];
    localStorage.setItem("notes", JSON.stringify(update));
    setNotes(update);
  };

  const deleteNote = (id: string) => {
    const update = notes.filter((e) => e.id !== id);
    localStorage.setItem("notes", JSON.stringify(update));
    setNotes(update);
  };

  const editNote = (editNoteDto: EditNoteDto) => {
    const update = notes.map((e) =>
      e.id === editNoteDto.id
        ? {
            ...e,
            ...editNoteDto,
          }
        : e,
    );

    localStorage.setItem("notes", JSON.stringify(update));
    setNotes(update);
  };

  const note = useMemo(() => {
    if (!params.noteId) return;
    return notes.find((e) => e.id === params.noteId);
  }, [params, notes]);

  return { createNote, deleteNote, editNote, note, notes };
};

export default useNotes;
