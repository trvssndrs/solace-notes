import React from "react";
import dayjs from "dayjs";
import { Note } from "../hooks/useNotes";
import Article, {
  ArticleBody,
  ArticleHeader,
  ArticleHeading,
  ArticleHeadingLink,
  ArticleSubheading,
} from "./Article";

const NoteItem: React.FC<{
  note: Note;
}> = ({ note }) => (
  <Article>
    <ArticleHeader>
      <ArticleHeading>
        <ArticleHeadingLink to={note.id}>{note.title}</ArticleHeadingLink>
      </ArticleHeading>
      <ArticleSubheading>
        {dayjs(note.createdAt).format("MMM D, YYYY h:mm a")}
      </ArticleSubheading>
    </ArticleHeader>
    <ArticleBody>{note.body}</ArticleBody>
  </Article>
);

export default NoteItem;
