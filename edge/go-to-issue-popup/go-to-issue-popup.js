var extensionSettings;
var issueIdentifierInput;

(async function  () {
    issueIdentifierInput = document.getElementById("issueIdentifierInput");
    issueIdentifierInput.oninput = upperCaseInput;

    const goToIssueForm = document.getElementById('goToIssueForm');
    goToIssueForm.addEventListener('submit', onGoToIssueFormSubmit);

    const settingsAnchor = document.getElementById("settingsAnchor");
    settingsAnchor.onclick = onSettingsAnchorClick;

    const getResult = await chrome.storage.local.get('extensionSettings');
    extensionSettings = getResult.extensionSettings;
})();


/**
 * @param {Event} _event 
 */
function onGoToIssueFormSubmit(event) {
    event.preventDefault();
    
    const issueIdentifier = issueIdentifierInput.value;

    chrome.tabs.create({
        url: getIssueUrl(extensionSettings, issueIdentifier)
    });
}

/**
 * 
 * @param {Event} event 
 */
function onSettingsAnchorClick(event) {
    event.preventDefault();

    chrome.tabs.create({
        url: `../pages/settings.html`
    });
}

/**
 * @param {object} extensionSettings 
 * @param {string} issueIdentifier 
 * @returns {string}
 */
function getIssueUrl(extensionSettings, issueIdentifier) {
    if (!issueIdentificarContainsProjectKey(issueIdentifier)) {
        issueIdentifier = `${extensionSettings.defaultProjectKey}-${issueIdentifier}`;
    }

    return `${extensionSettings.jiraBaseUrl}/browse/${issueIdentifier}`;
}

/**
 * @param {string} issueIdentifier 
 * @returns {boolean}
 */
function issueIdentificarContainsProjectKey(issueIdentifier) {
    return issueIdentifier.includes('-');
}

/** 
 * @param {Event} event 
 */
function upperCaseInput(event) {
    const inputField = event.target;
    inputField.value = inputField.value.toUpperCase();
};
