What supply chain attacks taught us... and what they taught Dependabot.

Hardly a week goes by without another malicious package making it through GitHub Actions, npm/PyPI... or automatic dependency management.

But the recent supply-chain attacks are usually short-lived. Attackers don't need the package to survive for weeks, just a few hours is enough for automated systems to fetch, build, and deploy it before the community notices and the package gets taken down.

GitHub has now adapted: Dependabot will 𝐰𝐚𝐢𝐭 𝟑 𝐝𝐚𝐲𝐬 before opening version-update PRs by default. Security updates are still delivered immediately, but ordinary version bumps get a short cooldown to give researchers and scanners time to flag malicious ones.

I think that's the bigger lesson from the last few months:
* Blind automation is becoming a supply-chain liability.
* Latest ≠ safest. Giving the ecosystem a chance to react can be a worthwhile trade-off.

Nice example of security by "slowing down a little"
👉https://github.blog/security/supply-chain-security/the-case-for-a-cooldown-why-dependabot-now-waits-before-issuing-version-updates/ (GitHub article)