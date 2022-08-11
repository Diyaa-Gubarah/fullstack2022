const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === maxLikes);
};

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  const authorCount = authors.reduce((count, author) => {
    count[author] = (count[author] || 0) + 1;
    return count;
  }, {});

  const maxAuthor = Object.keys(authorCount).reduce(
    (a, b) => (authorCount[a] > authorCount[b] ? a : b),
    ""
  );

  return {
    author: maxAuthor,
    blogs: authorCount[maxAuthor],
  };
};

const mostLikes = (blogs) => {
  const authorCount = blogs.reduce(
    (array, blog) => {
      const index = array.findIndex((item) => item.author === blog.author);
      if (index === -1) {
        array.push({ author: blog.author, likes: blog.likes });
      } else {
        array[index].likes += blog.likes;
      }
      return array;
    },
    [{ author: "", likes: 0 }]
  );

  const maxLike = authorCount.reduce(
    (like, item) => (item.likes > like ? item.likes : like),
    0
  );

  return {
    author: authorCount.find((item) => item.likes === maxLike).author,
    likes: maxLike,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
