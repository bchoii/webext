chrome.tabs.onCreated.addListener((newTab) => {
  console.log('tab created');
  try {
    chrome.tabs.move(newTab.id, { index: -1 });
  } catch (error) {}
});

const closeTab = (tab) => tab && chrome.tabs.remove(tab.id);

const moveTabToEnd = async (currentTab) => {
  const currentIndex = currentTab.index;
  const tabs = await chrome.tabs.query({ currentWindow: true });
  chrome.tabs.move(currentTab.id, { index: -1 });
  try {
    chrome.tabs.update(tabs[currentIndex + 1].id, { active: true });
  } catch (error) {
    chrome.tabs.update(tabs[0].id, { active: true });
  }
};

const getCurrentTab = async () => {
  const activeTabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return activeTabs[0];
};

chrome.commands.onCommand.addListener(async (command) => {
  console.log('command', command);
  const currentTab = await getCurrentTab();
  switch (command) {
    // case 'close-tab':
    //   await closeTab(currentTab);
    //   break;
    case 'move-tab-to-end':
      await moveTabToEnd(currentTab);
      break;
    default:
      break;
  }
});

chrome.downloads.onDeterminingFilename.addListener((item, suggest) => {
  const datestring = `${new Date(
    Date.now() - new Date().getTimezoneOffset() * 60 * 1000
  )
    .toISOString()
    .slice(0, 10)}`;
  const filename = `${datestring}/${item.filename}`;
  suggest({ filename, conflictAction: 'overwrite' });
});
