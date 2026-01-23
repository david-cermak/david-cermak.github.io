export type Post = {
  slug: string;
  title: string;
  description?: string;
  publishedAt?: string;
  heroImage?: string;
  body: string;
  year: string;
};

import refuzzBody from '../blog/25/refuzz.md?raw';
import book1Body from '../blog/25/book1.md?raw';
import book2Body from '../blog/25/book2.md?raw';
import consoleBody from '../blog/25/console.md?raw';
import coroutinesBody from '../blog/25/coroutines.md?raw';
import cppBookReviewBody from '../blog/25/cpp-book-review.md?raw';
import dnssecBody from '../blog/25/dnssec.md?raw';
import epppBody from '../blog/25/eppp.md?raw';
import espMosqBody from '../blog/25/esp-mosq.md?raw';
import fuzzingBody from '../blog/25/fuzzing.md?raw';
import fuzzing2Body from '../blog/25/fuzzing2.md?raw';
import ifndrBody from '../blog/25/ifndr.md?raw';
import kafkaBody from '../blog/25/kafka.md?raw';
import linuxdays25Body from '../blog/25/linuxdays25.md?raw';
import linuxdays25PostBody from '../blog/25/linuxdays25_post.md?raw';
import lwCryptoBody from '../blog/25/lw_crypto.md?raw';
import modemBody from '../blog/25/modem.md?raw';
import modemSimBody from '../blog/25/modem_sim.md?raw';
import pqc1Body from '../blog/25/pqc1.md?raw';
import pqc2Body from '../blog/25/pqc2.md?raw';
import pqc3Body from '../blog/25/pqc3.md?raw';
import programmersMindsetBody from '../blog/25/programmers-mindset.md?raw';
import semsearchBody from '../blog/25/semsearch.md?raw';
import serverlessBody from '../blog/25/serverless.md?raw';
import sockUtilsBody from '../blog/25/sock_utils.md?raw';
import sshBody from '../blog/25/ssh.md?raw';
import ssh1Body from '../blog/25/ssh1.md?raw';
import ssh2Body from '../blog/25/ssh2.md?raw';
import strictAliasBody from '../blog/25/strict_alias.md?raw';
import ttcn3Body from '../blog/25/ttcn3.md?raw';
import tunnelsBody from '../blog/25/tunnels.md?raw';
import wifiRemoteBody from '../blog/25/wifi_remote.md?raw';
import mqttFuzzBody from '../blog/25/mqtt_fuzz.md?raw';
import cppMlKemBody from '../blog/25/cpp-mlkem.md?raw';
import signalRatchetBody from '../blog/25/signal_ratchet.md?raw';
import rtosChoicesBody from '../blog/26/rtos_choice.md?raw';
import mbedtlsMigrateBody from '../blog/26/mbedtls_migrate.md?raw';
import edgeAiBody from '../blog/26/edge_ai.md?raw';
import clangHardeningBody from '../blog/26/clang_hardening.md?raw';
import infineonWifi7Body from '../blog/26/infineon_wifi7.md?raw';
import fuzzingIdfBody from '../blog/26/fuzzing_idf.md?raw';
export const posts: Post[] = [
  {
    slug: 'fuzzing_idf',
    title: 'Start fuzzing in 5 steps',
    description:
      'A step-by-step guide to get started with fuzzing ESP-IDF components.',
    publishedAt: '2026-01-22',
    body: fuzzingIdfBody.trim(),
    year: '26',
  },
  {
    slug: 'infineon_wifi7',
    title: 'ICYMI: AIROC™ ACW741x: Infineon\'s Wi-Fi 7 IoT tri-radio SoC',
    description:
      'A look at Infineon\'s Wi-Fi 7 IoT tri-radio SoC.',
    publishedAt: '2026-01-20',
    body: infineonWifi7Body.trim(),
    year: '26',
  },
  {
    slug: 'clang_hardening',
    title: 'Clang Hardening Cheat Sheet',
    description:
      'A cheat sheet for Clang Hardening, including practical and interesting compiler and linker flags.',
    publishedAt: '2026-01-19',
    body: clangHardeningBody.trim(),
    year: '26',
  },
  {
    slug: 'edge_ai',
    title: 'cloud vs. device? No, "edge + device"',
    description:
      'A look at an interesting paper on collaborative Edge-IoT AI for intrusion detection.',
    publishedAt: '2026-01-16',
    body: edgeAiBody.trim(),
    year: '26',
  },
  {
    slug: 'mbedtls_migrate',
    title: 'Migrating from mbedTLS v3 to v4',
    description:
      'A guide to migrating from mbedTLS v3 to v4, including what exactly needs to change and how to migrate step by step. The presentation is aimed at mbedTLS users (not maintainers).',
    publishedAt: '2026-01-15',
    body: mbedtlsMigrateBody.trim(),
    year: '26',
  },
  {
    slug: 'rtos_choice',
    title: 'Choosing an RTOS for embedded systems',
    description:
      'A look at the trade-offs between FreeRTOS, Zephyr, and other RTOSes for embedded systems.',
    publishedAt: '2026-01-01',
    body: rtosChoicesBody.trim(),
    year: '26',
  },
  {
    slug: 'mqtt_fuzz',
    title: 'Fuzzing IoT Protocols with Multi-Party and LLM-Assisted Methods',
    description:
      'Notes on two recent protocol-fuzzing papers: MBFuzzer (multi-party MQTT broker fuzzing) and an LLM-assisted model-based approach to generate stateful sequences.',
    publishedAt: '2025-12-24',
    body: mqttFuzzBody.trim(),
    year: '25',
  },
  {
    slug: 'cpp-mlkem',
    title: 'C++20, constexpr, header-only ML-KEM',
    description:
      'An interesting C++ implementation of a standard post-quantum key exchange worth a look.',
    publishedAt: '2025-12-28',
    body: cppMlKemBody.trim(),
    year: '25',
  },
  {
    slug: 'signal-ratchet',
    title: 'What can IoT security learn from Signal’s latest post-quantum "tripple ratchet"?',
    description:
      'A look at Signal’s latest PQC upgrade and how it can be applied to embedded IoT devices.',
    publishedAt: '2025-12-14',
    body: signalRatchetBody.trim(),
    year: '25',
  },
  {
    slug: 'refuzz',
    title: 'ReFuzz and the Case for Reusing Tests in Hardware Fuzzing',
    description:
      'Overview and personal take on the recent paper "Adaptive Fuzzing Framework that Reuses Tests from Prior Processors" by Texas A&M and TU Darmstadt',
    publishedAt: '2025-12-14',
    body: refuzzBody.trim(),
    year: '25',
  },
  {
    slug: 'esp-mosq',
    title: 'Lightweight MQTT broker running on ESP32',
    description:
      'Notes on porting the Mosquitto broker to ESP-IDF and what it took to run on an ESP32.',
    publishedAt: '2025-05-10',
    body: espMosqBody.trim(),
    year: '25',
  },
  {
    slug: 'cpp-book-review',
    title: 'Book review: C++ Memory Management',
    description:
      'Why "C++ Memory Management" is a must-read for embedded developers who care about storage, lifetimes, and ownership.',
    publishedAt: '2025-06-05',
    body: cppBookReviewBody.trim(),
    year: '25',
  },
  {
    slug: 'programmers-mindset',
    title: 'Book review: The C++ Programmer\'s Mindset',
    description:
      'How "The C++ Programmer\'s Mindset" connects computational thinking, performance, and modern C++ to embedded development.',
    publishedAt: '2025-06-20',
    body: programmersMindsetBody.trim(),
    year: '25',
  },
  {
    slug: 'book1',
    title: 'Book review: "C++ Memory Management" by Patrice Roy',
    description:
      'An embedded-focused review of "C++ Memory Management", covering storage, lifetimes, ownership, and why this book matters for firmware.',
    publishedAt: '2025-07-05',
    body: book1Body.trim(),
    year: '25',
  },
  {
    slug: 'book2',
    title: 'Book review: "The C++ Programmer\'s Mindset" by Sam Morley',
    description:
      'Thoughts from an embedded developer on "The C++ Programmer\'s Mindset" and why its approach to computational thinking is worth your weekend.',
    publishedAt: '2025-07-18',
    body: book2Body.trim(),
    year: '25',
  },
  {
    slug: 'console',
    title: 'Console apps on embedded systems',
    description:
      'From serial consoles to secure network consoles and tunneling on ESP32, based on a recent ESP32 Community Meeting talk.',
    publishedAt: '2025-08-02',
    body: consoleBody.trim(),
    year: '25',
  },
  {
    slug: 'coroutines',
    title: 'C++20 coroutines on embedded systems',
    description:
      'Exploring C++20 coroutines as a way to write async code that looks sync, comparing classic FreeRTOS-task-per-client to coroutine-based HTTP servers.',
    publishedAt: '2025-08-12',
    body: coroutinesBody.trim(),
    year: '25',
  },
  {
    slug: 'dnssec',
    title: 'Do you trust your DNS?',
    description:
      'Thoughts on a mis-issued TLS certificate for 1.1.1.1 and what it means for encrypted DNS, DoH/DoT, and IoT devices relying on them.',
    publishedAt: '2025-08-22',
    body: dnssecBody.trim(),
    year: '25',
  },
  {
    slug: 'eppp',
    title: 'Introducing eppp-link for microcontrollers',
    description:
      'Announcing eppp-link, a generic PPP/link component for microcontrollers with multiple transports, logical channels, and offloading use cases.',
    publishedAt: '2025-09-01',
    body: epppBody.trim(),
    year: '25',
  },
  {
    slug: 'fuzzing',
    title: 'Fuzzing fundamentals for firmware engineers',
    description:
      'A getting-started fuzzing guide for embedded and firmware engineers, with practical examples and tool recommendations.',
    publishedAt: '2025-09-05',
    body: fuzzingBody.trim(),
    year: '25',
  },
  {
    slug: 'fuzzing2',
    title: 'Fuzzing for embedded developers at LinuxDays',
    description:
      'Notes from a LinuxDays talk on fuzzing fundamentals for firmware engineers, including simple experiments you can run locally.',
    publishedAt: '2025-09-12',
    body: fuzzing2Body.trim(),
    year: '25',
  },
  {
    slug: 'ifndr',
    title: 'IFNDR: Ill-Formed, No Diagnostic Required in C++',
    description:
      'An explanation of IFNDR with a delegating-constructor example, and practical advice on avoiding silent C++ pitfalls.',
    publishedAt: '2025-09-18',
    body: ifndrBody.trim(),
    year: '25',
  },
  {
    slug: 'kafka',
    title: 'Kafka on ESP32',
    description:
      'Running librdkafka on ESP-IDF to stream data from ESP32 into Kafka, and thoughts on bridging MQTT and Kafka at the edge.',
    publishedAt: '2025-09-25',
    body: kafkaBody.trim(),
    year: '25',
  },
  {
    slug: 'linuxdays25',
    title: 'Speaking at LinuxDays 2025: Practical intro into fuzz-testing',
    description:
      'Announcement of a LinuxDays 2025 talk in Prague about practical fuzz-testing approaches, tools, and CI integration.',
    publishedAt: '2025-10-01',
    body: linuxdays25Body.trim(),
    year: '25',
  },
  {
    slug: 'linuxdays25_post',
    title: 'LinuxDays 2025: A fuzzing talk recap',
    description:
      'A short recap of LinuxDays 2025, slides and video links for a fuzzing presentation, and a note on a demo that didn’t crash as it should have.',
    publishedAt: '2025-10-08',
    body: linuxdays25PostBody.trim(),
    year: '25',
  },
  {
    slug: 'lw_crypto',
    title: 'Lightweight cryptography on constrained devices',
    description:
      'Experiments with Ascon as a lightweight AEAD for ultra-low-power devices and secure channels on ESP32 compared to existing AEADs.',
    publishedAt: '2025-10-15',
    body: lwCryptoBody.trim(),
    year: '25',
  },
  {
    slug: 'modem',
    title: 'esp-modem v2.0 release highlights',
    description:
      'Announcing esp-modem v2.0 with improved IDE navigation, multi-connection support, URC observer improvements, and test support.',
    publishedAt: '2025-10-20',
    body: modemBody.trim(),
    year: '25',
  },
  {
    slug: 'modem_sim',
    title: 'A new modem simulator for ESP-AT and ESP-Modem',
    description:
      'Introducing a PPP-based modem simulator built on ESP-AT and ESP-Modem for testing AT commands and PPP links without real modems.',
    publishedAt: '2025-10-25',
    body: modemSimBody.trim(),
    year: '25',
  },
  {
    slug: 'pqc1',
    title: 'Post-quantum secure channel: Alice, Bob, and a quantum bar',
    description:
      'A proof-of-concept post-quantum secure TCP channel between Linux and ESP32 using ML-KEM-512 and AES-256-GCM.',
    publishedAt: '2025-11-01',
    body: pqc1Body.trim(),
    year: '25',
  },
  {
    slug: 'pqc2',
    title: 'Embedded devices in the quantum era',
    description:
      'A look at post-quantum crypto adoption on embedded systems, focusing on ML-KEM-based secure channels and TLS 1.3 hybrids.',
    publishedAt: '2025-11-05',
    body: pqc2Body.trim(),
    year: '25',
  },
  {
    slug: 'pqc3',
    title: 'TNFL: Trust Now, Forge Later in secure boot',
    description:
      'A short post on post-quantum risks to secure boot and firmware trust anchors, based on an OpenAlt conference talk.',
    publishedAt: '2025-11-08',
    body: pqc3Body.trim(),
    year: '25',
  },
  {
    slug: 'semsearch',
    title: 'Semantic history search in your shell',
    description:
      'Replacing Bash reverse search with a semantic history search powered by embeddings, FAISS, and fzf.',
    publishedAt: '2025-11-12',
    body: semsearchBody.trim(),
    year: '25',
  },
  {
    slug: 'serverless',
    title: 'Serverless-style MQTT across ESP32 sites',
    description:
      'An example of brokering MQTT across remote sites using only ESP32 devices, ICE/WebRTC, and no public IPs or cloud services.',
    publishedAt: '2025-11-15',
    body: serverlessBody.trim(),
    year: '25',
  },
  {
    slug: 'sock_utils',
    title: 'Porting POSIX-style networking to ESP32',
    description:
      'A guide to reusable patterns and utilities for porting POSIX networking libraries like Mosquitto, Kafka, and Libssh to ESP-IDF.',
    publishedAt: '2025-11-20',
    body: sockUtilsBody.trim(),
    year: '25',
  },
  {
    slug: 'ssh',
    title: 'SSH server on ESP32 with libssh',
    description:
      'Early results from porting libssh to ESP-IDF to run an SSH server directly on ESP32, including resource figures and alternatives.',
    publishedAt: '2025-11-23',
    body: sshBody.trim(),
    year: '25',
  },
  {
    slug: 'ssh1',
    title: 'From seashells to SSH shells: libssh updates',
    description:
      'A follow-up on the libssh ESP-IDF port with public key auth, esp-console integration, and configuration improvements.',
    publishedAt: '2025-11-26',
    body: ssh1Body.trim(),
    year: '25',
  },
  {
    slug: 'ssh2',
    title: 'libssh ESP-IDF component v0.11',
    description:
      'Announcing libssh ESP-IDF component v0.11 and how to quickly spin up an SSH server example with idf.py.',
    publishedAt: '2025-11-28',
    body: ssh2Body.trim(),
    year: '25',
  },
  {
    slug: 'strict_alias',
    title: 'Strict aliasing and volatile in embedded C',
    description:
      'An explanation of strict aliasing, union-based type punning, and how optimization levels can break embedded code.',
    publishedAt: '2025-12-01',
    body: strictAliasBody.trim(),
    year: '25',
  },
  {
    slug: 'ttcn3',
    title: 'Is TTCN-3 still alive for IoT protocol conformance?',
    description:
      'Reflections on using Eclipse Titan and TTCN-3 for IoT protocol conformance testing and alternatives in 2025.',
    publishedAt: '2025-12-03',
    body: ttcn3Body.trim(),
    year: '25',
  },
  {
    slug: 'tunnels',
    title: 'Console, tunnels, and ESP32',
    description:
      'A preview of a talk on advanced networking, secure consoles, and tunneling across microcontroller-based border routers and end devices.',
    publishedAt: '2025-12-05',
    body: tunnelsBody.trim(),
    year: '25',
  },
  {
    slug: 'wifi_remote',
    title: 'esp-wifi-remote: Wi-Fi without wireless hardware',
    description:
      'An overview of esp-wifi-remote for ESP32-P4, routing esp-wifi calls to an external Wi-Fi chip based on esp-hosted.',
    publishedAt: '2025-12-08',
    body: wifiRemoteBody.trim(),
    year: '25',
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
