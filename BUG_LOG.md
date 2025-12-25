# Project Bug & Resolution Log
## Academic Review Copy

**Status Key**:
🔴 Critical (System Failure)
🟡 Major (Feature Broken)
🟢 Minor (UI/Cosmetic)

---

### Resolved Issues

| ID | Issue | Category | Severity | Root Cause | Resolution | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-001** | Google Login Redirect Loop | Auth | 🔴 Critical | `redirect_uri` mismatch in Google Console | Updated Console URI and `.env` callback URL | ✅ Fixed |
| **BUG-002** | AI Analysis Timeout | Logic | 🟡 Major | Vercel Serverless Function timeout (10s limit) | Optimized prompt length and added client-side loading state | ✅ Fixed |
| **BUG-003** | "Software Engineer" Default | AI Logic | 🟡 Major | Fallback logic hardcoded to Tech roles | Rewrote `generateFallbackAnalysis` to detect User Goal dynamically | ✅ Fixed |
| **BUG-004** | PDF text overlapping | UI | 🟢 Minor | `jspdf` incorrect margin calculation | Adjusted `yPos` increment logic in `DeepAnalysis.tsx` | ✅ Fixed |
| **BUG-005** | Mobile Menu not opening | UI | 🟢 Minor | `z-index` conflict with Hero section | Increased Navbar `z-index` to 50 | ✅ Fixed |
| **BUG-006** | White screen on Refresh | State | 🟡 Major | Hydration mismatch in `AnimatePresence` | Added `mounted` check to ensure client-side rendering only | ✅ Fixed |

---

### Pending / Known Limitations
*   **LIMIT-001**: Resume Scanner currently only accepts text copy-paste (PDF upload planned for v2).
*   **LIMIT-002**: AI rate limits may affect performance during high traffic (mitigated by caching in future).

---

**Last Updated**: 2025-12-13
**Maintained By**: QA Team
