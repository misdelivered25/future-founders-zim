import { img } from "@/lib/images";

const fallback = "/placeholder.svg";

const fromExisting = (key: string, fallbackPath = fallback) => {
  const existing = img as unknown as Record<string, string>;
  return existing[key] || fallbackPath;
};

export const ffImages = {
  logo: fromExisting("logo"),
  students: fromExisting("students", fromExisting("classroom")),
  publicSpeaking: fromExisting("speaking", fromExisting("publicSpeaking")),
  chess: fromExisting("chess"),
  graduate: fromExisting("graduate"),
  vendor: fromExisting("vendor"),
  skills: fromExisting("skills"),
  classroom: fromExisting("classroom"),
  financial: fromExisting("financial", fromExisting("financialLiteracy")),
  farmer: fromExisting("farmer"),
} as const;

export type FutureFoundersImageKey = keyof typeof ffImages;
