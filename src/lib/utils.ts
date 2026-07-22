export function getOrCreateFingerprint(): string {
  const key = "pueblo_nuevo_fp";

  if (typeof window === "undefined") {
    return "";
  }

  const existing = localStorage.getItem(key);
  if (existing && /^[a-f0-9-]{16,64}$/.test(existing)) {
    return existing;
  }

  const fingerprint = crypto.randomUUID().replace(/-/g, "");
  localStorage.setItem(key, fingerprint);
  return fingerprint;
}

export function sanitizeInput(value: string, maxLength: number): string {
  return value.trim().slice(0, maxLength);
}

export function isValidEmail(email: string): boolean {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
}
