const world = "world";

export const hello = (who: string = world) => {
  return `Hello, ${who}!`;
};
