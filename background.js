chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^https:\/\/www\.google\.com/.test(tab.url)) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: formatResults,
    });
  }
});

function formatResults() {
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const resultElement = document.getElementById('cwos');
  if (resultElement) {
    resultElement.textContent = formatNumber(Number(resultElement.textContent));
  }
}

