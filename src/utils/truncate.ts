// Utility function to truncate TXID
export const truncateTxid = (txid: string, startChars: number = 6, endChars: number = 6): string => {
  if (txid.length <= startChars + endChars) {
    return txid;
  }
  return `${txid.substring(0, startChars)}...${txid.substring(txid.length - endChars)}`;
};


export const truncateTxid2 = (txid: string, startChars: number = 3, endChars: number = 3): string => {
  if (txid.length <= startChars + endChars) {
    return txid;
  }
  return `${txid.substring(0, startChars)}...${txid.substring(txid.length - endChars)}`;
};