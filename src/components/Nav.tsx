import { ChangeEvent, useMemo } from "react";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import { Field, Input, Label } from "./Form";

const NavLink = styled(Link)`
  color: rgb(29, 67, 57);
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  min-height: 1rem;
`;

const Nav = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const s = useMemo(() => searchParams.get("s") || "", [searchParams]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ s: e.target.value });
  };

  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Field htmlFor="search">
                <Label>Search</Label>
                <Input
                  id="search"
                  name="search"
                  type="search"
                  defaultValue={s}
                  onChange={handleSearchChange}
                />
              </Field>
              <NavLink to="/new">New +</NavLink>
            </>
          }
        />
        <Route path="/:noteId" element={<NavLink to="/">← Back</NavLink>} />
      </Routes>
    </Container>
  );
};

export default Nav;
