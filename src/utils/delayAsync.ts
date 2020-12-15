export function delayAsync<T>(milliseconds: number, value: T) {
  return new Promise<T>((resolve) => {
    setTimeout(resolve, milliseconds, value);
  });
}
