# Holocron v2.0

## What is it?

Is a presentation tool using markdown.

## Technologies

- TypeScript
- [DeckDeckGo](https://github.com/deckgo/deckdeckgo)
- Webpack

## How to run it

- Git clone this repo
  ```sh
    git clone git@github.com:pataruco/holocron-v2.git
  ```
- Install dependencies
  ```sh
    yarn
  ```
- Go to [`./config/webpack.config.dev`](./config/webpack.config.dev) and change the parameters of the `getSlide` method with the relative path of your markdown.

  ```typescript
  const configuration: webpack.Configuration = {
    // ...
    plugins: [
      // ...
      new DeckDeckGoMarkdownPlugin({
        src: getSlide('fewd.md'), // here
      }),
    ],
  };
  ```

- To present just run 💥
  ```sh
    yarn start
  ```
