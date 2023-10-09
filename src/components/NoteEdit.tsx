import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useNotes from "../hooks/useNotes";
import Button from "./Button";
import Form, {
  Field,
  FieldError,
  Group,
  Input,
  Label,
  SubLabel,
  TextArea,
} from "./Form";
import { Modal, ModalGroup, ModalMessage } from "./Modal";

const NoteEdit = () => {
  const navigate = useNavigate();
  const { createNote, editNote, deleteNote, note } = useNotes();
  const [invalidations, setInvalidations] = useState<{
    submitted?: boolean;
    title?: string;
    body?: string;
  }>({});
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isDeleteModalActive, setIsDeleteModalActive] =
    useState<boolean>(false);

  useEffect(
    function setValidationsFromFormChange() {
      if (title.length < 1) {
        setInvalidations((invalidations) => ({
          ...invalidations,
          title: "Title must be at least 1 character",
        }));
      } else {
        setInvalidations((invalidations) => ({
          ...invalidations,
          submitted: undefined,
          title: undefined,
        }));
      }

      if (body.length < 20) {
        setInvalidations((invalidations) => ({
          ...invalidations,
          body: "Note must be at least 20 characters",
        }));
      } else if (body.length > 300) {
        setInvalidations((invalidations) => ({
          ...invalidations,
          body: "Note must be less than 300 characters",
        }));
      } else {
        setInvalidations((invalidations) => ({
          ...invalidations,
          submitted: undefined,
          body: undefined,
        }));
      }
    },
    [title, body],
  );

  useEffect(
    function setFieldsFromPersistedNote() {
      if (!note) return;

      setTitle(note.title);
      setBody(note.body);
    },
    [note],
  );

  const hasInvalidFields = useMemo(
    function hasInvalidFields() {
      return Object.values(invalidations).some((e) => e !== undefined);
    },
    [invalidations],
  );

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (hasInvalidFields) {
      setInvalidations((invalidations) => ({
        ...invalidations,
        submitted: true,
      }));
      return;
    }

    if (note === undefined) {
      createNote({ title, body });
    } else {
      editNote({ id: note.id, title, body });
    }

    navigate("/");
  };

  const handleCancelClick = () => {
    setIsDeleteModalActive(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalActive(true);
  };

  const handleDeleteConfirmClick = () => {
    deleteNote();
    navigate("/");
  };

  return (
    <>
      <Form role="form" onSubmit={handleSubmit}>
        <Field htmlFor="title">
          <Label>Create a title for your note</Label>
          <SubLabel>
            Make a descriptive title that includes keywords for finding the note
            later
          </SubLabel>
          <Input
            value={title}
            onChange={handleTitleChange}
            name="title"
            id="title"
          />
          {invalidations.submitted && invalidations.title && (
            <FieldError>{invalidations.title}</FieldError>
          )}
        </Field>
        <Field htmlFor="body">
          <Label>Write the note</Label>
          <SubLabel>
            Be sure to include at least 20 characters but no more than 300
            characters
          </SubLabel>
          <TextArea
            value={body}
            onChange={handleBodyChange}
            name="body"
            id="body"
          />
          {invalidations.submitted && invalidations.body && (
            <FieldError>{invalidations.body}</FieldError>
          )}
        </Field>
        <Group>
          {note && (
            <Button
              type="button"
              $variant="secondary"
              onClick={handleDeleteClick}
            >
              Delete Note
            </Button>
          )}
          <Button type="submit">Save Note</Button>
        </Group>
      </Form>
      {isDeleteModalActive && (
        <Modal setIsActive={setIsDeleteModalActive}>
          <ModalMessage>
            Are you sure you want to delete this note?
          </ModalMessage>
          <ModalGroup>
            <Button type="button" onClick={handleCancelClick}>
              No, cancel
            </Button>
            <Button
              type="button"
              $variant="secondary"
              onClick={handleDeleteConfirmClick}
            >
              Yes, delete
            </Button>
          </ModalGroup>
        </Modal>
      )}
    </>
  );
};

export default NoteEdit;
