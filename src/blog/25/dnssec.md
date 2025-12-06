🔍 Do you *trust *your *DNS?*

There’s been an interesting incident where a CA mis-issued TLS certificates for Cloudflare’s well-known resolver 1.1.1.1 👉 https://lnkd.in/eGrZ4weF

These certificates were reportedly created for testing. Still, they highlight a risk: if such a certificate (plus its private key) were abused, DoH or DoT (DNS over HTTPS/TLS) traffic could, in theory, be intercepted.

No evidence of exploitation was found, but the case is a good reminder that even encrypted DNS is only as strong as the certificate ecosystem behind it.

💬 Does your IoT device use DoH/DoT? (or DNSSEC?)