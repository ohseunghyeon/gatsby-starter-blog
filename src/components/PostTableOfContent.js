import React from "react";
import styled from "styled-components";

const TOC = styled.div`
  display: none;
  @media screen and (min-width: 1280px) {
    display: block;
  }
  position: fixed;
  top: 3.25rem;
  right: 10px;
  white-space: nowrap;
  font-size: 0.9em;
  width: calc((100vw - 228px - 39rem) / 2 - 2.03125rem);
  overflow: hidden;
  ol, ul {
    list-style: none;
    margin-left: 1.015625rem;
    margin-bottom: 0;
    li {
      margin-bottom: 0.2em;
      a {
        color: inherit;
      }
    }
  }
  border-left: 5px solid var(--border-color);
`;

const PostTableOfContent = ({ tableOfContents }) => {
  return (
    <TOC dangerouslySetInnerHTML={{ __html: tableOfContents }} />
  )
}

export default PostTableOfContent;

