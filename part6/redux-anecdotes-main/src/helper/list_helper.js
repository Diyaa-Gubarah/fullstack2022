export const orderByVote = (anecdotes) => {
  return anecdotes.sort((a, b) => b.votes - a.votes);
};
