// Analytics — integrates with GA4, Meta Pixel, and TikTok Pixel.
// Set VITE_GA4_MEASUREMENT_ID, VITE_META_PIXEL_ID, VITE_TIKTOK_PIXEL_ID in Render env vars.

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    ttq?: { track: (event: string, data?: object) => void };
    dataLayer?: any[];
  }
}

let isInitialized = false;

export function initTracking(): void {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  const ga4Id = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  if (ga4Id) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: any[]) { window.dataLayer!.push(args); };
    window.gtag('js', new Date());
    window.gtag('config', ga4Id, { send_page_view: false });
  }
}

export function trackPageView(path: string): void {
  if (!isInitialized) initTracking();

  const ga4Id = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  if (ga4Id && window.gtag) {
    window.gtag('config', ga4Id, { page_path: path });
  }

  window.fbq?.('track', 'PageView');
}

export function trackEvent(category: string, action: string, label?: string): void {
  if (!isInitialized) initTracking();

  window.gtag?.('event', action, { event_category: category, event_label: label });
  window.fbq?.('trackCustom', action, { category, label });
}

export function trackEmailSignup(email: string): void {
  trackEvent('engagement', 'email_signup', email);
  window.fbq?.('track', 'Lead');
  window.ttq?.track('CompleteRegistration');
}

export function trackStreamClick(platform: string, trackName?: string): void {
  trackEvent('engagement', 'stream_click', `${platform}${trackName ? `: ${trackName}` : ''}`);
}

export function trackContactSubmit(): void {
  trackEvent('engagement', 'contact_form_submit');
  window.fbq?.('track', 'Contact');
}
