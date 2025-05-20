export function debounce(callback, delay = 300) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(value), delay);
  };
}
