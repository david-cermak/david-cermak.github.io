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
import telnetdStoryBody from '../blog/26/telnetd_story.md?raw';
import humanizerBody from '../blog/26/humanizer.md?raw';
import coroutinesCfiBody from '../blog/26/coroutines_cfi.md?raw';
import cveFactoryBody from '../blog/26/cve_factory.md?raw';
import libsshZephyrBody from '../blog/26/libssh_zephyr.md?raw';
import fuzzingLanguageBody from '../blog/26/fuzzing_language.md?raw';
import miscompilationBody from '../blog/26/miscompilation.md?raw';
import embeddedClawBody from '../blog/26/embedded_claw.md?raw';
import memsafetyCppBody from '../blog/26/memsafety_cpp.md?raw';
import realtimeSanitizeBody from '../blog/26/realtime_sanitize.md?raw';
import microGptBody from '../blog/26/micro_gpt.md?raw';
import sshDropbearBody from '../blog/26/ssh_dropbear.md?raw';
import cppArchitectureReviewBody from '../blog/26/cpp_architecture_review.md?raw';
import compArchReviewBody from '../blog/26/comp_arch_review.md?raw';
import ewHereBody from '../blog/26/ew_here.md?raw';
import ewRecapBody from '../blog/26/ew_recap.md?raw';
import socialEngAiBody from '../blog/26/social_eng_ai.md?raw';
import merkleTreeCertBody from '../blog/26/merkle_tree_cert.md?raw';
import codingLocalAiBody from '../blog/26/coding_local_ai.md?raw';
import cppAtScaleBody from '../blog/26/cpp_at_scale.md?raw';
import airsnitchBody from '../blog/26/airsnitch.md?raw';
import memsafetyRustBody from '../blog/26/memsafety_rust.md?raw';
import mongooseVulnBody from '../blog/26/mongoose_vuln.md?raw';
import quic1Body from '../blog/26/quic1.md?raw';
import quic2Body from '../blog/26/quic2.md?raw';
import irohEsp32Body from '../blog/26/iroh_esp32.md?raw';
import supplyChain1Body from '../blog/26/supply_chain1.md?raw';
import supplyChain2Body from '../blog/26/supply_chain2.md?raw';
import cpp26DoneBody from '../blog/26/cpp26_done.md?raw';
import claudeLeakBody from '../blog/26/claude_leak.md?raw';
import cpp26RecompileBody from '../blog/26/cpp26_recompile.md?raw';
import constTimeImplBody from '../blog/26/const_time_impl.md?raw';
import sshPqcBody from '../blog/26/ssh_pqc.md?raw';
import cmakeDebugBody from '../blog/26/cmake_debug.md?raw';
import llmWikiBody from '../blog/26/llm_wiki.md?raw';
import betterAgentsBody from '../blog/26/better_agents.md?raw';
import cleverHansBody from '../blog/26/clever_hans.md?raw';
import breakHqcBody from '../blog/26/break_hqc.md?raw';
import cppAnother11Body from '../blog/26/cpp_another11.md?raw';
import wolfsslCBody from '../blog/26/wolfssl_c.md?raw';
import aprilRecapBody from '../blog/26/april_recap.md?raw';
import threadFuzzerBody from '../blog/26/thread_fuzzer.md?raw';
import cpp26PrettyBody from '../blog/26/cpp26_pretty.md?raw';
import mythosTakeBody from '../blog/26/mythos_take.md?raw';
import staticDynAnBody from '../blog/26/static_dyn_an.md?raw';
import supplyChain3Body from '../blog/26/supply_chain3.md?raw';
import supplyChain4Body from '../blog/26/supply_chain4.md?raw';

export const posts: Post[] = [
  {
    slug: 'thread_fuzzer',
    title: 'ThreadFuzzer: Why fuzzing OpenThread Matter(s)',
    description:
      'An interesting take on the ThreadFuzzer.',
    publishedAt: '2026-05-04',
    body: threadFuzzerBody.trim(),
    year: '26',
  },
  {
    slug: 'cpp26_pretty',
    title: 'Pretty-printing structs in C++? No macros, no external lib, just C++26 and GCC 16.1',
    description:
      'An interesting take on the C++26 pretty-printing.',
    publishedAt: '2026-05-05',
    body: cpp26PrettyBody.trim(),
    year: '26',
  },
  {
    slug: 'mythos_take',
    title: 'Mozilla fixed 423 Firefox security bugs in April, but... is it all about Mythos?',
    description:
      'An interesting take on the Mythos.',
    publishedAt: '2026-05-06',
    body: mythosTakeBody.trim(),
    year: '26',
  },
  {
    slug: 'static_dyn_an',
    title: 'Mitigating False Positives in Static Memory Safety Analysis of Rust Programs via Reinforcement Learning',
    description:
      'An interesting take on the static memory safety analysis of Rust programs.',
    publishedAt: '2026-05-07',
    body: staticDynAnBody.trim(),
    year: '26',
  },
  {
    slug: 'supply_chain3',
    title: '3 Lessons for GitHub Actions maintainers (from the recent "Mini Shai-Hulud" supply-chain attack)',
    description:
      'An interesting take on the supply-chain attack.',
    publishedAt: '2026-05-08',
    body: supplyChain3Body.trim(),
    year: '26',
  },
  {
    slug: 'supply_chain4',
    title: 'ICYMI 👉 Another "TeamPCP strikes again" (from this morning)',
    description:
      'An interesting take on the supply-chain attack.',
    publishedAt: '2026-05-09',
    body: supplyChain4Body.trim(),
    year: '26',
  },
  {
    slug: 'clever_hans',
    title: 'Are AI Models Just Counting Horses? Clever Hans moment',
    description:
      'An interesting take on the Clever Hans moment.',
    publishedAt: '2026-04-18',
    body: cleverHansBody.trim(),
    year: '26',
  },
  {
    slug: 'break_hqc',
    title: 'Breaking PQC KEM on STM32? CTU researchers demonstrated a practical power analysis on HQC',
    description:
      'An interesting take on the breaking PQC KEM on STM32.',
    publishedAt: '2026-04-19',
    body: breakHqcBody.trim(),
    year: '26',
  },
  {
    slug: 'cpp_another11',
    title: 'Is 2026 Another 2011 for C++? Slides of the BeCPP 2026 published last week',
    description:
      'An interesting take on the BeCPP 2026.',
    publishedAt: '2026-04-20',
    body: cppAnother11Body.trim(),
    year: '26',
  },
  {
    slug: 'wolfssl_c',
    title: 'Why C still dominates crypto code? wolfSSL published an interesting article last week:',
    description:
      'An interesting take on the wolfSSL article.',
    publishedAt: '2026-04-21',
    body: wolfsslCBody.trim(),
    year: '26',
  },
  {
    slug: 'april_recap',
    title: 'May the first memory access be a cache hit! It\'s May 1st, so let\'s take a look at what happened in April:',
    description:
      'An interesting take on the April recap.',
    publishedAt: '2026-05-01',
    body: aprilRecapBody.trim(),
    year: '26',
  },
  {
    slug: 'const_time_impl',
    title: 'Constant-time implementation🤔? Your compiler might break it.',
    description:
      'An interesting vuln popped up last week: CVE-2025-66442 in Mbed TLS (compiler-induced constant-time violation).',
    publishedAt: '2026-04-13',
    body: constTimeImplBody.trim(),
    year: '26',
  },
  {
    slug: 'ssh_pqc',
    title: 'Embedded SSH with PQC KEX? Yes. But you’ll pay.',
    description:
      'An interesting vuln popped up last week: CVE-2025-66442 in Mbed TLS (compiler-induced constant-time violation).',
    publishedAt: '2026-04-14',
    body: sshPqcBody.trim(),
    year: '26',
  },
  {
    slug: 'cmake_debug',
    title: 'Just a build script… why would you debug it? (My exact words ~10 years ago)',
    description:
      'An interesting vuln popped up last week: CVE-2025-66442 in Mbed TLS (compiler-induced constant-time violation).',
    publishedAt: '2026-04-15',
    body: cmakeDebugBody.trim(),
    year: '26',
  },
  {
    slug: 'llm_wiki',
    title: 'Obsidian LLM Wiki for personal knowledge infra',
    description:
      'An interesting vuln popped up last week: CVE-2025-66442 in Mbed TLS (compiler-induced constant-time violation).',
    publishedAt: '2026-04-16',
    body: llmWikiBody.trim(),
    year: '26',
  },
  {
    slug: 'better_agents',
    title: 'Better AI agents🤔? Less AI, more determinism',
    description:
      'An interesting vuln popped up last week: CVE-2025-66442 in Mbed TLS (compiler-induced constant-time violation).',
    publishedAt: '2026-04-17',
    body: betterAgentsBody.trim(),
    year: '26',
  },
  {
    slug: 'cpp26_done',
    title: 'C++26 is done✅, says Herb Sutter',
    description:
      'A small step from C++23, but kind of a giant leap🚀 for the language.',
    publishedAt: '2026-03-19',
    body: cpp26DoneBody.trim(),
    year: '26',
  },
  {
    slug: 'claude_leak',
    title: 'Today’s news is full of the Claude source leak',
    description:
      'An interesting take on the Claude source leak.',
    publishedAt: '2026-03-19',
    body: claudeLeakBody.trim(),
    year: '26',
  },
  {
    slug: 'cpp26_recompile',
    title: 'Herb Sutter on UB: "Just recompile it with C++26"',
    description:
      'An interesting take on UB by Mr. Herb Sutter.',
    publishedAt: '2026-03-19',
    body: cpp26RecompileBody.trim(),
    year: '26',
  },
  {
    slug: 'quic1',
    title: 'Quick intro to QUIC (Embedded angle)',
    description:
      'A quick intro to QUIC (Embedded angle).',
    publishedAt: '2026-03-19',
    body: quic1Body.trim(),
    year: '26',
  },
  {
    slug: 'quic2',
    title: 'QUIC on ESP32: Practical demo',
    description:
      'A practical demo of QUIC on ESP32.',
    publishedAt: '2026-03-20',
    body: quic2Body.trim(),
    year: '26',
  },
  {
    slug: 'iroh_esp32',
    title: 'What is Iroh? ...and can it run on ESP32?',
    description:
      'A look at Iroh and what it can run on ESP32.',
    publishedAt: '2026-03-19',
    body: irohEsp32Body.trim(),
    year: '26',
  },
  {
    slug: 'supply_chain1',
    title: 'When your scanner is the breach: Trivy supply-chain compromise and what our CI should change tomorrow',
    description:
      'A look at the Trivy supply-chain compromise and what our CI should change tomorrow.',
    publishedAt: '2026-03-19',
    body: supplyChain1Body.trim(),
    year: '26',
  },
  {
    slug: 'supply_chain2',
    title: 'Hey embedded devs👋 we should *really* check our CI jobs',
    description:
      'A look at the recent supply-chain compromises and what our CI should change tomorrow.',
    publishedAt: '2026-03-19',
    body: supplyChain2Body.trim(),
    year: '26',
  },
  {
    slug: 'mongoose_vuln',
    title: 'Recent vulnerabilities in Mongoose networking lib',
    description:
      'An interesting advisory popped up this weekend: It affects v7.0-7.20 of the Mongoose networking library.',
    publishedAt: '2026-03-19',
    body: mongooseVulnBody.trim(),
    year: '26',
  },
  {
    slug: 'comp_arch_review',
    title: 'Book Review: Modern Computer Architecture and Organization',
    description:
      'A review of the book "Modern Computer Architecture and Organization" by Jim Ledin.',
    publishedAt: '2026-05-11',
    body: compArchReviewBody.trim(),
    year: '26',
  },
  {
    slug: 'memsafety_rust',
    title: 'Memory safety in Rust? No `unsafe`, still UB.',
    description:
      'An interesting advisory popped up this weekend: It affects v0.2.0 of the `hivex` crate (rust bindings for a Windows registry hive library)',
    publishedAt: '2026-03-10',
    body: memsafetyRustBody.trim(),
    year: '26',
  },
  {
    slug: 'ew_here',
    title: 'Greetings from Embedded World in Nuremberg!',
    description:
      'I\'ll be around the Espressif booth 3A-528 this week, stop by and say hello if you\'re at the show 😀',
    publishedAt: '2026-03-13',
    body: ewHereBody.trim(),
    year: '26',
  },
  {
    slug: 'ew_recap',
    title: 'EW26: What people talked about',
    description:
      'After a few busy days at Embedded World in Nuremberg, I wanted to share the topics that kept coming up in conversations -- from my personal perspective.',
    publishedAt: '2026-03-14',
    body: ewRecapBody.trim(),
    year: '26',
  },
  {
    slug: 'social_eng_ai',
    title: 'Social-engineer your AI reviewer? "Just a cleanup" → LGTM👍',
    description:
      'An interesting paper from yesterday showcasing a simple experiment: Reintroduce an old vulnerability, frame it as "refactor" or "performance improvement", and let AI review it.',
    publishedAt: '2026-03-15',
    body: socialEngAiBody.trim(),
    year: '26',
  },
  {
    slug: 'merkle_tree_cert',
    title: 'Google squeezed 15 kB into 700 B: The real embedded lesson',
    description:
      'A look at Google\'s Merkle Tree Certificates and what it means for embedded systems.',
    publishedAt: '2026-03-16',
    body: merkleTreeCertBody.trim(),
    year: '26',
  },
  {
    slug: 'coding_local_ai',
    title: 'Coding with local models: Not great… but also not bad👀',
    description:
      'A look at the coding with local models and what it means for embedded systems.',
    publishedAt: '2026-03-17',
    body: codingLocalAiBody.trim(),
    year: '26',
  },
  {
    slug: 'cpp_at_scale',
    title: 'C++ at Scale: Engineering trade-offs, performance, clean code, and binary size.',
    description:
      'An interview with Sándor Dargó (Senior Software Engineer at Spotify) on clean C++ at scale.',
    publishedAt: '2026-03-18',
    body: cppAtScaleBody.trim(),
    year: '26',
  },
  {
    slug: 'airsnitch',
    title: 'ICYMI: AirSnitch cool toolkit to check your Wi-Fi',
    description:
      'A cool toolkit to check your Wi-Fi.',
    publishedAt: '2026-03-05',
    body: airsnitchBody.trim(),
    year: '26',
  },
  {
    slug: 'realtime_sanitize',
    title: 'When Embedded means Realtime: Clang 20\'s Realtime Sanitizer',
    description:
      'A look at the realtime sanitizer in Clang 20.',
    publishedAt: '2026-02-23',
    body: realtimeSanitizeBody.trim(),
    year: '26',
  },
  {
    slug: 'micro_gpt',
    title: '250 LOC MicroGPT...and the clones',
    description:
      'A look at the micro GPT project and the clones.',
    publishedAt: '2026-02-24',
    body: microGptBody.trim(),
    year: '26',
  },
  {
    slug: 'ssh_dropbear',
    title: 'SSH stack on hashtag#ESP32: libssh or dropbear?',
    description:
      'A look at the SSH stack on ESP32: libssh or dropbear.',
    publishedAt: '2026-02-25',
    body: sshDropbearBody.trim(),
    year: '26',
  },
  {
    slug: 'cpp_architecture_review',
    title: 'Book Review: Software Architecture with C++',
    description:
      'A review of the book "Software Architecture with C++" by Adrian Ostrowski, Piotr Gaczkowski, Andrey Gavrilin.',
    publishedAt: '2026-03-30',
    body: cppArchitectureReviewBody.trim(),
    year: '26',
  },
  {
    slug: 'memsafety_cpp',
    title: 'Memory Safety in C++',
    description:
      'A look at the memory safety in C++.',
    publishedAt: '2026-02-27',
    body: memsafetyCppBody.trim(),
    year: '26',
  },
  {
    slug: 'embedded_claw',
    title: 'MiniClaw & ZeroClaw: An embedded engineer\'s look at the OpenClaw wave',
    description:
      'An embedded engineer\'s look at the OpenClaw wave, including MiniClaw and ZeroClaw.',
    publishedAt: '2026-02-22',
    body: embeddedClawBody.trim(),
    year: '26',
  },
  {
    slug: 'miscompilation',
    title: 'Miscompilation in 2026? both gcc and clang? ...not really',
    description:
      'A look at the recent miscompilation in gcc and clang.',
    publishedAt: '2026-02-18',
    body: miscompilationBody.trim(),
    year: '26',
  },
  {
    slug: 'fuzzing_language',
    title: 'Fuzzing detected more bugs in C++/Rust than Java/C?',
    description:
      'An interesting research on the influence of programming language on fuzzing outcomes.',
    publishedAt: '2026-02-16',
    body: fuzzingLanguageBody.trim(),
    year: '26',
  },
  {
    slug: 'libssh_zephyr',
    title: 'SSH server on ESP32: ESP-IDF or Zephyr?',
    description:
      'A comparison of ESP-IDF and Zephyr for running an SSH server on ESP32.',
    publishedAt: '2026-02-4',
    body: libsshZephyrBody.trim(),
    year: '26',
  },
  {
    slug: 'cve_factory',
    title: 'Is this CVE actually relevant to our device?',
    description:
      'A tool to help determine if a CVE is actually relevant to a specific device.',
    publishedAt: '2026-02-3',
    body: cveFactoryBody.trim(),
    year: '26',
  },
  {
    slug: 'coroutines_cfi',
    title: 'Are C++ coroutines control flow safe?',
    description:
      'A look at the limitations of CFI when coroutines are used.',
    publishedAt: '2026-02-2',
    body: coroutinesCfiBody.trim(),
    year: '26',
  },
  {
    slug: 'humanizer',
    title: 'Humanizer: Remove AI Writing Patterns',
    description:
      'A tool to remove AI writing patterns from text.',
    publishedAt: '2026-01-29',
    body: humanizerBody.trim(),
    year: '26',
  },
  {
    slug: 'telnetd_story',
    title: 'What embedded folks can learn from the recent `telnetd` vulnerability',
    description:
      'A look at the recent telnetd vulnerability and what embedded engineers can learn from it.',
    publishedAt: '2026-01-27',
    body: telnetdStoryBody.trim(),
    year: '26',
  },
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
