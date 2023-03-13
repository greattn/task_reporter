document.addEventListener('DOMContentLoaded', function() {
  push_data_to_textarea(JSON.parse(localStorage.getItem("today_tasks")));
});

chrome.runtime.onMessage.addListener(function (message) {
  console.log("message in popup:" );
  console.log(message);
  tasks = message.data
  // debugger
  localStorage.setItem("today_tasks", JSON.stringify(tasks));
  push_data_to_textarea(JSON.parse(localStorage.getItem("today_tasks")));
});

function push_data_to_textarea(data) {
  let textarea_element = document.getElementById("report-content")
  if(textarea_element) {
    textarea_element.value = ""
    data.forEach(item => {
      let format = `
      - Ticket's link: ${item.id}
      - Task's Title: ${item.title}
      - % Done: ${item.done_status}
      `
      textarea_element.value += format
    })
  }
}

// let format = "\u25A0 Today's tasks\r\n  - Ticket's link:\r\n  - Task's Title:\r\n  - % Done:\r\n\u25A0 Next day tasks:\r\n\u25A0 Issue (If any):"
