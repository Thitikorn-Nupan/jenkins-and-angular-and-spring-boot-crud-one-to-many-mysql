export class Dog {

  public did?: number;
  public sku?: string;
  public nickname?: string;
  public age?: number;
  public alive?: boolean;
  public bid?: number;


  constructor(did?: number, sku?: string, nickname?: string, age?: number, alive?: boolean, bid?: number) {
    this.did = did;
    this.sku = sku;
    this.nickname = nickname;
    this.age = age;
    this.alive = alive;
    this.bid = bid;
  }

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

}
