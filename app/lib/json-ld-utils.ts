/**
 * JSON-LD utility helpers for safe serialization and date formatting.
 * Prevents XSS via </script> injection in JSON-LD blocks.
 */

/**
 * Serialize data for JSON-LD `dangerouslySetInnerHTML`.
 * Replaces `<` with `\u003c` to prevent `</script>` injection.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * Safely format a date string to locale display.
 * Returns `fallback` (default 'N/A') if the input produces an Invalid Date.
 */
export function safeFormatDate(
  dateStr: string | undefined | null,
  locale = 'vi-VN',
  options?: Intl.DateTimeFormatOptions,
  fallback = 'N/A',
): string {
  if (!dateStr) return fallback;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return fallback;
  return d.toLocaleDateString(locale, options);
}
