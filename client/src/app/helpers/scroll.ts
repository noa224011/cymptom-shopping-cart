function ScrollTop(scrollElement: any, element: HTMLElement | null) {
  scrollElement.scrollTop = element?.offsetTop;
}

export function scrollToElement(scrollElement: any, element: any) {
  ScrollTop(
    document.querySelector(scrollElement),
    document.querySelector(element)
  );
}

// element = `#autocomplete-result-${index}`
// scrollElement = '.results-container'
