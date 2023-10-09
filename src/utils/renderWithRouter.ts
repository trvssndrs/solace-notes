import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";

export default (ui: React.ReactElement, { route = "/" } = {}) => {
  window.history.pushState({}, "", route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};
