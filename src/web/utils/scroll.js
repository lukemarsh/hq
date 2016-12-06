import TinyAnimate from 'TinyAnimate';

export function scrollToYWithEasing(to, duration) {
  const scrollableElement = document.getElementById('panel');

  TinyAnimate.animate(scrollableElement.scrollTop, to, duration, (x) => {
    scrollableElement.scrollTop = x;
  }, 'easeInOutQuad');
}
