import { v4 as uuid } from "uuid";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import Notes from "../components/Notes";
import renderWithRouter from "../utils/renderWithRouter";
import { faker } from "@faker-js/faker";
import { Note } from "../hooks/useNotes";

export const mockNotes: (length: number) => Note[] = (length = 1) =>
  Array.from({ length }, () => ({
    id: uuid(),
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    title: faker.lorem.lines(1),
    body: faker.lorem.paragraph(1),
  }));

describe("Notes", () => {
  it("displays empty list when there are no persisted notes", () => {
    renderWithRouter(<Notes />);
    expect(screen.getByText(/No notes created yet./)).toBeInTheDocument();
  });

  it("displays all persisted notes", () => {
    const mockedNotes = mockNotes(10);
    window.localStorage.setItem("notes", JSON.stringify(mockedNotes));

    renderWithRouter(<Notes />);

    expect(screen.queryByText(/No notes created yet./)).not.toBeInTheDocument();
    expect(screen.queryByText(mockedNotes[0].title)).toBeInTheDocument();
    expect(screen.queryByText(mockedNotes[9].title)).toBeInTheDocument();
  });

  it("displays persisted notes filtered against search params", () => {
    const mockedNotes = mockNotes(10);
    const mockTitle = "A title matching the query";
    const mockBody = "Note content matching the search query";
    mockedNotes[5].title = mockTitle;
    mockedNotes[4].body = mockBody;

    window.localStorage.setItem("notes", JSON.stringify(mockedNotes));

    let searchQuery = new URLSearchParams({ s: mockTitle }).toString();
    renderWithRouter(<Notes />, { route: `/?${searchQuery}` });

    expect(screen.queryByText(mockedNotes[5].body)).toBeInTheDocument();

    searchQuery = new URLSearchParams({ s: mockBody }).toString();
    renderWithRouter(<Notes />, { route: `/?${searchQuery}` });

    expect(screen.queryByText(mockedNotes[4].title)).toBeInTheDocument();

    expect(screen.queryByText(mockedNotes[0].title)).not.toBeInTheDocument();
  });
});
