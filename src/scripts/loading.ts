const postLoading = (): Promise<void> => {
  return new Promise(resolve => {
    const app = document.querySelector('ion-app');
    if (app) {
      app.classList.remove('loading');
    }

    resolve();
  });
};

export default postLoading;
