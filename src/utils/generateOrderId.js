// Backend requires unpredictable IDs so a Razorpay webhook can't be replayed
// against a guessed pending-order key. Always call fresh — never reuse across
// retries.
export function generateOrderId() {
  return `OUO-${crypto.randomUUID()}`;
}
