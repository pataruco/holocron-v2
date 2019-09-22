export const previousSlide = async () => {
  const slider = document.getElementById('slider') as HTMLDeckgoDeckElement;
  if (!slider) {
    return;
  }

  if (window.event) {
    window.event.stopPropagation();
  }

  await slider.slidePrev();
};

export const nextSlide = async () => {
  const slider = document.getElementById('slider') as HTMLDeckgoDeckElement;
  if (!slider) {
    return;
  }

  if (window.event) {
    window.event.stopPropagation();
  }

  await slider.slideNext();
};

export const firstSlide = async () => {
  const slider = document.getElementById('slider') as HTMLDeckgoDeckElement;
  if (!slider) {
    return;
  }

  await slider.slideTo(0, 2000);
};

export const toggleFullScreen = async () => {
  const slider = document.getElementById('slider') as HTMLDeckgoDeckElement;
  if (!slider) {
    return;
  }

  await slider.toggleFullScreen();
};
