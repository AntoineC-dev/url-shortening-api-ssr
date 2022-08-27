import { browser } from "$app/env";

export const copyToClipboard = async (str: string) => {
  if (!browser || !(navigator && navigator.clipboard && navigator.clipboard.writeText))
    return Promise.reject("The Clipboard API is not available.");
  return navigator.clipboard.writeText(str);
};
