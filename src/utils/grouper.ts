import { PurchaseItem } from 'src/api/dto/purchase-entry';

export const filterByKeywords = (src: PurchaseItem[], keywords: string[]) =>
  src.filter(item =>
    keywords.some((keyword) =>
      item.desc.toLowerCase().includes(keyword.toLowerCase())))

