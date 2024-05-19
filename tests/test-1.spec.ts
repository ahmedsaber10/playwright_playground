import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
// import { BaseTest } from './globalSetup';
import { CreateAccountProfessional } from '../pages/createAccount/CreateAccountProfessional';
// import { page } from './globalSetup';

let homePage:HomePage
let createAccount:CreateAccountProfessional
let email: string;
test.beforeEach(async ({ page }) => {
  await page.goto('/');
   homePage = new HomePage(page);
   createAccount =  new CreateAccountProfessional(page);
    email ='test+'+new Date().getTime()+'@gmail.com';
});

test('TC_001 Verify that user can create an account as Professional health care.', async ({ page }) => {
 
  // email ='test+'+new Date().getTime()+'@gmail.com';
  await homePage.createAccount();
  await createAccount.createAccountForProfessionalHealthCare();
  await createAccount.fillcreateAccountForm(email,'test','testing',email,true,true);
  await createAccount.isNextVerification(true);
  await createAccount.proceedNextVerification();
  await expect(page.getByRole('link', { name: 'Log in here' })).toBeVisible();

});

test('TC_002 Verify that user cant create an account as Professional health care when missing any mandoatory fields.', async ({ page }) => {
  // email ='test+'+new Date().getTime()+'@gmail.com';

  await homePage.createAccount();
  await createAccount.createAccountForProfessionalHealthCare();
 
  await createAccount.fillcreateAccountForm(email,'testing','test',email,true,false);
  await createAccount.isNextVerification(true);
  await createAccount.fillcreateAccountForm(email,'testing','test',email,false,true);
  await createAccount.isNextVerification(false);
  
  await createAccount.fillcreateAccountForm(email,'test','last',null,true,true);
  await createAccount.isNextVerification(false);
  await createAccount.fillcreateAccountForm(null,'test','last',email,true,true);
  await createAccount.isNextVerification(false);

  await createAccount.fillcreateAccountForm(email,null,'test',email,true,true);
  await createAccount.isNextVerification(false);
  await createAccount.fillcreateAccountForm(email,'test',null,email,true,true);
  await createAccount.isNextVerification(false);


  

});
// inputes (6): 
// text fields  first , last, email and  email confirmation   
// check boxes  terms is mandatory and communication  is not
//#  1   2   3   4   5   6
//1  t   t   t   t   t   x
//2  t   t   t   t   x   t
//3  t   t   t   x   t   t
//4  t   t   x   t   t   t
//5  t   x   t   t   t   t
//6  x   t   t   t   t   t
