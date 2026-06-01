Embedded hashtag#SSH with hashtag#PQC KEX? Yes. But you’ll pay.

And embedded devs pay in RAM💸, specifically ~40 KB of stack for KEX alone...

I’m preparing a new release of my libssh port, tracking libssh 0.12.0, which brings post-quantum key exchange into SSH.
👉https://github.com/david-cermak/libssh/pull/16

Big thanks to the hashtag#libssh maintainers and contributors for adding PQC👏:
*ML-KEM (*mlkem768x25519-sha256)
* based on libcrux (Cryspen), vendored via OpenSSH
* pure C reference impl (SHA-3)
* ~35 KB code size, heavy stack usage
*SNTRUP761 (*sntrup761x25519-sha512)
* original public-domain reference code (Bernstein et al.)
* same code path used in OpenSSH
* ~42 KB stack usage (!) due to large polynomial math
👉Both PQC algorithms come from OpenSSH's vendored reference impl: Correct, portable, upstream-aligned …but not optimized for embedded.

That's why I made both ML-KEM and SNTRUP761 configurable, so you can simply disable PQC if not needed in your project.

I’m a big fan of hashtag#PQC (you know if you've been following my posts😊) ...but pragmatic, too (PQC signatures/firmware validation often matter more than PQC KEX), since:
* Most embedded systems don’t care about "harvest now, decrypt later"
* Many do care about secure boot / root of trust

PS: In practice and in most cases → Disable PQC key exchange and focus on PQC where it matters.