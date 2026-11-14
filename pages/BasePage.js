class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(pagePath) {
    await this.page.goto(pagePath);
  }
}

module.exports = BasePage;