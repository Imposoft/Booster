import { AppPage } from './app.po';
import {browser, by, element, logging, protractor, ExpectedConditions as until} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    console.log(page.getTitleText());
    expect(page.getTitleText()).toEqual('Booster');
  });

  it('should change to register page', () => {
    browser.get('http://localhost:4200/register');
    element(by.id('registerToggle')).click();
    expect(element(by.className('card-title')).getText()).toEqual('Registro:');
  });

  it('should display login page', () => {
    browser.get('http://localhost:4200/register');
    element(by.id('registerToggle')).click();
    element(by.id('loginToggle')).click();
    expect(element(by.className('card-title')).getText()).toEqual('Iniciar sesion:');
  });

  it('should change to login page', () => {
    browser.get('http://localhost:4200/');
    element(by.id('loginButton')).click();
    expect(element(by.className('card-title')).getText()).toEqual('Iniciar sesion:');
  });

  it('should load home page', () => {
    browser.get('http://localhost:4200/home');
    browser.wait( function() {
      return browser.getCurrentUrl().then(function(url) {
        return (url === ('http://localhost:4200/home'));
      });
    }, 3000);
  });

  it('should load profile page', () => {
    browser.get('http://localhost:4200/profile');
    browser.waitForAngularEnabled(false);
    browser.wait( function() {
      return browser.getCurrentUrl().then(function(url) {
        return (url === ('http://localhost:4200/profile'));
      });
    }, 3000);
  });

  it('should load fanProfile page', () => {
    browser.get('http://localhost:4200/fanProfile');
    browser.waitForAngularEnabled(false);
    browser.wait( function() {
      return browser.getCurrentUrl().then(function(url) {
        return (url === ('http://localhost:4200/fanProfile'));
      });
    }, 3000);
  });

  it('should load jobOffer page', () => {
    browser.get('http://localhost:4200/jobOffer');
    browser.waitForAngularEnabled(false);
    browser.wait( function() {
      return browser.getCurrentUrl().then(function(url) {
        return (url === ('http://localhost:4200/jobOffer'));
      });
    }, 3000);
  });

  it('should load tutorial page', () => {
    browser.get('http://localhost:4200/tutorial');
    browser.waitForAngularEnabled(false);
    browser.wait( function() {
      return browser.getCurrentUrl().then(function(url) {
        return (url === ('http://localhost:4200/tutorial'));
      });
    }, 3000);
  });

  it('should load bandProfile page', () => {
    browser.get('http://localhost:4200/bandProfile');
    browser.waitForAngularEnabled(false);
    browser.wait( function() {
      return browser.getCurrentUrl().then(function(url) {
        return (url === ('http://localhost:4200/bandProfile'));
      });
    }, 3000);
  });

  it('should load register page', () => {
    browser.get('http://localhost:4200/register');
    browser.waitForAngularEnabled(false);
    browser.wait( function() {
      return browser.getCurrentUrl().then(function(url) {
        return (url === ('http://localhost:4200/register'));
      });
    }, 3000);
  });

  it('should log', async () => {
    browser.get('http://localhost:4200/');
    element(by.id('loginButton')).click();
    element(by.id('emailInput')).sendKeys('arturosdg@gmail.com');
    element(by.id('passwordInput')).sendKeys('12341234');
    browser.waitForAngularEnabled(false);
    element(by.id('login')).click();

    browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        return (url === ('http://localhost:4200/home'));
      });
    }, 3000);
  });

  it('should not log', async () => {
    browser.get('http://localhost:4200/');
    element(by.id('loginButton')).click();
    element(by.id('emailInput')).sendKeys('arturosdj@gmail.com');
    element(by.id('passwordInput')).sendKeys('12341234');
    element(by.id('login')).click();
    browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        return (url === ('http://localhost:4200/register'));
      });
    }, 3000);
  });

  it('should show logout button', async () => {
    browser.get('http://localhost:4200/');
    element(by.id('loginButton')).click();
    element(by.id('emailInput')).sendKeys('arturosdg@gmail.com');
    element(by.id('passwordInput')).sendKeys('12341234');
    browser.waitForAngularEnabled(false);
    element(by.id('login')).click();
    browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        return (url === ('http://localhost:4200/home'));
      });
    }, 3000);
    await expect(element(by.id('logoutButton')).isPresent()).toBe(true);
  });

  it('should show modification buttons', async () => {
    browser.get('http://localhost:4200/');
    element(by.id('loginButton')).click();
    element(by.id('emailInput')).sendKeys('arturosdg@gmail.com');
    element(by.id('passwordInput')).sendKeys('12341234');
    browser.waitForAngularEnabled(false);
    element(by.id('login')).click();
    browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        return (url === ('http://localhost:4200/home'));
      });
    }, 3000);
    element(by.id('profileIcon')).click();
    // browser.get('http://localhost:4200/profile/g0TPmRbfEZeVqUKEx4zOr9Y8uTU2');
    await expect(element(by.id('modifyProfileButton')).isPresent());
  });

  it('should not show modification buttons', async () => {
    browser.get('http://localhost:4200/');
    element(by.id('loginButton')).click();
    element(by.id('emailInput')).sendKeys('arturosdg@gmail.com');
    element(by.id('passwordInput')).sendKeys('12341234');
    browser.waitForAngularEnabled(false);
    element(by.id('login')).click();
    browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        return (url === ('http://localhost:4200/home'));
      });
    }, 3000);
    browser.get('http://localhost:4200/profile');
    await expect(element(by.id('modifyProfileButton')).isPresent()).toBe(false);
  });

  it('should not finish form', async () => {
    browser.get('http://localhost:4200/register');
    element(by.id('registerToggle')).click();
    element(by.id('nextButton1')).click();
    await expect(element(by.id('nameField')).isDisplayed()).toBe(false);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

function selectOptionByOptionValue(selectFormFieldElementId, valueToFind): void {
  const formField = element(by.id(selectFormFieldElementId));
  formField.click().then(() => {
    formField.element(by.tagName('mat-select'))
      .getAttribute('aria-owns').then((optionIdsString: string) => {
      const optionIds = optionIdsString.split(' ');

      for (const optionId of optionIds) {
        const option = element(by.id(optionId));
        option.getText().then((text) => {
          if (text === valueToFind) {
            option.click();
          }
        });
      }
    });
  });
}
