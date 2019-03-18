export const generateId4 = () =>
  Array(4)
    .fill(false)
    .map(() =>
      Math.random()
        .toString(32)
        .slice(2)
    )
    .join("-")
