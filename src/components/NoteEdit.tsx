import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useNotes from "../hooks/useNotes";
import Button from "./Button";
import Form, { Field, Input, Label, TextArea } from "./Form";
import Header from "./Header";
import Heading from "./Heading";

const NoteEdit = () => {
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
        <Button>Submit</Button>
      </Form>
    </>
  );
};

export default NoteEdit;
