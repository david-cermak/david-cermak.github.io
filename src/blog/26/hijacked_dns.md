Most people think HTTPS protects them from fake websites.

In the recent CubePilot incident, attackers reportedly hijacked DNS records and even obtained 𝐯𝐚𝐥𝐢𝐝 𝐓𝐋𝐒 𝐜𝐞𝐫𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐞𝐬 for the affected domains. The TLS authentication worked, while clients were talking to the attacker's server.

That's why technologies like DNSSEC (to authenticate DNS records) and encrypted DNS via DNS-over-HTTPS (DoH) or DNS-over-TLS (DoT) (to prevent DNS tampering in transit) are becoming increasingly important. They solve different problems, but together they make DNS attacks much harder.

Read more 👉 https://www.bleepingcomputer.com/news/security/cubepilot-drone-software-dev-hit-by-dns-hijacking-to-intercept-traffic/ (BleepingComputer article)

💡 Question for embedded devs: Do you secure your DNS? If not, this is worth a read! Attackers may not need your TLS keys if they take over the DNS.