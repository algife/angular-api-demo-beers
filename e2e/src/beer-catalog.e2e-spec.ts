import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // it('should display the search title', () => {
  //   expect(true).toBe(true);
  //   //   page.navigateTo();
  //   //   return true;
  // });

  // it('should display the search results title', () => {
  //   expect(true).toBe(true);
  //   page.navigateTo();
  //   return true;
  // });

  // it('should display the search title', () => {
  //   page.navigateTo();
  //   expect(true).toBe(true);
  // });

  // it('user should be able to write text in the search bar', () => {
  //   expect(true).toBe(true);
  //   // input('search_query').enter('Pale Ale');
  // });

  // it('invalid characters in the search bar should display an errormessage', () => {
  //   expect(true).toBe(true);
  // });

  // it('user should be able to click a button to get a random drink', () => {
  //   expect(true).toBe(true);
  // });

  // it('should be able to click to get a random non-alcoholic drink', () => {
  //   expect(true).toBe(true);
  // });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
