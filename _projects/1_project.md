---
layout: page
title: AudioAnalyst
description: Providing increased situational awareness to deployed units via automated audio processing
img: assets/img/sdr_atc.png
importance: 1
category: work
related_publications: false
---

<div class = "h3">
Background
</div>

Cryptologic Language Analysts in all branches of the military provide real-time support to deployed units through the interpretation of foreign language communication intercepts. In the Navy, these analysts are designated as Cryptologic Technicians Interpretive (CTI). Typically, specific linguists accompany a deployed unit based on their area of operation. Depending on the area and mission, however, the unit could intercept foreign languages that are unknown to the linguists. This leaves the potential for misinterpreted or unutilized real-time communications intelligence (COMINT). To a covert unit such as a submarine, this presents a vulnerability since real-time COMINIT can provide cues to determine if the submarine has been counter-detected, meaning the submarine’s presence has been detected by others.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/BLQ10.png" title="BLQ-10" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The AN/BLQ-10 Submarine Electronic Warfare Support System, which provides submarines with automatic detection, classification and localization of intercepted radar and communication signals. The system, operated by the submarine’s Electronic Warfare Technicians (ITEs), provides information to avoid counter-detection and collision, as well as conduct ISR missions.
</div>

<div class = "h3">
Hardware
</div>

Using a Raspberry Pi and software-defined radio (SDR), I explored the feasibility of using a speech-recognition model for real-time detection, transcription, and translation of Very High Frequency (VHF) voice transmissions to provide deployed Language Analysts with an additional tool for situational awareness.

The receiver consisted of a 1 m whip antenna connected to a RTL-SDR V4 RTL2832U and Raspberry Pi 5. I used SDR++, the native software for the RTL-SDR, running on the Raspberry Pi to remotely receive the SDR data onto my personal computer. The AutoAnalyst program receives audio from the audio loopback driver and outputs the intercepted language and translated transcriptions to a user-friendly log.


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/sdr_atc_2.png" title="sdr hardware" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/sdr_atc_3.png" title="sdr hardware" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

<div class = "h3">
Software
</div>

The WhisperAI model by Open AI provides robust transcription and translation for dozens of spoken languages. Members of the SDR community have experimented with fine-tuning this open-source model to more accurately transcribe air traffic control lexicon, however, I chose not to use such a model. Globally, air traffic control communications utilize English phraseology standardized by the International Civil Aviation Organization, and as such, a voice recognition model that is fine-tuned to air traffic control would not meet the intent of a multilingual automatic speech recognition model.

In addition to processing local air traffic control communications all of which were in English, I tested the transcription model on non-English air traffic recordings that were injected via the audio loopback driver to the AutoAnalyst program.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/sdr_atc_4.png" title="intercepts" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class = "h3">
Evaluation
</div>

With a simple signal path and commercial-off-the-shelf (COTS) components, this setup could be cheaply and rapidly deployed to any unit, providing situational awareness with low space and power requirements. Improvements could be made by using more capable COTS SDRs which are available for less than $1,000 and could scan multiple frequency bands simultaneously.


<div class = "h3">
References
</div>

Hill, J., & Hill, J. (2024, January 9). Lockheed Martin upgrades EW systems for US Navy submarines. Naval Technology. https://www.naval-technology.com/news/lockheed-martin-upgrades-ew-systems-for-us-navy-submarines/?cf-view

Daniel, B. (2024, March 19). U.S. Navy Submarine Technology Explained. Trenton Sytems. https://www.trentonsystems.com/en-us/resource-hub/blog/navy-submarine-warfare-technology

Jlvdoorn. (n.d.). GitHub - jlvdoorn/WhisperATC: Applying Large-Scale Weakly-Supervised Automatic Speech Recognition to Air Traffic Control. GitHub. https://github.com/jlvdoorn/WhisperATC
