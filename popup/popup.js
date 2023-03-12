let port = chrome.runtime.connect({ name: "popup" });


port.onMessage.addListener(function (message) {
  task = message.data.data.data

  let format = `  - Ticket's link: ${task.id}\r\n  - Task's Title: ${task.title}\r\n  - % Done: ${task.done_status}\r\n`
});

let format = "\u25A0 Today's tasks\r\n  - Ticket's link:\r\n  - Task's Title:\r\n  - % Done:\r\n\u25A0 Next day tasks:\r\n\u25A0 Issue (If any):"