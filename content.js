function hideAiMode() {
  const elements = document.querySelectorAll('span.R1QWuf');
  elements.forEach(element => {
    if (element.textContent.trim() === 'AI モード') {
      const parentDiv = element.closest('div[role="listitem"]');
      if (parentDiv) {
        parentDiv.classList.add('hide-ai-mode');
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', hideAiMode);

const observer = new MutationObserver(hideAiMode);

observer.observe(document.body, {
  childList: true,
  subtree: true
});