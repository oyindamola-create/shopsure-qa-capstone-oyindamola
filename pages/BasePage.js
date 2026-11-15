
class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(pagePath) {
    await this.page.goto(pagePath, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
  }
}

module.exports = BasePage;
