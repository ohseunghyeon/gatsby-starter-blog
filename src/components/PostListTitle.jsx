import React from "react";

const PostListTitle = ({ title }) => {
  return (
    <h2 style={{
      textTransform: `uppercase`,
      borderBottom: `0`,
    }}>
      {title}
    </h2>
  )
}

export default PostListTitle
