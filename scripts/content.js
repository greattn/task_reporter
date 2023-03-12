// Add buttons to the list tasks
let task_list_table = $("table.list.issues");
let tbody_table = task_list_table.children("tbody")
task_list_table.children("thead").children("tr").prepend("<th colspan='2'></th>");

let report_col = tbody_table.children("tr")
report_col.prepend("<td class='report-task-col next-day-col'></td>").append
report_col.prepend("<td class='report-task-col today-col'></td>").append
let today_row = $(".today-col")
let next_day_row = $(".next-day-col")
let today_btn = $('<input/>').attr({ type: 'button', name:'today-btn', value:'Today', class: "today-btn"});
let next_day_btn = $('<input/>').attr({ type: 'button', name:'next-day-btn', value:'Next day', class: "next-day-btn"});

today_row.append(today_btn)
next_day_row.append(next_day_btn)

// Get data when click button
var today_tasks = []

$(".today-btn").click(function () { 
  row_data = $(this).parents(".hascontextmenu");

  today_tasks += {type: "today", data: get_data(row_data)}

  save_to_local_storage(today_tasks)
  send_date_to_background(today_tasks);
})

$(".next-day-btn").click(function () { 
  row_data = $(this).parents(".hascontextmenu");

  send_date_to_background({type: "next_day", data: get_data(row_data)});
})

function get_data(row_data) {
  let obj = new Object();
      
  obj.id = row_data.children(".id").children().text(); //id
  obj.title = row_data.children(".subject").children().text(); // title
  obj.status = row_data.children(".status").text(); //status
  obj.target_version = row_data.children(".fixed_version").children().text(); //target version
  obj.done_status = row_data.children(".done_ratio").children()[0].innerText; // % done
  obj.est_time = row_data.children(".estimated_hours").text(); //estimated hours
  obj.spent_time = row_data.children(".spent_hours").text(); //spent hours

  return obj;
}

function save_to_local_storage(data) {
    localStorage.setItem("today_tasks", (data));
}

function send_date_to_background(data) {
  chrome.runtime.sendMessage({ data: data }, response => {
    console.log(response);
  });
}
