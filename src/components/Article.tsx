import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const ArticleHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

export const ArticleHeading = styled.h3`
  margin: 0;
  font-family: "Mollie Glaston";
  font-size: 1.625rem;
  font-weight: 400;
  color: rgb(16, 16, 16);
  letter-spacing: 0.005em;
`;

export const ArticleHeadingLink = styled(Link)`
  cursor: pointer;
  color: rgb(16, 16, 16);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    text-decoration: none;
    color: rgb(16, 16, 16);
    opacity: 0.8;
  }
`;

export const ArticleSubheading = styled.h4`
  margin: 0;
  color: rgb(85, 85, 85);
  font-style: normal;
  font-weight: 400;
  margin: 0px;
  font-feature-settings: "liga", "kern";
  text-align: unset;
  font-size: 1rem;
`;

export const ArticleBody = styled.p`
  font-style: normal;
  font-weight: 400;
  margin: 0;
  font-size: 1rem;
  line-height: 1.25;
  color: rgb(31, 33, 33);
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border: 1.5px solid transparent;
  background-color: rgb(255, 255, 255);

  &:not(:last-child) {
    border-bottom: 1px solid rgb(190, 211, 204);
    padding-bottom: 2.25rem;
    margin-bottom: 2.25rem;
  }
`;

export default Article;
