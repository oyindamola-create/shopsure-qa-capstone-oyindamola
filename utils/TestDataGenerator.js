
const { randomUUID } = require("crypto");

class TestDataGenerator {
  generateUniqueEmail(prefix) {
    const timestamp = Date.now();
    const uniqueId = randomUUID();

    return `${prefix}${timestamp}${uniqueId}@testmail.com`;
  }

  
  pickRandomItem(itemList) {
    if (!Array.isArray(itemList) || itemList.length === 0) {
      throw new Error("Item list must be a non-empty array");
    }

    const randomIndex = Math.floor(Math.random() * itemList.length);

    return itemList[randomIndex];
  }


  generateUserProfile() {
    const firstNames = ["Oyin", "Sarah", "John", "David"];
    const lastNames = ["Ade", "Smith", "Johnson", "Brown"];
    const titles = ["Mr", "Mrs", "Miss", "Ms"];

    const firstName = this.pickRandomItem(firstNames);
    const lastName = this.pickRandomItem(lastNames);
    const title = this.pickRandomItem(titles);

    const name = `${firstName} ${lastName}`;
    const email = this.generateUniqueEmail(firstName.toLowerCase());
    const password = "Test@12345";

    const day = String(Math.floor(Math.random() * 28) + 1);
    const month = String(Math.floor(Math.random() * 12) + 1);
    const year = String(1990 + Math.floor(Math.random() * 15));

    const company = "ShopSure Test Company";
    const address = "12 Test Street";
    const country = "India";
    const state = "Maharashtra";
    const city = "Mumbai";
    const zipcode = "100001";
    const mobileNumber = "08012345678";

    return {
      name,
      email,
      password,
      title,
      birth_day: day,
      birth_month: month,
      birth_year: year,
      first_name: firstName,
      last_name: lastName,
      company,
      address,
      country,
      state,
      city,
      zipcode,
      mobile_number: mobileNumber
    };
  }
}

module.exports = TestDataGenerator;