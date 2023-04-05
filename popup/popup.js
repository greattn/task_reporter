document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get("today_data", function(result) {
    if(result.today_data) {
      push_data_to_textarea(result.today_data);
    }
  });

  chrome.storage.local.get("next_day_data", function(result) {
    if(result.next_day_data) {
      push_next_day_data_to_textarea(result.next_day_data);
    }
  });

  document.getElementsByClassName("btn-copy")[0].addEventListener("click", function(e) {
    copy_to_clipboard();
  });
});

function copy_to_clipboard() {
  var taskContent = document.getElementById("task-content");

  // Select the text field
  taskContent.select();
  taskContent.setSelectionRange(0, 99999); // For mobile devices


  var issueContent = document.getElementById("issue-content");

  // Select the text field
  issueContent.select();
  issueContent.setSelectionRange(0, 99999); // For mobile devices

  var currentDate = new Date().toJSON().slice(0, 10)

  var reportText = `
    [${currentDate}] Daily Report
    Issues:
    ${issueContent.value}
    ------------------------------
    ${taskContent.value}
  `

  // Copy the text inside the text field
  navigator.clipboard.writeText(reportText);
};


function push_data_to_textarea(data) {
  let textarea_element = document.getElementById("task-content")
  if(textarea_element) {
    textarea_element.value += `Today tasks:`
    data.forEach(item => {
      let format = `
      - \t ${item.id} | ${item.done_status} | ${item.title}
        \t ${item.status}\n`
      textarea_element.value += format
    })
    textarea_element.value += `
    ------------------------------\n`
  }
}

function push_next_day_data_to_textarea(data) {
  let textarea_element = document.getElementById("task-content")
  if(textarea_element) {
    textarea_element.value += `\t\tNext day tasks:`
    data.forEach(item => {
      let format = `
      - \t https://pherusa-redmine.sun-asterisk.vn/issues/${item.id}
        \t ${item.title}
      `
      textarea_element.value += format
    })
  }
}

// let format = "\u25A0 Today's tasks\r\n  - Ticket's link:\r\n  - Task's Title:\r\n  - % Done:\r\n\u25A0 Next day tasks:\r\n\u25A0 Issue (If any):"
