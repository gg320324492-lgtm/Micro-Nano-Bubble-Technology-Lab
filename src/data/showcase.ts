// src/data/showcase.ts

export type ShowcasePhoto = {
  src: string;
  alt: string;
};

export type ShowcaseStory = {
  title: string;
  date?: string;
  tags?: string[];
  content: string;
};

export const showcasePhotos: ShowcasePhoto[] = [
  { src: "/showcase/dinner/g01.jpg", alt: "课题组风采 01" },
  { src: "/showcase/dinner/g02.jpg", alt: "课题组风采 02" },
  { src: "/showcase/dinner/g03.jpg", alt: "课题组风采 03" },
  { src: "/showcase/dinner/g04.jpg", alt: "课题组风采 04" },
  { src: "/showcase/dinner/g05.jpg", alt: "课题组风采 05" },
  { src: "/showcase/dinner/g06.jpg", alt: "课题组风采 06" },
  { src: "/showcase/dinner/g07.jpg", alt: "课题组风采 07" },
];

export const showcaseStories: ShowcaseStory[] = [];
