// Helper function to inject CSS styles for highlighting usernames
function injectCSS(usernames) {

    // Generate CSS rules for each username
    // Note that we add a CSS element to the page rather than attaching styles directly
    // to the elements with the usernames, because live refresh blows them away if we
    // do it that way. The CSS element will stick around and keep working.
    let style = document.createElement('style');
    let cssContent = '';
    usernames.forEach(username => {
        cssContent += `
        a[href*="${username}"] {
          color: var(--color-user-mention-fg) !important;
          background-color: var(--bgColor-attention-muted, var(--color-attention-subtle));
          border-radius: 2px; 
          margin-left: -2px; 
          margin-right: -2px; 
          padding: 0 2px;
        }
      `;
    });

    style.innerHTML = cssContent;
    // We can't append to document.head or document.body because then the CSS
    // will stick around when navigating to other pages, since it's a React app
    // and doesn't do full page reloads. We don't want that to happen, so we
    // inject it into the container that gets swapped out between page loads instead.
    const targetContainer = document.querySelector('#repo-content-turbo-frame');
    if (!targetContainer) return; 
    targetContainer.appendChild(style);
}

chrome.storage.sync.get("usernames", (data) => {
    if (data.usernames) {
        injectCSS(data.usernames);
    }
});
