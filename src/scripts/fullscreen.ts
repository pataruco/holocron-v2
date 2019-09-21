const initFullscreen = () => {
  return new Promise(resolve => {
    if (!document) {
      resolve();
      return;
    }

    document.addEventListener(
      'mouseInactivity',
      async (event: Event) => {
        const navigation = document.querySelector(
          '#navigation',
        ) as HTMLDeckgoDeckElement;

        if (event && navigation) {
          navigation.style.visibility = (event as any).detail
            ? 'inherit'
            : 'hidden';
        }
      },
      { passive: true },
    );

    resolve();
  });
};

export default initFullscreen;
