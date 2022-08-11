import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import Blog from "./Blog";
import React from "react";

test("renders content", () => {
  const blog = {
    title: "testTitle",
    author: "testAuthor",
    url: "testUrl",
    likes: 0,
  };

  const { container } = render(
    <Blog blog={blog} like={() => {}} remove={() => {}} />
  );
  const p = container.querySelector(".BlogContainer").children[0];
  expect(p.textContent).toContain("testTitle");
});
