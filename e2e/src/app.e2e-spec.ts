import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  it('should redirect to login', () => {
    const spy = spyOn(page, 'navigateTo');
    page.navigateTo();
    expect(spy).toHaveBeenCalled();
  });
});
