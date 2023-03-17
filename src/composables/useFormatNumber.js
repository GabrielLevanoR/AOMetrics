export default function useFormatNumber() {
  const formatNumber = (num) => {
    const absNum = Math.abs(num);
    if (absNum >= 1000000) {
      return (
        (num / 1000000).toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 1,
        }) + "M"
      );
    } else if (absNum >= 1000) {
      return (
        (num / 1000).toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 1,
        }) + "K"
      );
    } else {
      return num.toLocaleString();
    }
  };
  return { formatNumber };
}
