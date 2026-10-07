(() => {
  const root = document.querySelector('.partner-bp');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[data-partner-path]')];
  function choose(tab, scrollToDetail = false) {
    let selectedPanel;
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      const panel = root.querySelector('#' + item.getAttribute('aria-controls'));
      panel.hidden = !selected;
      if (selected) selectedPanel = panel;
    });
    if (scrollToDetail && selectedPanel) {
      requestAnimationFrame(() => selectedPanel.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => choose(tab, true));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); choose(tabs[next]); tabs[next].focus(); }
    });
  });
})();
