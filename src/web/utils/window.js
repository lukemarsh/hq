import { eventChannel } from 'redux-saga';

export const windowResizeChannel = () =>
  eventChannel((emitter) => {
    const onResize = (e) => {
      emitter(e);
    };
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  });
