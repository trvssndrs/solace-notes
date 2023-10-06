import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Note } from "../hooks/useNotes";
import Article, { ArticleBody, ArticleHeader, ArticleHeading } from "./Article";
import { Modal } from "./Modal";

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
        <button onClick={handleConfirmDeleteClick}>Yes!</button>
        <button onClick={handleCancelDeleteClick}>No, take me back</button>
      </Modal>
    </Article>
  );
};

export default NoteItem;
