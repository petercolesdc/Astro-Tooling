// Imports
import type { ImageMetadata } from "astro";
import img1 from "../assets/images/ntsh.jpeg";

// Checks & balances
export interface Article {
  title: string;
  text: string;
  image: ImageMetadata;
  altTag: string;
}

// Data keys and values
export const articles: Article[] = [
  {
    title: "First Article",
    text: "This is the first article description.",
    image: img1,
    altTag: "Alt test"
  },
  {
    title: "Second Article",
    text: "This is the second article description.",
    image: img1,
    altTag: ""
  },
  {
    title: "Third Article",
    text: "This is the third article description.",
    image: img1,
    altTag: ""
  },
  {
    title: "Forth Article",
    text: "This is the forth article description.",
    image: img1,
    altTag: ""
  },
];