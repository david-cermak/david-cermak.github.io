Hey embedded devs👋 we should *really* check our CI jobs

Last Saturday, I talked about the Trivy compromise → https://lnkd.in/d38HiMaT

A few days later, we got hit with LiteLLM. Now it’s Telnyx.
It is becoming clar that it's not over and the attackers (TeamPCP) are chaining compromises...

⚠️ Recent developments:
* LiteLLM (PyPI): backdoored releases executed payloads on import, stealing cloud creds, SSH keys, CI secrets 
* Malware included persistence mechanisms (e.g., .pth auto-execution, systemd backdoors) 
* Telnyx (PyPI): malicious versions hidden payloads inside WAV files to evade detection 
* Same attacker infrastructure and keys reused

👉 CI/CD is no longer just automation, but our critical security boundary.