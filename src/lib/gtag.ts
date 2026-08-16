export const GA_MEASUREMENT_ID = "G-QH7PH6RFK3";

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

// Track Pageview
export function pageview(url: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

// Track Custom GA4 Business Events
export function sendGAEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window !== "undefined" && window.gtag) {
    // Sanitize parameters to remove undefined or empty values
    const cleanParams: Record<string, string | number | boolean> = {};
    if (eventParams) {
      Object.keys(eventParams).forEach((key) => {
        const val = eventParams[key];
        if (val !== undefined && val !== null && val !== "") {
          cleanParams[key] = val;
        }
      });
    }
    window.gtag("event", eventName, cleanParams);
  }
}
