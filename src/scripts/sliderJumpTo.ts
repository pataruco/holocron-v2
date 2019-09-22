class SlidesList extends HTMLElement {
  constructor() {
    super();
  }

  public async connectedCallback() {
    const slidesListActions = await buildSlidesListActions();

    this.innerHTML =
      '<ion-content><ion-list><ion-list-header>Jump to slide</ion-list-header>' +
      slidesListActions +
      '</ion-list></ion-content>';
  }
}

export const buildSlidesListActions = () => {
  return new Promise(async resolve => {
    let result = '';

    const slides = Array.from(document.querySelectorAll(
      '#slider > *',
    ) as NodeListOf<HTMLDeckgoDeckElement>);

    if (slides) {
      let i = 0;

      for (const slide of slides) {
        if (
          slide.tagName &&
          slide.tagName.toLowerCase().indexOf('deckgo-slide') > -1
        ) {
          const text = getSlideTitle(slide, i);

          result +=
            '<ion-item ion-item button onclick="jumpToSlide(' +
            i +
            ')" color="primary"><ion-label>' +
            text +
            '</ion-label></ion-item>';

          i++;
        }
      }
    }

    resolve(result);
  });
};

export const getSlideTitle = (slide: HTMLDeckgoDeckElement, index: number) => {
  if (!slide) {
    return 'Slide ' + (index + 1);
  }

  const title = slide.querySelector('[slot="title"]');

  if (title && title.textContent !== '') {
    return title.textContent;
  } else {
    const start = slide.querySelector('[slot="start"],[slot="header"]');

    if (start && start.textContent !== '') {
      return start.textContent;
    } else {
      const end = slide.querySelector('[slot="end"],[slot="footer"]');

      if (end && end.textContent !== '') {
        return end.textContent;
      } else {
        return 'Slide ' + (index + 1);
      }
    }
  }
};

export const jumpToSlide = async (index: number) => {
  await (document.getElementById('slider') as HTMLDeckgoDeckElement).slideTo(
    index,
    0,
  );
  const popoverController = document.querySelector('ion-popover-controller');
  if (popoverController) {
    await popoverController.dismiss();
  }
};

customElements.define('slides-list', SlidesList);

export const presentSlidePicker = async () => {
  const popoverController = document.querySelector('ion-popover-controller');

  if (!popoverController) {
    return;
  }

  await popoverController.componentOnReady();

  const popover = await popoverController.create({
    component: 'slides-list',
    translucent: true,
  });

  return popover.present();
};
