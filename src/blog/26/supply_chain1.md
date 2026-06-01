When your scanner is the breach🚨: Trivy supply-chain compromise and what our CI should change tomorrow

🔗 https://lnkd.in/dQvhj_if
The Trivy compromise is a reminder that supply-chain attacks succeed by exploiting trust, not just code.

📅What happened:
* Feb 27: attackers exploited a misconfigured pull_request_target workflow to steal a high-privilege GitHub token.
* Mar 1: some credentials were rotated, but not fully or atomically — leaving residual access. 
* Mar 19: attackers returned using that access to publish a malicious Trivy release and force-push trusted GitHub Action tags to backdoored commits. 
* The malware ran *before* the legitimate scan, so CI logs still looked normal while secrets were quietly exfiltrated.

This shows this wasn’t a single issue, but result of:
* unsafe CI workflow design, 
* incomplete credential rotation, and 
* trust in mutable references like tags.

Key lessons👀:
1) Pin GitHub Actions to commit SHAs, not tags
2) Treat every exposed CI secret as highly privileged
3) Rotate compromised credentials completely, not partially
4) Monitor for force-pushed tags and release tampering

💡Reminder: CI/CD is now a primary security boundary
