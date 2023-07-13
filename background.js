chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^https:\/\/www\.google\.com/.test(tab.url)) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: injectMutationObserver,
    });
  }
});

function injectMutationObserver() {
  // This code is injected into the page and runs in the context of the page
  const targetNode = document.getElementById('cwos');

  // Options for the observer (which mutations to observe)
  const config = { childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        formatResults();
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
}

function formatResults() {
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const resultElement = document.getElementById('cwos');
  if (resultElement) {
    resultElement.textContent = formatNumber(Number(resultElement.textContent));
  }
}
