Hi embedded engineers 👋

As you probably noticed, mbedTLS v4 switches fully to the PSA Crypto API, and legacy crypto APIs are gone.
For ESP32 users, this shift becomes unavoidable with ESP-IDF v6.0, which exposes a PSA-only mbedTLS interface.

While migrating a few components, I realized there wasn’t a single, practical guide aimed at mbedTLS users (not maintainers) that clearly explains what exactly needs to change and how to migrate step by step.
So I put together a short presentation that breaks the migration down into 6 concrete steps (6🤷7 actually: 6 migration steps + one verification)

---
marp: true
theme: default
paginate: true
header: 'David Cermak: Migration to PSA crypto'
style: |
  h1 {
    font-size: 1.4em;
    color: #EE0000
  }
  h2 {
    font-size: 1.3em;
    color: #DD0000
  }
  h3 {
    font-size: 1.2em;
    color: #880000
  }

---

# mbedTLS v3 → v4 migration in 6-7 steps

### mbedTLS v3 (before)
- Direct crypto APIs:
  - `mbedtls_sha*`, `mbedtls_aes_*`
  - `mbedtls_entropy_*`, `mbedtls_ctr_drbg_*`
- TLS explicitly wired to RNG
- Optional PSA usage

### mbedTLS v4 (after): PSA Crypto is mandatory
- TLS internally calls PSA
- No user-owned RNG contexts
- Fewer, cleaner TLS APIs

---

## Migration steps

1. Initialize PSA Crypto once
2. Remove legacy RNG ownership
3. Replace legacy crypto calls with PSA
4. Update changed mbedTLS APIs
5. Fix TLS / DTLS specifics
6. Adjust build-time configuration
7. Test and validate

---

## Step 1: PSA Crypto initialization

Call `psa_crypto_init()` **once** during startup

### Why
- PSA is the only crypto backend in v4
- TLS, hashes, ciphers all depend on it

```cpp
#include "psa/crypto.h"

void app_init(void)
{
    psa_crypto_init();
}
```

⚠️ Missing this is a common cause of handshake failures

---

## Step 2: Remove RNG ownership

### Remove entirely
- `mbedtls_entropy_context`
- `mbedtls_ctr_drbg_context`
- `mbedtls_ssl_conf_rng()`

**No replacement needed** — TLS uses PSA RNG internally

![RNG-ownership](/images/rng.svg)

---

## Step 3: Replace legacy crypto calls

### Hashes
- `mbedtls_sha*` → `psa_hash_*`

### Ciphers
- `mbedtls_aes_*` → `psa_cipher_*` or `psa_aead_*`

### Example (SHA-1)

```cpp
psa_hash_operation_t op = PSA_HASH_OPERATION_INIT;
psa_hash_setup(&op, PSA_ALG_SHA_1);
psa_hash_update(&op, data, len);
psa_hash_finish(&op, out, 20, &out_len);
psa_hash_abort(&op);
```

---

## Step 4: Update changed mbedTLS APIs

### Key parsing
- RNG parameters removed

```cpp
// v3
mbedtls_pk_parse_key(pk, buf, len, pwd, pwd_len, f_rng, p_rng);

// v4
mbedtls_pk_parse_key(pk, buf, len, pwd, pwd_len);
```

### Session tickets
- Cipher enum → PSA algorithm parameters

```cpp
mbedtls_ssl_ticket_setup(&ctx, PSA_ALG_GCM, PSA_KEY_TYPE_AES, 256, timeout);
```

---

## Step 5: TLS / DTLS specifics

### DTLS cookies
- No RNG arguments anymore

```cpp
mbedtls_ssl_cookie_setup(&cookie);
```

### DTLS timers
- Provide platform timers explicitly

```cpp
mbedtls_ssl_set_timer_cb(&ssl, ctx,
    timer_set_delay, timer_get_delay);
```

### TLS 1.3 hostname check
- `mbedtls_ssl_set_hostname()` is now required

---

## Step 6: Build & configuration changes

### Remove deprecated options
- RSA-PSK, DHE-PSK
- Static ECDH
- CBC-only cipher suites
- Legacy entropy / DRBG options

### ESP-IDF specifics
- No dependency on `MBEDTLS_PK_RSA_ALT_SUPPORT`
- Use SoC capability flags (e.g. DS peripheral)

---

## Migration checklist

☐ Call `psa_crypto_init()`
☐ Remove entropy / CTR_DRBG code
☐ Remove `mbedtls_ssl_conf_rng()`
☐ Replace SHA / AES with PSA APIs
☐ Update `mbedtls_pk_parse_key()` calls
☐ Update session ticket setup
☐ Fix DTLS cookie & timer usage
☐ Clean up PK contexts you allocate
☐ Re-test TLS and DTLS handshakes

---

## Conclusion

### What you gain
- Cleaner TLS integration
- Unified crypto API
- Future-proof architecture

### Migration strategy
- Prefer **direct PSA migration** to compatibility shims
- **mbedTLS v4 is not incremental**
  - It is architectural -- migrating pays off for future releases
