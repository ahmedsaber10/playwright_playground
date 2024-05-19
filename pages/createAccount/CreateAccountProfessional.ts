import { type Page, Locator, expect } from '@playwright/test';
import { CreateAccount } from './CreateAccount';

export class CreateAccountProfessional extends CreateAccount {
  //#region identifiers
  private  emailAddress: Locator;
  private  emailAddressConfirmation: Locator;
  private  firstName: Locator;
  private  lastName: Locator;
  private  communicationAgreement: Locator;
  private  termsConditions: Locator;
  private  nextVerification: Locator;
  //#endregion
    constructor(public readonly page: Page) {
      super(page);
    }
  
    async createAccountForProfessionalHealthCare() {
     // should add step here to choose account type
      await this.createAccount();
    }

    async fillcreateAccountForm(email?: string, firstNameText? : string,
       lastNameText?:string, emailConfirmation? : string,terms? : boolean,communication? : boolean )
    {
      this.emailAddress= await this.page.locator('#mat-input-4');
      this.emailAddressConfirmation= await this.page.locator('#mat-input-5');
      this.firstName= await this.page.getByPlaceholder('First name');
      this.lastName= await this.page.getByPlaceholder('Last name');
      this.termsConditions= await this.page.getByLabel('By ticking this box, I');
      this.communicationAgreement= await this.page.getByLabel('I agree to receiving');
    

       (email == null) ?  await this.emailAddress.clear() : await this.emailAddress.fill(email) ;
       (firstNameText != null) ?  await this.firstName.fill(firstNameText): await this.firstName.clear();;
       (lastNameText != null) ?  await this.lastName.fill(lastNameText) : await this.lastName.clear();;
       (emailConfirmation != null) ? await this.emailAddressConfirmation.fill(emailConfirmation) : await this.emailAddressConfirmation.clear();;
       (terms != null && terms)  ?  await this.termsConditions.check(): await this.termsConditions.uncheck() ;
       (communication != null && communication) ?  await this.communicationAgreement.check(): await this.communicationAgreement.uncheck();
     
    }
    async proceedNextVerification()
    {
      this.nextVerification= await this.page.getByRole('button', { name: 'Next: verification' });
      await this.nextVerification.click();
    }

    async isNextVerification(enabled:boolean)
    {
      this.nextVerification= await this.page.getByRole('button', { name: 'Next: verification' });
      enabled ? await expect( await this.nextVerification).toBeEnabled() : await expect( await this.nextVerification).toBeDisabled();
     
    }
}