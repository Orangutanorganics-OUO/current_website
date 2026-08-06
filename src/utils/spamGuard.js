/**
 * Shared spam-guard utilities for public forms.
 *
 * Two client-side checks that stop the vast majority of automated form spam
 * without any UI friction for real users:
 *
 *   1. Honeypot field  — a hidden input real users can't see, but naive
 *      form-fill bots blindly populate. If it comes back with a value on
 *      submit, we drop the submission.
 *   2. Minimum dwell time — bots fill and submit in milliseconds; humans
 *      take at least a few seconds. Reject submissions that fire faster
 *      than MIN_DWELL_MS from page load.
 *
 * Neither check adds a captcha or blocks JS-disabled users. Both are
 * best-effort — a determined attacker will bypass them — but they will
 * kill 90%+ of the drive-by spam we're seeing.
 */

// Field name is deliberately something bots find attractive. Do NOT rename
// to something obviously "honeypot" — the whole point is the bot thinks
// it's a real field it should populate.
export const HONEYPOT_FIELD_NAME = 'website';

// Bots typically fire submits within a few hundred ms of page load. Real
// humans take at least this long to read + fill a form.
export const MIN_DWELL_MS = 2500;

/**
 * CSS style object that hides the honeypot input from real users but
 * keeps it in the accessibility/DOM tree for bots to detect. Off-screen
 * positioning + zero opacity + tabindex=-1 + aria-hidden means:
 *   - real users never see it or tab to it
 *   - screen readers skip it
 *   - dumb form-fill bots find it via input[name=website] and fill it
 */
export const HONEYPOT_STYLE = {
  position: 'absolute',
  left: '-9999px',
  width: '1px',
  height: '1px',
  opacity: 0,
  pointerEvents: 'none',
  overflow: 'hidden',
};

/**
 * Returns true if the submission looks like spam.
 *
 * @param {string} honeypotValue - current value of the honeypot input
 * @param {number} loadedAt      - Date.now() timestamp when the form mounted
 * @returns {boolean}
 */
export function isLikelySpam(honeypotValue, loadedAt) {
  // Honeypot filled → bot.
  if (honeypotValue && honeypotValue.trim() !== '') return true;

  // Submitted suspiciously fast → bot.
  if (loadedAt && Date.now() - loadedAt < MIN_DWELL_MS) return true;

  return false;
}
