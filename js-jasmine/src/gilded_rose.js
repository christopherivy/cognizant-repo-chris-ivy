const MAX_QUALITY = 50;

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateItem(item) {
    if (item.name === "Sulfuras, Hand of Ragnaros") {
      item.quality = 80; // Sulfuras always has a quality of 80
      return item;
    }

    switch (item.name) {
      case "Backstage passes to a TAFKAL80ETC concert":
        if (item.sellIn <= 0) {
          item.quality = 0;
        } else if (item.sellIn <= 5) {
          item.quality += 3;
        } else if (item.sellIn <= 10) {
          item.quality += 2;
        }
        break;

      case "Aged Brie":
        item.quality++;
        item.sellIn--;
        break;

      default:
        item.sellIn -= 1;
        /* 
         "Conjured" items degrade in Quality twice as fast as normal items
         Once the sell by date has passed, Quality degrades twice as fast
         */
        if (item.name === "Conjured" || item.sellIn <= 0) {
          item.quality -= 2;
        } else {
          item.quality -= 1;
        }
    }

    // this is for all cases and any item
    if (item.quality > MAX_QUALITY) item.quality = MAX_QUALITY; // quality never greater than 50
    if (item.quality < 0) item.quality = 0; // quality is never negative
    return item;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      return this.items.map((item) => {
        return this.updateItem(item);
      });
    }
  }

  updateQuality_old() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != "Aged Brie" && this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

// my testing work
let brie = new Item("Aged Brie", 5, 33);
let sulfuras = new Item("Sulfuras, Hand of Ragnaros", 4, 55);
let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 4, 14);
let stageCrew = new Item("StageCrew", 4, 45);
let conjured = new Item("Conjured", 5, 45);

let myItems = [brie, sulfuras, backstagePass, stageCrew, conjured];

let myShop = new Shop(myItems);

console.log(myShop.updateQuality());
// console.log(myShop.updateQuality_old());

// module.exports = {
//   Item,
//   Shop,
// };
