const weeks = ['日', '月', '火', '水', '木', '金', '土'];
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const startDate = new Date(year, month - 1, 1); // 月の最初の日を取得
const endDate = new Date(year, month, 0); // 月の最後の日を取得
const endDayCount = endDate.getDate(); // 月の末日
const lastMonthEndDate = new Date(year, month - 1, 0); // 前月の最後の日の情報
const lastMonthEndDayCount = lastMonthEndDate.getDate(); // 前月の末日
const startDay = startDate.getDay(); // 月の最初の日の曜日を取得
let dayCount = 1; // 日にちのカウント
let calendarHtml = ''; // HTMLを組み立てる変数

calendarHtml += `<h2 class="calendar__header"><span><</span>${year}年 ${month}月<span>></span></h2>`;
calendarHtml += "<table>";

// 曜日の行を作成
for (let i = 0; i < weeks.length; i++) {
    calendarHtml += "<th>" + weeks[i] + "</th>";
}

for (let w = 0; w < 5; w++) {
    calendarHtml += "<tr>";

    for (let d = 0; d < 7; d++) {
        if (w == 0 && d < startDay) {
            // 1行目で1日の曜日の前
            let num = lastMonthEndDayCount - startDay + d + 1;
            calendarHtml += '<td class="is-disabled">' + num + "</td>";
        } else if (dayCount > endDayCount) {
            // 末尾の日数を超えた
            let num = dayCount - endDayCount;
            calendarHtml += '<td class="is-disabled">' + num + "</td>";
            dayCount++;
        } else {
            calendarHtml += "<td>" + dayCount + "</td>";
            dayCount++;
        }
    }
    calendarHtml += "</tr>";
}
calendarHtml += "</table>";

document.querySelector("#calendar").innerHTML = calendarHtml;