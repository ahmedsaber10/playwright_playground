import  {test, Page, Locator } from '@playwright/test';

export class HomePage {
    private CreateAccount: Locator;
  
    constructor(public readonly page: Page) {
    }
  
    async goto() {
      await this.page.goto('/');
    }
  
    async createAccount() {
      await test.step('user open create account page', async () => {
      this.CreateAccount = this.page.locator('div').filter({ hasText: /^Create account$/ });
      await this.CreateAccount.click();
    }, { box: true });
    }
}