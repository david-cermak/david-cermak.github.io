export type Post = {
  slug: string;
  title: string;
  description?: string;
  publishedAt?: string;
  heroImage?: string;
  body: string;
};

import espMosqBody from '../blog/25/esp-mosq.md?raw';
import cppBookReviewBody from '../blog/25/cpp-book-review.md?raw';
import programmersMindsetBody from '../blog/25/programmers-mindset.md?raw';

export const posts: Post[] = [
  {
    slug: 'esp-mosq',
    title: 'Lightweight MQTT broker running on ESP32',
    description:
      'Notes on porting the Mosquitto broker to ESP-IDF and what it took to run on an ESP32.',
    publishedAt: '2024-11-01',
    body: espMosqBody.trim(),
  },
  {
    slug: 'cpp-book-review',
    title: 'Book review: C++ Memory Management',
    description:
      'Notes on the book "C++ Memory Management" by Patrice Roy.',
    publishedAt: '2025-11-18',
    body: cppBookReviewBody.trim(),
  },
  {
    slug: 'programmers-mindset',
    title: 'Book review: The C++ Programmer\'s Mindset',
    description:
      'Notes on the book "The C++ Programmer\'s Mindset" by Sam Morley.',
    publishedAt: '2025-12-07',
    body: programmersMindsetBody.trim(),
  }

];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

