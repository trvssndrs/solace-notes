import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import useNotes from "../hooks/useNotes";
import NoteItem from "./NoteItem";
import Section from "./Section";

const Heading = styled.h3``;

const Notes: React.FC = () => {
  const { notes } = useNotes();
  const [searchParams] = useSearchParams();

  const s = useMemo(() => searchParams.get("s"), [searchParams]);

  const filteredNotes = useMemo(() => {
    if (!s) return notes;

    return notes.filter(({ title, body }) => {
      return body.includes(s) || title.includes(s);
    });
  }, [notes, s]);

  return (
    <Section>
      {s && <Heading>Searching for: "{s}"</Heading>}
      {filteredNotes.length ? (
        filteredNotes.map((note, index) => (
          <NoteItem key={note.id + index} note={note} />
        ))
      ) : (
        <>{s ? "No notes found." : "No notes created yet."}</>
      )}
    </Section>
  );
};

export default Notes;
