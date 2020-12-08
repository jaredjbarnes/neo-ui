const joinClassNames = (...args: (string | undefined | null)[]) => {
  const className = args
    .map((a) => a?.trim())
    .filter((a) => a != null)
    .join(" ");

  return className;
};

export default joinClassNames;
