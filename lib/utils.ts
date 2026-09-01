import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Number.isFinite(value) ? value : 0);
}

export function getAnnualRate() {
  const parsed = Number(process.env.NEXT_PUBLIC_DEMO_ANNUAL_INTEREST_RATE);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function calculatePayment(amount: number, termMonths: number, frequency: "Monthly" | "Weekly", annualRate: number) {
  const numberOfPayments = frequency === "Monthly" ? termMonths : Math.round((termMonths * 52) / 12);
  const periodicRate = frequency === "Monthly" ? annualRate / 12 : annualRate / 52;

  if (amount <= 0 || numberOfPayments <= 0) return { payment: 0, numberOfPayments, periodicRate };
  if (periodicRate === 0) return { payment: amount / numberOfPayments, numberOfPayments, periodicRate };

  const payment = (amount * periodicRate) / (1 - Math.pow(1 + periodicRate, -numberOfPayments));
  return { payment, numberOfPayments, periodicRate };
}

export function isAdultDob(value: string) {
  if (!value) return false;
  const dob = new Date(`${value}T00:00:00`);
  const today = new Date();
  if (Number.isNaN(dob.getTime()) || dob > today) return false;
  const eighteenth = new Date(dob);
  eighteenth.setFullYear(eighteenth.getFullYear() + 18);
  return eighteenth <= today;
}

export function generateSubmissionId(formId: string) {
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0")
  ].join("");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const suffix = Array.from({ length: 5 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  return `${formId}-${stamp}-${suffix}`;
}

export function formatEin(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  return digits.length > 2 ? `${digits.slice(0, 2)}-${digits.slice(2)}` : digits;
}

export function formatSsn(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  if (digits.length > 5) return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
  if (digits.length > 3) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return digits;
}

export function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
