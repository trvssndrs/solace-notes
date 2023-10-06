import React from "react";
import { Route, Routes } from "react-router";
import Main from "./Main";
import NoteEdit from "./NoteEdit";
import Notes from "./Notes";

function App() {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/new" element={<NoteEdit />} />
        <Route path="/:noteId" element={<NoteEdit />} />
      </Routes>
    </Main>
  );
}

export default App;
