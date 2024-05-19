import type { Page, Locator } from '@playwright/test';

export class CreateAccount {
    private CreateAccount: Locator;
  
    constructor(public readonly page: Page) {
    }
  
 
  
    async createAccount() {
      this.CreateAccount = await this.page.getByRole('button', { name: 'Create account' });
      await this.CreateAccount.click();
    }
}