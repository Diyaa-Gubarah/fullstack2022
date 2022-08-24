export const BAD = "BAD";
export const GOOD = "GOOD";
export const OK = "OK";
export const RESET = "RESET";

export const badAction = () => {
  return {
    type: BAD,
  };
};

export const goodAction = () => {
  return {
    type: GOOD,
  };
};

export const okAction = () => {
  return {
    type: OK,
  };
};

export const resetAction = () => {
  return {
    type: RESET,
  };
};
