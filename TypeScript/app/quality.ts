// Quality releated logic
import Item from "./item";
import { increaseQuality, increaseQualityForConcert, setQualityItem } from './utils';

// Update logic for Aged Brie
export const setQualityForAgedBrie = (item): Item => {
    item.quality = increaseQuality(item.quality)
    item.quality = item.sellIn < 0 ? increaseQuality(item.quality) : item.quality
    item.sellIn -= 1;
    return item
}

// Update logic for Backstage passes to a TAFKAL80ETC concert
export const setQualityForConcert = (item): Item => {
    item.quality = item.sellIn === 0 ? 0 : increaseQualityForConcert(item);
    item.sellIn -= 1
    return item;
}

// Update quality for Sulfuras, Hand of Ragnaros
export const setQualityForSulfuras = (item, qty): Item => {
    item.quality = qty;
    return item
}

// Update quality and sellin for Conjured
export const setQualityForConjured = (item): Item => {
    if (item.sellIn === 5) {
        item.quality -= 3
    } else {
        item = setQualityItem(item)
        item = setQualityItem(item)
    }
    item.sellIn -= 1
    return item
}

// Update quality and sellin for default items
export const setQualityForNormalItem = (item): Item => {
    item = setQualityItem(item)
    item.sellIn -= 1
    return item
}