import '@ionic/core/css/ionic.bundle.css';
import './css/alert.css';
import './css/button.css';
import './css/deck.css';
import './css/font.css';
import './css/img.css';
import './css/modal.css';
import './css/pager.css';
import './css/popover.css';
import './css/print.css';
import './css/rtl.css';
import './css/theme.css';
import './css/variables.css';

import '@webcomponents/custom-elements';

import * as manifestData from './manifest.json';
declare global {
  interface Window {
    ROOM_NAME: any;
    ResizeObserver: any;
  }
}

// lifting methods to the global
const setGlobal = (object: { [key: string]: any }) =>
  Object.entries(object).map(
    ([key, value]) => ((window as { [key: string]: any })[key] = value),
  );

window.ROOM_NAME = manifestData.name;

import initActions from './scripts/actions';
import initFullscreen from './scripts/fullscreen';
import { initDeckHistoryWatch, postLoadingJumpTo } from './scripts/history';
import postLoading from './scripts/loading';
import * as menu from './scripts/menu';
import * as modalNotes from './scripts/modalNotes';
import * as resize from './scripts/resize';
import * as sliderMethods from './scripts/slider';
import * as sliderJumpToMethods from './scripts/sliderJumpTo';

setGlobal(sliderMethods);
setGlobal(sliderJumpToMethods);
setGlobal(modalNotes);
setGlobal(resize);
setGlobal(menu);

import { defineCustomElements as ionicElements } from '@ionic/core/loader';
ionicElements(window);

import { defineCustomElements as ioniconsElements } from 'ionicons/dist/loader';
ioniconsElements(window);

// Init DeckDeckGo elements
import { defineCustomElements as deckDeckGoElements } from '@deckdeckgo/core/dist/loader';

import { defineCustomElements as deckDeckGoSlideAuthorElements } from '@deckdeckgo/slide-author/dist/loader';
import { defineCustomElements as deckDeckGoSlideBigImgElements } from '@deckdeckgo/slide-big-img/dist/loader';
import { defineCustomElements as deckDeckGoSlideChartElements } from '@deckdeckgo/slide-chart/dist/loader';
import { defineCustomElements as deckDeckGoSlideCodeElements } from '@deckdeckgo/slide-code/dist/loader';
import { defineCustomElements as deckDeckGoSlideContentElements } from '@deckdeckgo/slide-content/dist/loader';
import { defineCustomElements as deckDeckGoSlideCountdownElements } from '@deckdeckgo/slide-countdown/dist/loader';
import { defineCustomElements as deckDeckGoSlideGifElements } from '@deckdeckgo/slide-gif/dist/loader';
import { defineCustomElements as deckDeckGoSlideQRCodeElements } from '@deckdeckgo/slide-qrcode/dist/loader';
import { defineCustomElements as deckDeckGoSlideSplitElements } from '@deckdeckgo/slide-split/dist/loader';
import { defineCustomElements as deckDeckGoSlideTitleElements } from '@deckdeckgo/slide-title/dist/loader';
import { defineCustomElements as deckDeckGoSlideVideoElements } from '@deckdeckgo/slide-video/dist/loader';
import { defineCustomElements as deckDeckGoSlideYoutubeElements } from '@deckdeckgo/slide-youtube/dist/loader';

import { defineCustomElements as deckDeckGoChartsElements } from '@deckdeckgo/charts/dist/loader';
import { defineCustomElements as deckDeckGoHighlightCodeElements } from '@deckdeckgo/highlight-code/dist/loader';
import { defineCustomElements as deckDeckGoLazyImgElements } from '@deckdeckgo/lazy-img/dist/loader';
import { defineCustomElements as deckDeckGoQRCodeElements } from '@deckdeckgo/qrcode/dist/loader';
import { defineCustomElements as deckDeckGoRemoteElements } from '@deckdeckgo/remote/dist/loader';

// Init web-social-share
import { defineCustomElements as webSocialShareElements } from 'web-social-share/dist/loader';

deckDeckGoElements(window).then(async () => {
  await deckDeckGoChartsElements(window);
  await deckDeckGoQRCodeElements(window);
  await deckDeckGoHighlightCodeElements(window);
  await deckDeckGoLazyImgElements(window);

  const promises = [];

  promises.push(deckDeckGoSlideTitleElements(window));
  promises.push(deckDeckGoSlideContentElements(window));
  promises.push(deckDeckGoSlideAuthorElements(window));
  promises.push(deckDeckGoSlideChartElements(window));
  promises.push(deckDeckGoSlideYoutubeElements(window));
  promises.push(deckDeckGoSlideSplitElements(window));
  promises.push(deckDeckGoSlideCodeElements(window));
  promises.push(deckDeckGoSlideCountdownElements(window));
  promises.push(deckDeckGoSlideGifElements(window));
  promises.push(deckDeckGoSlideQRCodeElements(window));
  promises.push(deckDeckGoSlideBigImgElements(window));
  promises.push(deckDeckGoSlideVideoElements(window));

  await Promise.all(promises);

  await postLoading();
  await initActions();
  await initFullscreen();
  await postLoadingJumpTo();
  await initDeckHistoryWatch();

  await webSocialShareElements(window);

  await deckDeckGoRemoteElements(window);
});
