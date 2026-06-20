export const futureFoundersBrand = {
  name: "Future Founders",
  slogan: "Building Tomorrow’s Founders",
  mainHeadline: "Unleash Your Business Potential",
  footerSlogan: "Learn. Build. Lead. Succeed.",
  contactNumber: "+263 717 428 535",
  whatsappNumber: "263717428535",
  mainCta: "Start Your Journey",
  palette: {
    midnightBlue: "#02060E",
    royalBlue: "#0356C5",
    black: "#000000",
    white: "#FFFFFF",
  },
} as const;

export const whatsappLink = (message = "Hello Future Founders, I want to start my journey.") =>
  `https://wa.me/${futureFoundersBrand.whatsappNumber}?text=${encodeURIComponent(message)}`;
