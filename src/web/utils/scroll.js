import TinyAnimate from 'TinyAnimate';

export function scrollToYWithEasing(scrollableElement, to, duration) {
  TinyAnimate.animate(scrollableElement.scrollTop, to, duration, (x) => {
    scrollableElement.scrollTop = x; //eslint-disable-line
  }, 'easeInOutQuad');
}
