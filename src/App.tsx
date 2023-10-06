import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Route, Routes, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useNotes, { Note } from "./hooks/useNotes";

const Main = styled.main`
  width: 45rem;
  margin: 2rem auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button``;

const Heading = styled.h1``;

const Article = styled.article`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Form = styled.form`
  width: 45rem;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Label = styled.span``;

const Input = styled.input`
  max-width: 20ch;
`;

const TextArea = styled.textarea`
  max-width: 60ch;
`;

const ArticleHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const ArticleHeading = styled.h3``;

const ArticleBody = styled.div``;

const Modal: React.FC<{
  isActive?: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}> = ({ setIsActive, isActive, children }) => (
  <ModalWrapper onClick={() => setIsActive(false)} isActive={isActive}>
    <ModalBox>{children}</ModalBox>
  </ModalWrapper>
);

const ModalWrapper = styled.div<{ isActive?: boolean }>`
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 1000;
  align-items: center;
  justify-content: center;

  ${({ isActive }) =>
    isActive &&
    `
    display: flex;
  `}
`;

const ModalBox = styled.div`
  top: 25vh;
  background-color: white;
  border: 1px solid black;
  padding: 2rem;
  min-width: 425px;
`;

const NoteItem: React.FC<{
  deleteNote: (id: string) => void;
  note: Note;
}> = ({ deleteNote, note }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  const handleDeleteClick = () => {
    setIsModalActive(true);
  };

  const handleConfirmDeleteClick = () => {
    deleteNote(note.id);
    setIsModalActive(false);
  };

  const handleCancelDeleteClick = () => {
    setIsModalActive(false);
  };

  return (
    <Article>
      <ArticleHeader>
        <ArticleHeading>{note.title}</ArticleHeading>
        <Link to={`/${note.id}`}>(edit)</Link>
        <button onClick={handleDeleteClick}>(delete)</button>
      </ArticleHeader>
      <ArticleBody>{note.body}</ArticleBody>
      <Modal isActive={isModalActive} setIsActive={setIsModalActive}>
        <p>Are you sure you want to delete this?</p>
        <Button onClick={handleConfirmDeleteClick}>Yes!</Button>
        <Button onClick={handleCancelDeleteClick}>No, take me back</Button>
      </Modal>
    </Article>
  );
};

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

const NoteCreateEdit = () => {
  const navigate = useNavigate();
  const { createNote, editNote, note } = useNotes();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    if (!note) return;

    setTitle(note.title);
    setBody(note.body);
  }, [note]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (note === undefined) {
      createNote({ title, body });
    } else {
      editNote({ id: note.id, title, body });
    }

    navigate("/");
  };

  return (
    <>
      <Header>
        <Heading>Create Note</Heading>
        <Link to="/">Back</Link>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Field htmlFor="title">
          <Label>Title</Label>
          <Input
            defaultValue={title}
            onChange={handleTitleChange}
            name="title"
          />
        </Field>
        <Field htmlFor="body">
          <Label>Body</Label>
          <TextArea
            defaultValue={body}
            onChange={handleBodyChange}
            name="body"
          />
        </Field>
        <Button>{note ? "Edit" : "Create"} Note</Button>
      </Form>
    </>
  );
};

function App() {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/new" element={<NoteCreateEdit />} />
        <Route path="/:noteId" element={<NoteCreateEdit />} />
      </Routes>
    </Main>
  );
}

export default App;
