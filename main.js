const weeks = ['日', '月', '火', '水', '木', '金', '土'];
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
const today = date.getDate(); // 今日の日付
const thisMonth = month; // 現在の月
const thisYear = year; // 現在の年
const config = {
  show: 1,
};

function showCalendar(year, month) {
  for (i = 0; i < config.show; i++) {
    const calendarHtml = createCalendar(year, month);
    const sec = document.createElement('section');
    sec.innerHTML = calendarHtml;
    document.querySelector('#calendar').appendChild(sec);
    month++;

    if (month > 12) {
      year++;
      month = 1;
    }
  }

  document.querySelector('#prev').addEventListener('click', moveCalendar);
  document.querySelector('#next').addEventListener('click', moveCalendar);
}

function createCalendar(year, month) {
  const startDate = new Date(year, month - 1, 1); // 月の最初の日を取得
  const endDate = new Date(year, month, 0); // 月の最後の日を取得
  const endDayCount = endDate.getDate(); // 月の末日
  const lastMonthEndDate = new Date(year, month - 1, 0); // 前月の最後の日の情報
  const lastMonthendDayCount = lastMonthEndDate.getDate(); // 前月の末日
  const startDay = startDate.getDay(); // 月の最初の日の曜日を取得
  let dayCount = 1; // 日にちのカウント
  let calendarHtml = ''; // HTMLを組み立てる変数

  calendarHtml += `<h2 class="calendar__header"><span id="prev"><</span>${year}年 ${month}月<span id="next">></span></h2>`;
  calendarHtml += '<table>';

  // 曜日の行を作成
  for (let i = 0; i < weeks.length; i++) {
    calendarHtml += '<td>' + weeks[i] + '</td>';
  }

  for (let w = 0; w < 5; w++) {
    calendarHtml += '<tr>';

    for (let d = 0; d < 7; d++) {
      if (w == 0 && d < startDay) {
        // 1行目で1日の曜日の前
        let num = lastMonthendDayCount - startDay + d + 1;
        calendarHtml += '<td class="is-disabled">' + num + '</td>';
      } else if (dayCount > endDayCount) {
        // 末尾の日数を超えた
        let num = dayCount - endDayCount;
        calendarHtml += '<td class="is-disabled">' + num + '</td>';
        dayCount++;
      } else {
        const isToday = year === thisYear && month === thisMonth && dayCount === today;
        const todayClass = isToday ? 'today' : '';
        calendarHtml += `<td class="calendar_td ${todayClass}" data-date="${year}/${month}/${dayCount}">${dayCount}</td>`;
        dayCount++;
      }
    }
    calendarHtml += '</tr>';
  }
  calendarHtml += '</table>';

  return calendarHtml;
}

function moveCalendar(e) {
  document.querySelector('#calendar').innerHTML = '';

  if (e.target.id === 'prev') {
    month--;

    if (month < 1) {
      year--;
      month = 12;
    }
  }

  if (e.target.id === 'next') {
    month++;

    if (month > 12) {
      year++;
      month = 1;
    }
  }

  showCalendar(year, month);
}

document.addEventListener('click', function (e) {
  // calendar_td クラスを持つ要素がクリックされたかを確認
  if (e.target.classList.contains('calendar_td')) {
    const input = document.querySelector('#preferred-date');
    // データ属性の日付を取得し、入力フィールドの値に設定
    input.value = e.target.dataset.date || ''; // データ属性が存在しない場合は空文字
    document.querySelector('#calendar').innerHTML = '';
  }
  calendarHtml = '';
});

const input = document.getElementById('preferred-date');
input.addEventListener('click', () => {
  const calendarHtml = document.querySelector('#calendar');
  if (calendarHtml.innerHTML === '') {
    showCalendar(year, month);
  }
});
