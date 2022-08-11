import "./FormContainer.css";

import Input from "../Input/Input";
import React from "react";

function FormContainer({ createBlog }) {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [url, setUrl] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const blog = {
      title,
      author,
      url,
    };
    createBlog(blog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="FormContainerMain">
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit} className="FormContainer">
        <Input
          label="Title"
          type={"text"}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          id={"title"}
        />
        <Input
          label="Author"
          type={"text"}
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
          id={"author"}
        />
        <Input
          label="Url"
          type={"text"}
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          id={"url"}
        />

        <button type="submit" id="create">
          Create
        </button>
      </form>
    </div>
  );
}

export default FormContainer;
