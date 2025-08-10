export type SortOption = 'price' | 'energy' | 'bandwidth' | 'latest' | 'oldest';

type ItemWithDateTime = {
  createdAt: string;
  price: number;
  resourceType: string;
};



export function sortAndFilterOrders<T extends ItemWithDateTime & { status: string }>(
  data: T[],
  sortBy: SortOption = 'price'
): T[] {
  // First filter if needed
  let filteredData = [...data];
  if (sortBy === 'energy' || sortBy === 'bandwidth') {
    filteredData = data.filter(item => item.resourceType === sortBy);
  }

  // Then sort based on the option
  return filteredData.sort((a, b) => {
    // Completed items should always go to the bottom
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    
    // If both have same status, apply normal sorting
    switch (sortBy) {
      case 'price':
      case 'energy':
      case 'bandwidth':
        // Highest price first
        return b.price - a.price;
      case 'latest':
        // Newest first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        // Oldest first
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:
        return 0;
    }
  });
}