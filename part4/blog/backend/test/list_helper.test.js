const listHelper = require("../utils/list_helper");
const dummy_blogs = require("../data/dummy");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog equal the like of that", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(dummy_blogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("favorite blog is this blog", () => {
    const result = listHelper.favoriteBlog(dummy_blogs);
    expect(result).toEqual(dummy_blogs[2]);
  });
  
  test('author "Robert C. Martin" has the most blogs', () => {
    const result = listHelper.mostBlogs(dummy_blogs);
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });

  test('author "Edsger W. Dijkstra" has the most likes', () => {
    const result = listHelper.mostLikes(dummy_blogs);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 });
  });
  
});
