var jiraBaseUrlInput;
var defaultProjectKeyInput;

(async function  () {
    jiraBaseUrlInput = document.getElementById('jiraBaseUrlInput');

    defaultProjectKeyInput = document.getElementById('defaultProjectKeyInput');
    defaultProjectKeyInput.oninput = upperCaseInput;

    const settingsForm = document.getElementById('settingsForm');
    settingsForm.addEventListener('submit', onSettingsFormSubmit);

    const configureHotkeysButton = document.getElementById('configureHotkeysButton');
    configureHotkeysButton.onclick = onConfigureHotkeysButtonClick;

    await initializeFormValues();
})();


async function initializeFormValues() {
    const getResult = await chrome.storage.local.get('extensionSettings');
    extensionSettings = getResult.extensionSettings;

    jiraBaseUrlInput.value = extensionSettings.jiraBaseUrl || '';
    defaultProjectKeyInput.value = extensionSettings.defaultProjectKey || '';
}

/** 
 * @param {Event} event 
 */
function upperCaseInput(event) {
    const inputField = event.target;
    inputField.value = inputField.value.toUpperCase();
};

/**
 * @param {Event} event 
 */
async function onSettingsFormSubmit(event) {
    event.preventDefault();
    const jiraBaseUrl = jiraBaseUrlInput.value;
    const defaultProjectKey = defaultProjectKeyInput.value;

    const extensionSettings = {
        jiraBaseUrl,
        defaultProjectKey
    };

    await chrome.storage.local.set({ extensionSettings });

    window.close();
}

function onConfigureHotkeysButtonClick(_event) { 
    chrome.tabs.update({ url: 'edge://extensions/shortcuts' });   
};