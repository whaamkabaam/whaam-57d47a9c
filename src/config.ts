// Centralized public config (no env vars)
export const CONFIG = {
  checkout: {
    live149: "https://copecart.com/products/ee4c5fc8/checkout",
  },
  
  fastspring: {
    storefront: "whaamkabaam.test.onfastspring.com",
    accountUrl: "https://whaamkabaam.test.onfastspring.com/account",
    products: {
      basic: {
        daily: "ccs-basic-day-pass",
        weekly: "ccs-basic-week-pass",
        monthly: "ccs-basic-monthly",
      },
      plus: {
        daily: "ccs-plus-day-pass",
        weekly: "ccs-plus-week-pass",
        monthly: "ccs-plus-monthly",
      },
      ultra: {
        daily: "ccs-ultra-day-pass",
        weekly: "ccs-ultra-week-pass",
        monthly: "ccs-ultra-monthly",
      },
    },
  },
  
  pricing: {
    basic: { daily: 3.99, weekly: 7.99, monthly: 14.99 },
    plus: { daily: 5.99, weekly: 12.99, monthly: 23.99 },
    ultra: { daily: 8.99, weekly: 17.99, monthly: 34.99 },
  },
  
  schedule: {
    calendlyUrl: "https://calendly.com/your-handle/live-session",
  },
  discord: {
    invite: "https://discord.com/invite/placeholder",
    count: 50000,
  },
  reviews: {
    count: 100,
  },
};
