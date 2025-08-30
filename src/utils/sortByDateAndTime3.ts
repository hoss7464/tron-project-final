// utils/filterUtils.ts
export function filterByResourceType<T extends { resourceType: string }>(
  data: T[],
  filterBy: 'All' | 'energy' | 'bandwidth' = 'All'
): T[] {
  if (filterBy === 'All') {
    return [...data];
  }
  
  return data.filter(item => item.resourceType === filterBy);
}