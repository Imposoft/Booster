import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';

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
    expect(element(by.className('card-title')).getText()).toEqual('Registro:');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
