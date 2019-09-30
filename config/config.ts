import path from 'path';

export const entry = path.resolve(__dirname, '../src', 'index.ts');
export const dist = path.resolve(__dirname, '../dist');
export const indexHtml = path.resolve(__dirname, '../src', 'index.html');

export const getSlide = (filename: string): string =>
  path.resolve(__dirname, '../slides', filename);
