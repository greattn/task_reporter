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
  var copyText = document.getElementById("report-content");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);
};

function push_data_to_textarea(data) {
  let textarea_element = document.getElementById("report-content")
  if(textarea_element) {
    textarea_element.value = "1. Today tasks:"
    data.forEach(item => {
      let format = `
      - Ticket's link: ${item.id}
      - Task's Title: ${item.title}
      - Status: ${item.status}
      - % Done: ${item.done_status}\n`
      textarea_element.value += format
    })
  }
}

function push_next_day_data_to_textarea(data) {
  let textarea_element = document.getElementById("report-content")
  if(textarea_element) {
    textarea_element.value += `\r------------------------------\n2. Next day tasks:`
    data.forEach(item => {
      let format = `
      - Ticket's link: ${item.id}
      - Task's Title: ${item.title}
      `
      textarea_element.value += format
    })
    textarea_element.value += `\r------------------------------\n3. Other tasks (If any):`
    textarea_element.value += `\r------------------------------\n4. Issue (If any):`
  }
}

// let format = "\u25A0 Today's tasks\r\n  - Ticket's link:\r\n  - Task's Title:\r\n  - % Done:\r\n\u25A0 Next day tasks:\r\n\u25A0 Issue (If any):"
