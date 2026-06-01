Recent vulnerabilities in Mongoose networking lib

ICYMI: If your using Mongoose, update to v7.21🚨!
Security researcher Simone Margaritelli disclosed 3 major vulnerabilities in Mongoose (v7.0-7.20)
• CVE-2026-5246: Complete mTLS authentication bypass (P-384 certs)
• CVE-2026-5244: Pre-auth RCE via TLS heap overflow
• CVE-2026-5245: Pre-auth RCE via single mDNS UDP packet

Interestingly, one vulnerability was marked "ignore for now" in the code, causing all P-384 certificates to be accepted without verification😯 

Read more: https://lnkd.in/dQ9xz9FN
