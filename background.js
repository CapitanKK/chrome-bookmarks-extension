global_count = 0;

function calculate(node) {
    var count = 0;
    if (node.url != undefined) {
        count++;
    }
    if (node.children != null) {
        for (var i = 0; i < node.children.length; i++) {
            count += calculate(node.children[i]);
        }
    }
    return count;
}

function updateBookmarks() {
    chrome.bookmarks.getTree(
        function(bookmarkTreeNodes) {
            global_count = calculate(bookmarkTreeNodes[0]);
            setCounter();
        });
}

function setCounter() {
    chrome.browserAction.setBadgeText({text: "" + global_count});
}

chrome.bookmarks.onCreated.addListener(
    function(id, bookmark) {
        updateBookmarks();
    });

chrome.bookmarks.onRemoved.addListener(
    function(id, removeInfo) {
        updateBookmarks();
    });

updateBookmarks();
