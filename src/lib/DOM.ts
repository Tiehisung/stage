/**
 *Timeout is used because the component might not have been created yet.
 * @param elementId Element id of the component to scroll to.
 */

export function scrollToElement(elementId: string) {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10)
}
