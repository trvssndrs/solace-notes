import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import NoteEdit from "../components/NoteEdit";
import renderWithRouter from "../utils/renderWithRouter";
import { faker } from "@faker-js/faker";
import { mockNotes } from "./Notes.spec";
import { MemoryRouter, Route, Routes } from "react-router";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

describe("NoteEdit", () => {
  describe("when note is not yet created", () => {
    it("prevents save when fields are invalid and shows errors", async () => {
      renderWithRouter(<NoteEdit />, { route: "/new" });

      const submit = screen.getByRole("button");

      await act(() => fireEvent.click(submit));

      expect(
        screen.queryByText("Title must be at least 1 character"),
      ).toBeInTheDocument();

      expect(
        screen.queryByText("Note must be at least 20 characters"),
      ).toBeInTheDocument();
    });
    it("saves the note when fields are valid and save is clicked", () => {
      renderWithRouter(<NoteEdit />, { route: "/new" });
      const titleField = screen.getByRole("textbox", {
        name: /Create a title/,
      });
      const bodyField = screen.getByRole("textbox", { name: /Write the note/ });
      const submitButton = screen.getByRole("button");

      const title = faker.lorem.words(5);
      fireEvent.change(titleField, {
        target: {
          value: title,
        },
      });

      const body = faker.lorem.words(10);
      fireEvent.change(bodyField, {
        target: {
          value: body,
        },
      });

      fireEvent.click(submitButton);

      expect(mockUseNavigate).toHaveBeenCalledWith("/");
      expect(
        JSON.parse(window.localStorage.getItem("notes") || ""),
      ).toContainEqual({
        id: expect.any(String),
        createdAt: expect.any(String),
        title: expect.stringMatching(title),
        body: expect.stringMatching(body),
      });
    });
  });

  describe("when note is being edited", () => {
    const mockedNotes = mockNotes(1);

    beforeEach(() => {
      localStorage.setItem("notes", JSON.stringify(mockedNotes));
    });

    it("shows fields with note values", async () => {
      render(
        <MemoryRouter initialEntries={[`/${mockedNotes[0].id}`]}>
          <Routes>
            <Route path="/:noteId" element={<NoteEdit />} />
          </Routes>
        </MemoryRouter>,
      );
      const titleField = screen.getByRole("textbox", {
        name: /Create a title/,
      });
      const bodyField = screen.getByRole("textbox", { name: /Write the note/ });

      expect(titleField.closest("input")?.value).toEqual(mockedNotes[0].title);
      expect(bodyField.closest("textarea")?.value).toEqual(mockedNotes[0].body);
    });

    it("provides a button for deleting the note", async () => {
      render(
        <MemoryRouter initialEntries={[`/${mockedNotes[0].id}`]}>
          <Routes>
            <Route path="/:noteId" element={<NoteEdit />} />
          </Routes>
        </MemoryRouter>,
      );

      const deleteButton = await screen.findByRole("button", {
        name: /Delete/,
      });
      fireEvent.click(deleteButton);

      await screen.findByText(/Are you sure/);

      const cancelDeleteButton = await screen.findByRole("button", {
        name: /No, cancel/,
      });
      fireEvent.click(cancelDeleteButton);

      expect(screen.queryByText(/Are you sure/)).not.toBeInTheDocument();
      expect(
        JSON.parse(window.localStorage.getItem("notes") || ""),
      ).toContainEqual({
        id: expect.any(String),
        createdAt: expect.any(String),
        title: expect.stringMatching(mockedNotes[0].title),
        body: expect.stringMatching(mockedNotes[0].body),
      });

      fireEvent.click(deleteButton);

      const confirmDeleteButton = await screen.findByRole("button", {
        name: /Yes, delete/,
      });
      fireEvent.click(confirmDeleteButton);

      expect(mockUseNavigate).toHaveBeenCalledWith("/");
      expect(JSON.parse(window.localStorage.getItem("notes") || "")).toEqual(
        [],
      );
    });
  });
});
