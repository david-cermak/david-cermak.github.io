CAN security? Needs to move closer to the controller/hardware layer

Interesting arXiv paper 👉 https://arxiv.org/pdf/2608.03567v1
*CAN Disabler: Hardware-based Prevention method of Unauthorized Transmission in CAN and CAN-FD networks*
 
Modern vehicles have dozens of ECUs connected through CAN/CAN-FD. When an attacker compromises one ECU (through an infotainment, connected service, ...) they can potentially inject messages directly into the vehicle network. CAN has no built-in authentication/authorization. A compromised ECU can simply ask the CAN controller to transmit something it should not.

This work proposes an interestingly pragmatic idea: put the security boundary inside the CAN controller.
* Whitelist which CAN IDs an ECU may transmit
* Enforce minimum transmission intervals
* Disable unused transmit mailboxes
* Do it in hardware, before the message reaches the bus

They implemented it on an FPGA and demonstrated the approach on CAN-FD, with a maximum filtering overhead of just 6.25 μs.

The authors aknowledge that this is *not* a replacement for *cryptographic authentication*.
But their work establishes a practical security principle: Don't assume the ECU/software is trustworth and put a last line of defense between compromised software and the bus.