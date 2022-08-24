import React, { useRef } from "react";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
  sortByLikes,
} from "./utils/helper";

import Blog from "./components/Blog/Blog";
import FormContainer from "./components/FormContainer/FormContainer";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Notification from "./components/Notification/Notification";
import Togglable from "./components/Togglable/Togglable";
import blogService from "./services/blog";
import loginService from "./services/login";

function App() {
  const togglableRef = useRef();

  const [user, setUser] = React.useState(null);
  const [error, setErrorMessage] = React.useState("");
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    const fetch = async (token) => {
      try {
        const blogs = await blogService.getAll(token);
        setBlogs(sortByLikes(blogs));
      } catch (error) {
        setErrorMessage(error);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    };
    if (user) {
      fetch(user.token);
    }
  }, [user]);

  // Check if user is logged in
  React.useEffect(() => {
    const user = getFromLocalStorage("user");
    if (user) {
      setUser(user);
    }
  }, []);

  const handleLogin = async (data) => {
    try {
      const user = await loginService.login(data);
      if (user.token) {
        setUser(user);
        setToLocalStorage("user", user);
      } else {
        setErrorMessage(user.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    setUser(null);
    removeFromLocalStorage("user");
  };

  const like = async (blog) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
      userId: blog.user.id,
    };
    try {
      const updatedBlog = await blogService.update(
        blog.id,
        newBlog,
        user.token
      );
      if (updatedBlog?.error) {
        setErrorMessage(updatedBlog.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      } else {
        setBlogs(
          sortByLikes(blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)))
        );
      }
    } catch (exception) {
      console.log(`like exception: ${exception}`);
      setErrorMessage("Blog update failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const createBlog = async (data) => {
    try {
      const newBlog = await blogService.create(data, user.token);
      setBlogs((blogs) => blogs.concat(newBlog));
      if (togglableRef.current.toggle()) {
        togglableRef.current.toggle(); // toggle come from Togglable component by forwardRef
      }
    } catch (exception) {
      setErrorMessage("Blog creation failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const remove = async (blog) => {
    const result = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (result) {
      try {
        const response = await blogService.remove(blog.id, user.token);
        if (response?.error) {
          setErrorMessage(response.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        } else {
          setBlogs(blogs.filter((b) => b.id !== blog.id));
        }
      } catch (error) {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    }
  };

  if (!user) {
    return (
      <>
        {error && <Notification message={error} type="error" />}
        <Togglable buttonLabel={"Login"}>
          <Login handleLogin={handleLogin} />
        </Togglable>
      </>
    );
  }

  return (
    <div id="App">
      {error && <Notification message={error} type="error" />}

      <br />

      <Logout user={user} handleLogout={handleLogout} />

      <h2>blogs</h2>
      <div id="blogDiv">
      {blogs.length &&
        blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            remove={() => remove(blog)}
            
          />
        ))}
      </div>
      <br />
      <Togglable ref={togglableRef} buttonLabel={"Create Blog"}>
        <FormContainer createBlog={createBlog} />
      </Togglable>
      <br />
    </div>
  );
}

export default App;
