# 🎼📸🎥🎛️🎚️Kellar-Studio Autonomous Ecosystem

An enterprise-grade, fully automated media orchestration and system governance engine. This repository manages end-to-end media asset validation, high-performance transcoding pipelines, secure credential synchronization, and self-healing daemon layers.

---

### 🛠️ Tech Stack, Languages & Infrastructure

| Layer | Component | Badge |
| :--- | :--- | :--- |
| **Runtime** | Node.js v22+ | 🟢 ![Node.js](https://img.shields.io/badge/Node.js-v22.x-339933?style=flat-square&logo=node.js&logoColor=white) |
| **Automation** | PM2 Process Manager | 👑 ![PM2](https://img.shields.io/badge/PM2-Daemon-5A29E4?style=flat-square&logo=pm2&logoColor=white) |
| **Processing** | FFmpeg Engine | ⚙️ ![FFmpeg](https://img.shields.io/badge/FFmpeg-Compiler-0078D4?style=flat-square&logo=ffmpeg&logoColor=white) |
| **Security** | Dotenv-Vault | 🔒 ![Dotenv--Vault](https://img.shields.io/badge/Vault-Encrypted-000000?style=flat-square&logo=dotenv&logoColor=white) |
| **CI/CD** | GitHub Actions | 🚀 ![GitHub_Actions](https://img.shields.io/badge/CI%2FCD-Pipeline-2088FF?style=flat-square&logo=github-actions&logoColor=white) |
| **Backend** | Express.js | 🖥️ ![Express.js](https://img.shields.io/badge/Express-Dashboard-000000?style=flat-square&logo=express&logoColor=white) |

---

## ❓ What Is This?
The **Kellar-Studio Autonomous Ecosystem** is a centralized, infrastructure-as-code orchestration engine designed to handle media production pipelines without human intervention. By decoupling specific asset tasks into a modular 50-file matrix, the system separates pure execution layers (like video processing and notification webhooks) from overarching system governance (pre-flight environment tracking, dynamic routing, and error-handling middleware).

---

## ⚡ What This Does?
The architecture executes a tiered, clock-synced automation protocol structured across three major zones:

* **Ingestion & Media Transformation (Scripts 01–20):** Automatically detects incoming files, validates naming conventions against structural rules, runs acoustic analyses, transcodes 4K footage into lightweight 1080p CFR proxies, and applies geometric watermarks and brand layouts.
* **Analytics & Integration Service (Scripts 21–40):** Runs automated quality control testing (`QC_REPORT.txt`), monitors predictive disk storage usage limits, triggers multi-platform metadata synchronization, and coordinates webhook responses.
* **System Governance & Controller Layer (Scripts 41–50):** * **The Brain (`41_pipeline_controller.js`):** Routes incoming tasks dynamically based on a clean `pipeline_config.json` map.
    * **The Safety Net (`44_exception_handler.js`):** Wraps operations to guarantee graceful degradation—preventing single-script failures from throwing unhandled exceptions that crash the pipeline.
    * **The Inspector (`45_environment_validator.js`):** Validates systems dependencies (e.g., native FFmpeg installations) on cold boot.
    * **The Vault (`48_vault_security_sync.js`):** Injects AES-256 encrypted production credentials cleanly into runtime memory.

---

## 🛡️ What Problem This Solves?

* **Eliminates Monolithic Spaghetti Code:** Traditional automation chains break when one API endpoint or script fails. By breaking the system into a distinct **Controller -> Registry -> Worker** model, scripts can be added, updated, or removed without breaking the engine.
* **Prevents System Memory & Storage Exhaustion:** High-volume rendering pipelines inherently risk memory leaks and localized disk saturation. This setup integrates built-in log rotation (`winston-daily-rotate-file`) alongside a strict `PM2` max-memory threshold profile to maintain permanent system stability.
* **Secures API Infrastructure:** Mitigates the risk of leaking sensitive webhooks, Notion integration keys, or cloud platform tokens by relying on `dotenv-vault` encryption workflows mapped directly through automated GitHub Actions workflows.
* **Enforces Architectural Portability:** Eliminates environment alignment friction ("works on my machine" syndrome). The pipeline includes an explicit infrastructure file (`pipeline-config.yml`), ensuring your entire 50-file ecosystem can be packed, provisioned, and scaled on any target system cleanly.

---

## 📁 Repository Map

```text
├── .github/workflows/
│   └── main.yml                    # Automated GitHub Actions Master Deployment
├── 01_nomenclature_validator.js   # Ingestion rules
├── ...
├── 41_pipeline_controller.js       # Core Orchestrator
├── 42_pipeline_config.json         # Master Flow Layout configuration
├── 43_dynamic_registry.js          # Dynamic Script lookup table
├── 44_exception_handler.js         # Isolation and failure mitigation
├── 45_environment_validator.js     # Pre-Flight engine tester
├── 46_log_rotator.js               # Autonomous log maintainer
├── 47_process_daemon.config.js     # PM2 service profile
├── 48_vault_security_sync.js       # Encrypted token injection
├── 49_pipeline_dashboard_stub.js   # Express engine monitoring portal
├── 50_emergency_shutdown_protocol.js# Immediate fail-safe system kill switch
├── package.json                    # Dependency and initialization blueprint
└── pipeline-config.yml             # Global system infrastructure definitions
