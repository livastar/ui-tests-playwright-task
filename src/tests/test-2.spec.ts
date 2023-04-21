import { expect, test } from '@playwright/test';
import { PopupModal } from '../pages/popup-modal';

test.describe('Tests @All', () => {
  test('Digital Box: Check the sample DialogBox is displayed, then close it by clicking on Close button and check it is hidden: @smk', async ({ page }) => {
    const popup = new PopupModal(page);

    await page.goto('https://samples.gwtproject.org/samples/Showcase/Showcase.html#!CwDialogBox', { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: 'Show Dialog Box' }).click();

    await popup.shouldBeDisplayedPopupModalElements();
    await popup.closeButton.click();

    await expect(popup.title).toBeHidden();
    await expect(popup.subTitle).toBeVisible();
    await expect(popup.image).toBeHidden();
    await expect(popup.closeButton).toBeHidden();
  });
});
