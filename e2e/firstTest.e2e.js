describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.label('Text'))).toBeVisible();
    await expect(element(by.id('textField'))).toBeVisible();
    await element(by.id('textField')).typeText('passcode');
    await element(by.id('tapBtn')).tap();
  });
});
