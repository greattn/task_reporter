// Add buttons to the list tasks
let task_list_table = $("table.list.issues");
let tbody_table = task_list_table.children("tbody")
task_list_table.children("thead").children("tr").prepend("<th style='color: #017BFE'>Next day</th>");
task_list_table.children("thead").children("tr").prepend("<th style='color: #017BFE'>Today</th>");

$(".issues thead .total_spent_hours").after("<th style='color: #017BFE'>Remain times</th>");
$(".issues tbody .total_spent_hours").after("<td class='total_remain_hours'> Remain times</td>");

$(".issues tbody .total_remain_hours").each(function( index ) {
  est = parseInt($(this).parent().find("td.total_estimated_hours").text())
  spent = parseInt($(this).parent().find("td.total_spent_hours").text())
  $( this ).text(est - spent)
});

let report_col = tbody_table.children("tr.hascontextmenu")
report_col.prepend("<td class='report-task-col next-day-col'></td>").append
report_col.prepend("<td class='report-task-col today-col'></td>").append
let today_row = $(".today-col")
let next_day_row = $(".next-day-col")
let today_btn = $('<input/>').attr({ type: 'checkbox', name:'today-btn', value:'Today', class: "today-btn", style: "transform: scale(1.2); accent-color: #017BFE;"});
let next_day_btn = $('<input/>').attr({ type: 'checkbox', name:'next-day-btn', value:'Next day', class: "next-day-btn", style: "transform: scale(1.2); accent-color: #017BFE;"});
let report_task_col = $(".report-task-col");
remove_local_data();

let total_for_spent_hours = parseInt($(".query-totals .total-for-spent-hours span.value").text())
let total_for_estimated_hours = parseInt($(".query-totals .total-for-estimated-hours span.value").text())
let total_for_remain_hours = total_for_estimated_hours - total_for_spent_hours
total_for_remain_html = `<span class="total-for-remain-hours"><span>Remain time:</span> <span class="value">${total_for_remain_hours}</span></span>`
$(".query-totals .total-for-spent-hours").after(total_for_remain_html) 
report_task_col.click(function(e) {
  e.stopPropagation();
});

today_row.append(today_btn)
next_day_row.append(next_day_btn)

// Get data when ckecked
$(".today-btn").change(function () {
  var today_tasks = []
  var $today_checked = $('input[name=today-btn]:checked');

  $today_checked.each(function () {
    row_data = $(this).parents(".hascontextmenu");
    today_tasks.push(get_data(row_data));
  })

  send_data_to_background("today", today_tasks);
})

$(".next-day-btn").change(function () {
  var next_day_tasks = []
  var $next_day_checked = $('input[name=next-day-btn]:checked');

  $next_day_checked.each(function () {
    row_data = $(this).parents(".hascontextmenu");
    next_day_tasks.push(get_data(row_data));
  })

  send_data_to_background("next_day", next_day_tasks);
})

function get_data(row_data) {
  let obj = {
    id: "",
    title: "",
    status: "",
    target_version: "",
    done_status: "",
    est_time: "",
    spent_time: ""
  };

  obj.id = row_data.children(".id").children().text(); //id
  obj.title = row_data.children(".subject").children().text(); // title
  obj.status = row_data.children(".status").text(); //status
  obj.target_version = row_data.children(".fixed_version").children().text(); //target version
  obj.done_status =
    row_data.children(".done_ratio").children()[0] ?
    row_data.children(".done_ratio").children()[0].innerText :
    "N/A" // % done
  obj.est_time = row_data.children(".estimated_hours").text(); //estimated hours
  obj.spent_time = row_data.children(".spent_hours").text(); //spent hours

  return obj;
}

function send_data_to_background(type, data) {
  chrome.runtime.sendMessage({type: type, data: data });
}

function remove_local_data() {
  chrome.storage.local.remove("today_data");
  chrome.storage.local.remove("next_day_data");
}
