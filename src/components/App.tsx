import { Route, Routes } from "react-router";
import Header from "./Header";
import Logo from "./Logo";
import Main from "./Main";
import Nav from "./Nav";
import NoteEdit from "./NoteEdit";
import Notes from "./Notes";

function App() {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <Main>
        <Nav />
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/new" element={<NoteEdit />} />
          <Route path="/:noteId" element={<NoteEdit />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
