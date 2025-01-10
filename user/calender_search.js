const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDay = today.getDate();

let currentYear = todayYear;
let currentMonth = todayMonth;

let selectedYear = 0;
let selectedMonth = 0;
let selectedDay = 0;

//読み込み時の初期動作
document.addEventListener("DOMContentLoaded", () => {
    initcalendar();
});

//今月のカレンダーを作成する関数
function initcalendar(){
    document.getElementById("pre_Month").addEventListener("click", function(){
        changeMonth(-1);
    });

    document.getElementById("next_Month").addEventListener("click", function(){
        changeMonth(1);
    });

    genetatecalendar(currentYear, currentMonth);
}

//カレンダーの生成関数
function genetatecalendar(year, month){
    const headerText = document.getElementById("calendar_Header_Text");
    const daysContainer = document.getElementById("calendar_Days");

    makeHeader(year, month, headerText);
    clearCalendar(daysContainer);
    makeWeekdays(daysContainer);
    makeDays(year, month, daysContainer);
}

//ヘッダー作成を作成する関数
function makeHeader(year, month, headerText){
    const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    headerText.textContent = months[month] + " " + year;
}

//前のカレンダー消去する関数
function clearCalendar(daysContainer){
    daysContainer.innerHTML = "";
}

//日~土の文字を表示させる関数
function makeWeekdays(daysContainer){
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    for(let i = 0; i < weekdays.length; i++){
        const weekdayElement = document.createElement("div");
        weekdayElement.textContent = weekdays[i];
        weekdayElement.className = "calendar_Day weekday";
        daysContainer.appendChild(weekdayElement);
    }
}

//日付部分を作成する関数
function makeDays(year, month, daysContainer){   
    makeDaysEmpty(year, month, daysContainer);
    makeDay(year, month, daysContainer);
}

//月初めの空白部分を作成する関数
function makeDaysEmpty(year, month, daysContainer){
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    for(let i = 0; i < firstDayOfMonth; i++){
        const emptyDay = document.createElement("div");
        emptyDay.className = "calendar_Day";
        emptyDay.style = "pointer-events: none;"
        daysContainer.appendChild(emptyDay);
    }
}

//日にち部分を作成する関数
function makeDay(year, month, daysContainer){
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for(let day = 1; day <= daysInMonth; day++){
        const dayElement = document.createElement("div");
        dayElement.className = "calendar_Day";
        dayElement.textContent = day;
        const inputDate = new Date(year, month, day);
        if(inputDate == today){
            dayElement.classList.add("current_Day"); 
        }

        dayElement.addEventListener("click", function(){
            clicked_Button(currentYear, currentMonth, day);
        });
        daysContainer.appendChild(dayElement);
    }
}

//月を切り替えた時にカレンダーを新しくする関数
function changeMonth(offset){
    currentMonth += offset;

    if(currentMonth < 0){
        currentMonth = 11;
        currentYear -= 1;
    }else if(currentMonth > 11){
        currentMonth = 0;
        currentYear += 1;
    }

    genetatecalendar(currentYear, currentMonth);
}

//カレンダー内の日付ボタンを押された時の処理
function clicked_Button(year, month, day){
    const inputDate = new Date(year, month, day);
    let outText = document.getElementById("clicked_Date");
    let textDate;
    if(today < inputDate){
        setSelected(year, month, day);
        textDate = year + "年 " + (month + 1) + "月 " + day + "日 を選択しています。";       
    }else{
        textDate = "本日より後の日付を選択してください。"
        setSelected(null, null, null)
    }
    outText.textContent = textDate;
}

//選択された日付を変更する関数
function setSelected(year, month, day){
    selectedYear = year;
    selectedMonth = month;
    selectedDay = day;
}
