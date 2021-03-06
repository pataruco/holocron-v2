export const postLoadingJumpTo = () => {
  return new Promise(async resolve => {
    const slider = document.getElementById('slider') as HTMLDeckgoDeckElement;

    if (slider) {
      slider.addEventListener('slidesDidLoad', async () => {
        await jumpToSlideIndexWithUrl(0);
      });
    }

    resolve();
  });
};

export const initDeckHistoryWatch = () => {
  return new Promise(async resolve => {
    const slider = document.getElementById('slider') as HTMLDeckgoDeckElement;

    if (slider) {
      slider.addEventListener('slideNextDidChange', async () => {
        await pushStateSlideIndex(slider);
      });

      slider.addEventListener('slidePrevDidChange', async () => {
        await pushStateSlideIndex(slider);
      });

      slider.addEventListener('slideToChange', async event => {
        await pushStateSlideIndex(slider);
      });
    }

    if (window) {
      window.onpopstate = async () => {
        await jumpToSlideIndexWithUrl(300);
      };
    }

    resolve();
  });
};

export const pushStateSlideIndex = async (slider: HTMLDeckgoDeckElement) => {
  if (!history) {
    return;
  }

  const index = await slider.getActiveIndex();

  const url = new URL(window.location.href);
  const urlIndex = url && url.searchParams ? url.searchParams.get('index') : -1;

  if (
    (urlIndex === null || parseInt(String(urlIndex), 0) !== index) &&
    index >= 0
  ) {
    history.pushState(
      { slideIndex: index },
      '',
      index > 0 ? '?index=' + index : '',
    );
  }
};

export const jumpToSlideIndexWithUrl = async (speed: number) => {
  const url = new URL(window.location.href);
  const index = url && url.searchParams ? url.searchParams.get('index') : -1;

  if (index === null || parseInt(String(index), 0) >= 0) {
    const slider = document.getElementById('slider') as HTMLDeckgoDeckElement;

    if (!slider) {
      return;
    }

    await slider.slideTo(
      index === null ? 0 : parseInt(String(index), 0),
      speed,
    );
  }
};
