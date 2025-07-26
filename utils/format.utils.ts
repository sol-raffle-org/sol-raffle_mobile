export const formatNumber = (
  numberValue?: number,
  maximumFractionDigits = 2,
  minimumFractionDigits = 0,
  localeOption = {}
) => {
  try {
    if (!numberValue && numberValue !== 0) return "--";
    const num = Number(numberValue);

    return num.toLocaleString("en-US", {
      maximumFractionDigits,
      minimumFractionDigits: minimumFractionDigits,
      ...localeOption,
    });
  } catch (error) {
    console.log("Error formatting number", error);
    return String(numberValue);
  }
};

export const formatSecondsToTime = (seconds: number) => {
  if (!seconds) return "00:00";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [
    ...(hrs >= 1 ? [String(hrs).padStart(2, "0")] : []),
    String(mins).padStart(2, "0"),
    String(secs).padStart(2, "0"),
  ];

  return parts.join(":");
};

export const formatDateToUTCString = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.toLocaleString("en-GB", {
    month: "short",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes} UTC`;
};
