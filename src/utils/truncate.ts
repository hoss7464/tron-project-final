// Utility function to truncate TXID
export const truncateTxid = (txid: string, startChars: number = 6, endChars: number = 6): string => {
  if (txid.length <= startChars + endChars) {
    return txid;
  }
  return `${txid.substring(0, startChars)}...${txid.substring(txid.length - endChars)}`;
};