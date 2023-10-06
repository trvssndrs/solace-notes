import { styled } from "styled-components";

export const ArticleHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const ArticleHeading = styled.h3``;

export const ArticleBody = styled.div``;

const Article = styled.article`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export default Article;
