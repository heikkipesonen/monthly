import { Purchase } from '../types/purchase'

export const filterByKeywords = (src: Purchase[], keywords: string[]) =>
  src.filter(item =>
    keywords.some((keyword) =>
      item.desc.toLowerCase().includes(keyword.toLowerCase())))

