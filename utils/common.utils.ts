import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toPng } from "html-to-image";
import html2canvas from "html2canvas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidEnumValue = <T extends { [key: string]: string }>(
  enumObj: T,
  value: string
): value is T[keyof T] => {
  return Object.values(enumObj).includes(value as T[keyof T]);
};

export const downloadDivAsImage = async (
  elementId: string,
  filename: string = "download"
): Promise<void> => {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  try {
    const dataUrl = await toPng(element, {
      pixelRatio: 1,
      fetchRequestInit: { mode: "no-cors" },
      cacheBust: true,
    });

    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Error capturing image:", error);
  }
};

export const convertHTMLToCanvas = async (
  elementId: string,
  filename: string = "download"
): Promise<void> => {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      useCORS: true,
      backgroundColor: null,
    });
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Error capturing image:", error);
  }
};

export const wait = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const recall = async <T>(
  fn: () => T,
  delay: number,
  retries: number,
  maxRetries: number
): Promise<T> => {
  try {
    return await fn();
  } catch (err) {
    if (retries > maxRetries) {
      throw err;
    }
    await wait(delay);
    return await recall(fn, delay, retries + 1, maxRetries);
  }
};

export const retry = async <T>(
  fn: () => Promise<T>,
  delay: number,
  maxRetries: number
): Promise<T> => {
  return await recall(fn, delay, 0, maxRetries);
};

export const truncateHash = (
  address?: string,
  startLength = 5,
  endLength = 5
) => {
  if (!address) return "";
  return `${address.substring(0, startLength)}...${address.substring(
    address.length - endLength
  )}`;
};

export const checkEmailFormat = (email: string): boolean => {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.length && !regexEmail.test(email)) return false;
  else return true;
};

export const getAvatarUrl = (filename?: string) => {
  if (!filename) return "";

  const encodeUri = encodeURIComponent(filename);
  return `${process.env.AVATAR_URL_PREFIX}${encodeUri}`;
};

export const calculateWinChance = (
  userTotalEntryValue?: number,
  totalPot?: number
): string => {
  if (!userTotalEntryValue || !totalPot) return "0.00%";

  const percent = (userTotalEntryValue / totalPot) * 100;

  return `${percent.toFixed(2)}%`;
};

export const calculateWinMultiplier = (
  totalWin?: number,
  totalBet?: number
): string => {
  if (!totalBet || !totalWin) {
    return "0x";
  }

  const multiplier = totalWin / totalBet;

  const formatted = Number.isInteger(multiplier)
    ? `${multiplier}x`
    : `${multiplier.toFixed(2)}x`;

  return formatted;
};

export const isNumberInRange = (number: number, rangeStr: string): boolean => {
  const [startStr, endStr] = rangeStr.split("-");

  const start = parseInt(startStr, 10);
  const end = parseInt(endStr, 10);

  if (isNaN(start) || isNaN(end)) return false;

  return number >= start && number <= end;
};

export const shuffleArray = (array: any[]) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const deepEqual = (value1: any, value2: any) => {
  if (value1 === value2) return true;

  if (
    value1 === null ||
    value2 === null ||
    typeof value1 != "object" ||
    typeof value2 != "object"
  )
    return false;

  const value1Keys = Object.keys(value1);
  const value2Keys = Object.keys(value2);

  if (value1Keys.length !== value2Keys.length) return false;

  for (const key of value1Keys) {
    if (!value2Keys.includes(key) || !deepEqual(value1[key], value2[key]))
      return false;
  }

  return true;
};
