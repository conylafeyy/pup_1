let page;

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  
  beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

  test("The h1 header content'", async () => {
    await page.setDefaultTimeout(5000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  });

  test("The first link attribute", async () => {
    await page.setDefaultTimeout(5000);
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    await page.setDefaultTimeout(5000);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  });
});

describe("Securuty page tests", () => {

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/features/security");
  });
  
  test("h1 text test", async () => {
    await page.setDefaultTimeout(5000);
    const h1 = await "div div div h1";
    const h1Text = await page.$eval(h1, elem => elem.textContent);
    const h1Part1 = await h1Text.slice(0,15);
    const h1Part2 = await h1Text.slice(16);
    const h1Full = [h1Part1, h1Part2].join(" ");
    expect(h1Full).toEqual("Secure at every step");
  });

  test("h4Span text test", async () => {
    const h4Span = await "div div div h4 span";
    const h4SpanText = await page.$eval(h4Span, elem => elem.textContent);
    expect(h4SpanText).toEqual("Ship secure applications within the GitHub flow");
  });

  test("Button text test", async () => {
    const headerEl = await "div main div div a";
    const elementText = await page.$eval(headerEl, elem => elem.textContent);
    expect(elementText).toEqual("Security");
 });
});