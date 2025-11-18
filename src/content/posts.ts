export type Post = {
  slug: string;
  title: string;
  description?: string;
  publishedAt?: string;
  heroImage?: string;
  body: string;
};

import espMosqBody from '../blog/esp-mosq.md?raw';

export const posts: Post[] = [
  {
    slug: 'esp-mosq',
    title: 'Lightweight MQTT broker running on ESP32',
    description:
      'Notes on porting the Mosquitto broker to ESP-IDF and what it took to run on an ESP32.',
    publishedAt: '2024-11-01',
    body: espMosqBody.trim(),
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

