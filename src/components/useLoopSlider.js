import { useEffect, useRef, useState } from "react";

const DRAG_THRESHOLD = 50;

const nextFrame = (callback) =>
  requestAnimationFrame(() => requestAnimationFrame(callback));

// Index logic for a looping slider. Render the slides twice and move the track
// by `index` steps; the hook jumps back by `count` unseen once a lap completes.
export default function useLoopSlider(count, autoplayMs) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStart = useRef(null);

  // Jump to `from` instantly, then slide to `to`.
  const jumpThenSlide = (from, to) => {
    setAnimate(false);
    setIndex(from);
    nextFrame(() => {
      setAnimate(true);
      setIndex(to);
    });
  };

  const next = () =>
    index >= count
      ? jumpThenSlide(index - count, index - count + 1)
      : setIndex(index + 1);

  const prev = () =>
    index <= 0 ? jumpThenSlide(count, count - 1) : setIndex(index - 1);

  const goTo = (slide) => setIndex(slide);

  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget || index < count) return;
    setAnimate(false);
    setIndex(index - count);
    nextFrame(() => setAnimate(true));
  };

  // Mouse drag and touch swipe: follow the pointer, then settle on release.
  const endDrag = () => {
    if (dragStart.current === null) return;
    dragStart.current = null;
    if (dragOffset <= -DRAG_THRESHOLD) next();
    else if (dragOffset >= DRAG_THRESHOLD) prev();
    setDragOffset(0);
  };

  const dragProps = {
    onPointerDown: (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragStart.current = event.clientX;
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    onPointerMove: (event) => {
      if (dragStart.current === null) return;
      setDragOffset(event.clientX - dragStart.current);
    },
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onDragStart: (event) => event.preventDefault(),
  };

  const dragging = dragOffset !== 0;

  useEffect(() => {
    if (!autoplayMs || paused || dragging) return;
    const timer = setInterval(next, autoplayMs);
    return () => clearInterval(timer);
  });

  return {
    index,
    active: index % count,
    animate: animate && !dragging,
    trackStyle: {
      transform: `translateX(calc(var(--step) * ${-index} + ${dragOffset}px))`,
    },
    dragProps,
    next,
    prev,
    goTo,
    handleTransitionEnd,
    setPaused,
  };
}
