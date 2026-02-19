// Analytics tracking utilities

let isInitialized = false;

export function initTracking(): void {
  if (isInitialized) return;
  isInitialized = true;

  // Initialize any analytics services here (Google Analytics, etc.)
  console.log('[Tracking] Initialized');
}

export function trackPageView(path: string): void {
  if (!isInitialized) {
    initTracking();
  }

  // Track page view - can be extended with Google Analytics, etc.
  console.log('[Tracking] Page view:', path);

  // Example: If Google Analytics is set up
  // window.gtag?.('config', 'GA_MEASUREMENT_ID', { page_path: path });
}

export function trackEvent(category: string, action: string, label?: string): void {
  if (!isInitialized) {
    initTracking();
  }

  console.log('[Tracking] Event:', { category, action, label });

  // Example: If Google Analytics is set up
  // window.gtag?.('event', action, { event_category: category, event_label: label });
}
