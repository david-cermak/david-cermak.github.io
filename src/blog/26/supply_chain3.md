3️⃣ Lessons for GitHub Actions maintainers (from the recent "Mini Shai-Hulud" supply-chain attack)

About ~month ago, I posted how "TeamPCP strikes again"👉 https://lnkd.in/d6tbBHen

This Monday they stroke, yet again, hitting ~170 packages across npm and PyPI and the attack chain was really interesting (though lasted ~6 minutes)
→ A malicious PR abused *pull*_*request*_*target *allowing attacker-controlled code to execute in the base repo security context.
→ The workflow then *poisoned *the shared GitHub Actions dependency *cache (*PR closed, branch deleted -- cache persists invisibly).
→ The legitimate release pipeline published the malicious packages, restoring the poisoned cache.

Lessons:
1️⃣ Never use pull_request_target to run untrusted code
 (use it only for metadata operations: labels/comments), not for builds/tests/package managers.
2️⃣ Treat caches as executable artifacts (dependency caches are effectively shared filesystem snapshots). Use separate caches by trust level and avoid restoring caches in release jobs.
3️⃣ OIDC/trusted publishing is not enough (short-lived credentials help against secret theft, but not against compromised workflows) if the CI pipeline is hijacked.

ICYMI: 
* TanStack Supply Chain Attack Hits Two OpenAI Employee Devices👉 https://thehackernews.com/2026/05/tanstack-supply-chain-attack-hits-two.html
* TeamPCP hackers advertise Mistral AI code for sale👉 https://www.bleepingcomputer.com/news/security/teampcp-hackers-advertise-mistral-ai-code-repos-for-sale/
* Shai-Hulud Goes Open Source👉 https://www.ox.security/blog/shai-hulud-open-source-malware-github/