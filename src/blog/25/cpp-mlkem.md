C++20, constexpr, header-only **ML-KEM**

![cxx-ml-kem-on-esp32](/images/mlkem.png)

Here’s an interesting C++ implementation of a standard post-quantum key exchange worth a look 👉https://github.com/itzmeanjan/ml-kem

The ML-KEM algorithm (NIST FIPS 203) is now widely deployed for PQ key establishment, and this repository explores a modern C++20, header-only, fully constexpr implementation.
* Key generation / encapsulation / decapsulation can **run at compile time** if inputs are known! Unusual, but a neat demonstration of what constexpr enables in crypto code 😀
* Everything lives in headers
* Clear, idiomatic C++ (uses fixed-size spans and compile-time sizes instead of raw pointers)
* Implements ML-KEM-512 / 768 / 1024

From an embedded angle: Compared to liboqs on ESP32, this C++20 version is ~16% slower overall for ML-KEM-768 and uses roughly 2× the stack and heap.
See full ESP32 comparison 👉https://github.com/david-cermak/upqc-lab/tree/main?tab=readme-ov-file#implementation-comparison

If you’re curious about how ML-KEM actually fits together under the hood, this is a nice place to start.
🔵 Readable reference implementation of ML-KEM in modern C++
🔵 Good way to explore lattice-based algorithms
⚠️ Treat as experimental: Timing-leakage not audited

Big👏 to Anjan Roy for this interesting implementation!

---

<!-- _class: lead -->
# C++20 Features in ml-kem

*Selected modern C++ idioms from [itzmeanjan/ml-kem](https://github.com/itzmeanjan/ml-kem)*

---

## 1. constexpr — Compile-Time Execution

**What:** All keygen, encaps, decaps are `constexpr` — full ML-KEM can run at compile time when inputs are known.

**Why:** Cryptography with known test vectors can be verified at build time; eliminates runtime cost for fixed inputs; enables `static_assert` validation.

**Example:** The library needs `-fconstexpr-steps=4000000` (Clang) because default limit (~1M steps) is exceeded by NTT, polynomial ops, etc.

```cpp
// README — compile-time shared secret
static constexpr auto computed_shared_secret = eval_ml_kem_768_encaps();
static_assert(computed_shared_secret == expected_shared_secret, "Must compute at compile-time !");
```

**Relevant code:** `include/ml_kem/ml_kem_512.hpp`, `include/ml_kem/internals/poly/ntt.hpp` — all core routines are `constexpr`.

---

## 2. Math Symbols Directly in Source

**What:** Standard math notation (ζ, η) used as identifiers instead of ASCII names like `zeta` or `eta`.

**Why:** Code matches the spec and papers; easier to audit against NIST FIPS 203; reduces cognitive gap between notation and implementation.

**Example:**

```cpp
// include/ml_kem/internals/poly/ntt.hpp
inline constexpr auto ζ = ml_kem_field::zq_t(17);  // 256th root of unity
static_assert((ζ ^ N) == ml_kem_field::zq_t::one(), "ζ must be 256th root of unity modulo Q");
// ...
const ml_kem_field::zq_t ζ_exp = NTT_ζ_EXP[k_now];
```

```cpp
// include/ml_kem/ml_kem_512.hpp
inline constexpr size_t η1 = 3;
inline constexpr size_t η2 = 2;
// ...
ml_kem::keygen<k, η1>(d, z, pubkey, seckey);
```

**Relevant code:** `ntt.hpp` (ζ), `ml_kem_512.hpp` / `ml_kem_768.hpp` / `ml_kem_1024.hpp` (η1, η2).

---

## 3. std::span — Type-Safe Buffers

**What:** Fixed-size `std::span<T, N>` instead of raw pointers for seeds, keys, ciphertexts.

**Why:** No pointer arithmetic; compile-time size checks; no manual length args; works with `std::array` and `std::vector`.

**Example:**

```cpp
// include/ml_kem/ml_kem_512.hpp
constexpr void keygen(std::span<const uint8_t, SEED_D_BYTE_LEN> d,
                     std::span<const uint8_t, SEED_Z_BYTE_LEN> z,
                     std::span<uint8_t, PKEY_BYTE_LEN> pubkey,
                     std::span<uint8_t, SKEY_BYTE_LEN> seckey);

[[nodiscard]] constexpr bool encapsulate(std::span<const uint8_t, SEED_M_BYTE_LEN> m,
                                        std::span<const uint8_t, PKEY_BYTE_LEN> pubkey,
                                        std::span<uint8_t, CIPHER_TEXT_BYTE_LEN> cipher,
                                        std::span<uint8_t, SHARED_SECRET_BYTE_LEN> shared_secret);
```

**Relevant code:** `include/ml_kem/ml_kem_*.hpp`, `include/ml_kem/internals/k_pke.hpp`, `utils.hpp`.

---

## 4. if constexpr — Compile-Time Branching

**What:** `if constexpr` and template constants for branching without runtime cost.

**Why:** Same source for different bit widths (l=1,4,5,10,11) and parameter sets (η=2 vs η=3); dead code is removed at compile time.

**Example:**

```cpp
// include/ml_kem/internals/poly/serialize.hpp
template<size_t l> constexpr void encode(...) requires(ml_kem_params::check_l(l))
{
  if constexpr (l == 1) {
    constexpr size_t itr_cnt = ml_kem_ntt::N >> 3;
    // ...
  } else if constexpr (l == 4) {
    constexpr size_t itr_cnt = ml_kem_ntt::N >> 1;
    // ...
  } else if constexpr (l == 11) { /* ... */ }
}
```

```cpp
// include/ml_kem/internals/poly/sampling.hpp
if constexpr (eta == 2) {
  static_assert(eta == 2, "η must be 2 !");
  constexpr size_t till = 64 * eta;
  // ...
} else if constexpr (eta == 3) { /* ... */ }
```

**Relevant code:** `serialize.hpp`, `sampling.hpp`.

---

## 5. operator<=> & consteval

**What:** Defaulted three-way comparison (`operator<=>`) and `consteval` for always-compile-time checks.

**Why:** Minimal boilerplate for comparisons; `consteval` enforces that parameter checks run at compile time only.

**Example:**

```cpp
// include/ml_kem/internals/math/field.hpp — zq_t
forceinline constexpr auto operator<=>(const zq_t&) const = default;
```

```cpp
// include/ml_kem/internals/utility/params.hpp
consteval bool check_eta(const size_t eta) { return (eta == 2) || (eta == 3); }
consteval bool check_l(const size_t l) {
  return (l == 1) || (l == 4) || (l == 5) || (l == 10) || (l == 11) || (l == 12);
}
// used as: requires(ml_kem_params::check_l(l))
```

**Bonus:** `std::bit_width(Q)` in `field.hpp` for bit-width of modulus.

**Relevant code:** `field.hpp`, `params.hpp`.
