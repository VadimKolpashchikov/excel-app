import { $ } from '@core/dom';

const MIN_WIDTH = 40;
const MIN_HEIGHT = 20;

function resizeWidth(coordX, resizer, initCoords) {
  const delta = coordX - initCoords.right;
  const value = initCoords.width + delta;

  if (MIN_WIDTH <= value) {
    resizer.css({ right: `${-delta}px` });
    return value;
  }

  return MIN_WIDTH;
}

function resizeHeight(coordY, resizer, initCoords) {
  const delta = coordY - initCoords.bottom;
  const value = initCoords.height + delta;

  if (MIN_HEIGHT <= value) {
    resizer.css({ bottom: `${-delta}px` });
    return value;
  }

  return MIN_HEIGHT;
}

/* eslint-disable import/prefer-default-export */
export function resizeHandler(root, event) {
  const resizeType = event.target.dataset.resize;
  const resizer = $(event.target);
  const resizerParent = resizer.closest('[data-type="resizable"]');
  const initCoords = resizerParent.coords;
  let value;

  resizer.addClass('active')
    .css({ opacity: 1 });

  document.onmousemove = (e) => {
    if (resizeType === 'col') {
      value = resizeWidth(e.pageX, resizer, initCoords);
    } else if (resizeType === 'row') {
      value = resizeHeight(e.pageY, resizer, initCoords);
    }
  };

  document.onmouseup = () => {
    if (resizeType === 'col') {
      root.findAll(`[data-col="${resizerParent.data.col}"]`)
        .forEach((el) => {
          el.css({ width: `${value}px` });
        });
    } else if (resizeType === 'row') {
      resizerParent.css({ height: `${value}px` });
    }

    resizer.removeClass('active')
      .css({ right: 0, bottom: 0, opacity: 0 });
    document.onmousemove = null;
    document.onmouseup = null;
  };
}
