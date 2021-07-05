export default function throttle(func, delay = 300) {
  let timer;
  return (...args) => {
    if (timer) return;

    timer = setTimeout(() => {
      func.apply(this, args);
      timer = null;
    }, delay);
  };
}
