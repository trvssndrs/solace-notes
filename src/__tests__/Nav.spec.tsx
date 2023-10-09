import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Nav from "../components/Nav";
import renderWithRouter from "../utils/renderWithRouter";

const mockSetSearchParams = jest.fn();
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useSearchParams: () => [new URLSearchParams(), mockSetSearchParams],
}));

describe("Nav", () => {
  describe("on the index screen", () => {
    it("provides a search input with which to search the notes", async () => {
      renderWithRouter(<Nav />);
      const searchInput = await screen.findByRole("searchbox");

      fireEvent.change(searchInput, {
        target: {
          value: "Lorem ipsum dolor sit amet",
        },
      });

      expect(mockSetSearchParams).toHaveBeenCalledWith({
        s: "Lorem ipsum dolor sit amet",
      });
    });
    it('provides a "new" link with which to create a new note', async () => {
      renderWithRouter(<Nav />);
      const newLink = await screen.findByRole("link");

      fireEvent.click(newLink);

      await screen.findByText(/Back/);
    });
  });

  describe("on the new/edit note screens", () => {
    it('provides a "back" link with which to return to the index', async () => {
      renderWithRouter(<Nav />, { route: "/new" });
      const backLink = await screen.findByText(/Back/);

      fireEvent.click(backLink);

      await screen.findByText(/New/);
    });
  });
});
