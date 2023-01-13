// Common utility logics that can be used accross the application
import { Max_Quality, Min_Quality } from "./constants"
import Item from "./item"

// Compare lessthan max qty
const isLessThanMaximum = quality => quality < Max_Quality

// Compare greather min qty
const isOverMinimum = quality => quality > Min_Quality

// increase qty
export const increaseQuality = quality => isLessThanMaximum(quality) ? quality + 1 : quality

// reduce qty
export const decreaseQuality = quality => isOverMinimum(quality) ? quality - 1 : quality

export const increaseQualityForConcert = (item: Item): number => {
    let quality = increaseQuality(item.quality);
    quality = item.sellIn < 11 ? increaseQuality(quality) : quality;
    quality = item.sellIn < 6 ? increaseQuality(quality) : quality;
    return quality
}

export const setConjuredQuality = (item): Item => {
    item.quality = setQualityItem(item)
    item.quality = setQualityItem(item)
    return item
}

export const setQualityItem = (item): Item => {
    item.quality = decreaseQuality(item.quality);
    item.quality = item.sellIn <= 0 ? decreaseQuality(item.quality) : item.quality
    return item
}