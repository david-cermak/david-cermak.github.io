Breaking hashtag#PQC KEM on STM32? CTU researchers demonstrated a practical power analysis on HQC

Last month, three researchers from Czech Technical University presented quite interesting work at ICISSP 2026 🔗https://www.insticc.org/node/technicalprogram/ICISSP/2026
"*Simple Power Analysis of Polynomial Multiplication in HQC"*
👏 to Pavel Velek, Tomáš Rabas, and Jiří Buček.
👉 https://arxiv.org/html/2601.07634v1

*The problem:*
HQC is a post-quantum KEM selected by NIST as a backup candidate. The team showed that its decryption process can leak secret information through power consumption during polynomial multiplication.

*The board:*
They implemented the attack on an STM32F303 setup using a ChipWhisperer-Lite and demonstrated a practical single-trace power analysis.

*The conclusion:*
They reported a 99.69% success rate over 10,000 attempts and proposed countermeasures.

Nice to see scientists from Czechia at the research frontier of hashtag#PQC, and embedded security! 🇨🇿👏
