import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + "/test");
  }

  async getTitleText(): Promise<string> {
    // return element(by.css('app-root .common_main .content .nav-bar .nav-bar-left .siteinfo .sitename')).getText();
    return element(by.css('app-test p')).getText();
  }
}
