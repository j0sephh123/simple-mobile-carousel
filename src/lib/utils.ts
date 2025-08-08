export const isNetworkError = (e: unknown) => {
  const msg =
    typeof e === "object" && e && "message" in e
      ? String((e as any).message).toLowerCase()
      : "";
  return /network|fetch|connection|timeout/.test(msg);
};
