import "./Blog.css";

import React from "react";
import Togglable from "../Togglable/Togglable";

function Blog({ blog, like, remove }) {
  const togglableRef2 = React.createRef();

  return (
    blog.user && (
      <div className="BlogContainer">
        <p
          style={{
            display: "inline",
            fontSize: "1.25em",
            fontWeight: "bold  ",
          }}
        >
          {blog.title}
          {"    "}
          <button onClick={() => remove(blog)} id="remove-blog">
            remove
          </button>
        </p>
        <Togglable
          ref={togglableRef2}
          buttonLabel="view"
          className="BlogContent"
          id={"viewBlog"}
        >
          <div className="BlogContent">
            <p>{blog.url}</p>
            <p>
              likes {blog.likes}
              <button onClick={() => like(blog)} id="like-blog">
                like
              </button>
            </p>
            <p>added by {blog.user.username}</p>
          </div>
        </Togglable>
      </div>
    )
  );
}

export default Blog;
