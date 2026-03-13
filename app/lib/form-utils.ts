/* Global fbq type for Facebook Pixel */
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((key) => {
    const val = params.get(key);
    if (val) utm[key] = val;
  });
  return utm;
}

/** Fire Facebook Pixel Lead event after successful form submission */
function trackFbLead(payload: Record<string, string>): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: payload.product || 'Coastal Quảng Ngãi',
      content_category: 'Real Estate',
    });
  }
}

export async function submitFormToWebhook(payload: Record<string, string>): Promise<void> {
  const res = await fetch('/api/contact/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Gửi thất bại');
  }

  trackFbLead(payload);
}
