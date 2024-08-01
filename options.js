// Load saved usernames
chrome.storage.sync.get("usernames", (data) => {
    if (data.usernames) {
        document.getElementById('usernames').value = data.usernames.join(', ');
    }
});

// Save usernames to storage
document.getElementById('options-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const usernames = document.getElementById('usernames').value.split(',').map(name => name.trim());
    chrome.storage.sync.set({ "usernames": usernames }, () => {
        alert("Usernames saved!");
    });
});
