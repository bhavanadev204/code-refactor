import Item from "./item";
import { setQualityForAgedBrie, setQualityForConcert, setQualityForConjured, setQualityForNormalItem, setQualityForSulfuras } from "./quality";
import { Aged_Brie, Backstage_Passes, Conjured, Sulfuras_Hand } from './constants';
export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality(): Array<Item> {

    for (const item of this.items) {
      switch (item.name) {
        case Aged_Brie: {
          setQualityForAgedBrie(item)
          break;
        }
        case Backstage_Passes: {
          setQualityForConcert(item)
          break;
        }
        case Sulfuras_Hand: {
          setQualityForSulfuras(item, 80)
          break;
        }
        case Conjured: {
          setQualityForConjured(item)
          break;
        }
        default: {
          setQualityForNormalItem(item)
        }
      }
    }
    return this.items;
  }
}
