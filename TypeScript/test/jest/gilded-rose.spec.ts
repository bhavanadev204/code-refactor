import { GildedRose } from '@/gilded-rose';
import Item from '@/item';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
    const added = gildedRose.items[0]
    expect(added.name).toBe('foo');
    expect(added.quality).toBe(1);
    expect(added.sellIn).toBe(1);
  });
});

describe('quality', () => {

  it('should update quality in 0 days', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 4)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toBe(2);
    expect(added.sellIn).toBe(-1);
  });

  it('quality should never be less than 0', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 1)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toBe(0);
    expect(added.sellIn).toBe(-1);
  });

  it('should update quality', () => {
    const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toBe(0);
    expect(added.sellIn).toBe(0);
  });

})

describe('aged brie quality', () => {
  it('should allow quality of aged brie be increased up to 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', -10, 10)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toBe(12);
    expect(added.sellIn).toBe(-11);
  });

  it('quality of Aged Brie increses', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 1)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toBe(2);
    expect(added.sellIn).toBe(0);
  });

  it('quality should never be grather 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 50)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toBe(50);
    expect(added.sellIn).toBe(0);
  });
})

describe('sulfuras quality rules', () => {
  it('should not decrease quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 1)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toBe(80);
    expect(added.sellIn).toBe(1);
  });
})

describe('backstage pass quality rules', () => {

  it('should increase quality of backstage passes by 2 when 5 days remaining', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 6, 1)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toBe(3);
    expect(added.sellIn).toBe(5);
  });

  it('should increase quality of backstage passes by 3 when less than 5 days remaining', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 3, 1)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toBe(4);
    expect(added.sellIn).toBe(2);
  });

  it('should increase quality of backstage passes by 1 when 10 days remaining', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 1)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toBe(2);
    expect(added.sellIn).toBe(10);
  });

  it('should set quality of backstage passes to 0 after concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toBe(0);
    expect(added.sellIn).toBe(-1);
  });

})

describe('conjured items', () => {
  it('should update conjured quality 4 times faster for sellin 0 days', () => {
    const gildedRose = new GildedRose([new Item('Conjured', 0, 4)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toBe(0);
    expect(added.sellIn).toBe(-1);
  });

  it('should update quality for conjured sellin 1 day', () => {
    const gildedRose = new GildedRose([new Item('Conjured', 1, 2)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toBe(0);
    expect(added.sellIn).toBe(0);
  });

  it('should lower quality by 3 when 5 days left', () => {
    const gildedRose = new GildedRose([new Item('Conjured', 5, 6)])
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toBe(3);
    expect(added.sellIn).toBe(4);
  })

  it('conjured item quality should never go below 0', () => {
    const gildedRose = new GildedRose([new Item('Conjured', 0, 1)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toBe(0);
    expect(added.sellIn).toBe(-1);
  });
})