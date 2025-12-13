export class Breed {
  // 1. Property Declarations
  // You must declare all properties in the class body.
  // Using the 'public' or 'private' access modifier is common,
  // but if you want them to be accessible outside the class, use 'public' (or no modifier).
  public bid?: number;
  public breed?: string;

  /**
   * 2. Constructor for Initialization
   * The constructor takes values and assigns them to the class properties.
   * A class requires initialization, unlike a simple interface.
   * * @param did - Dog ID
   * @param sku - Stock Keeping Unit
   * @param nickname - Dog's name
   * @param age - Dog's age
   * @param alive - Is the dog alive?
   * @param bid - Breeder ID
   */


  constructor(bid?: number, breed?: string) {
    this.bid = bid;
    this.breed = breed;
  }
}
