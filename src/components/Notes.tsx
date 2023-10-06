import React from "react";
import useNotes from "../hooks/useNotes";
import Main from "./Main";
import Header from "./Header";
import Heading from "./Heading";
import { Link } from "react-router-dom";
import NoteItem from "./NoteItem";

const Notes: React.FC = () => {
  const { notes, deleteNote } = useNotes();

  return (
    <Main>
      <Header>
        <Heading>Notes</Heading>
        <Link to={"/new"}>Create Note</Link>
      </Header>
      {notes.map((note, index) => (
        <NoteItem key={note.id + index} deleteNote={deleteNote} note={note} />
      ))}
    </Main>
  );
};

export default Notes;
