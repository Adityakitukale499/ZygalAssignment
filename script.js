document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    const enterDateInput = document.getElementById('enterDate');
    let selectDate = [];
    let lastDateInMonth = 31;

    function generateCalendar(month, year) {
        console.log(selectDate);
        calendar.innerHTML = '';

        const firstDay = new Date(year, month - 1, 1).getDay();
        console.log(firstDay);

        const daysInMonth = new Date(year, month, 0).getDate();
        console.log(daysInMonth);
        lastDateInMonth = daysInMonth

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (const day of daysOfWeek) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.classList.add('dayCell')
            cell.textContent = day;
            calendar.appendChild(cell);
        }
        //empty box
        for (let i = 0; i < firstDay; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            calendar.appendChild(cell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if(selectDate.includes(day)){
                cell.className = 'green';
                // console.log('date');
            }else{
                cell.className = 'cell';
            }
            cell.textContent = day;
            // cell.addEventListener('click', toggleColor);
            calendar.appendChild(cell);
            // console.log(cell.classList);
        }
    }
    let month= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = month[i-1];
        monthSelect.appendChild(option);
    }

    for (let i = 2010; i <= 2030; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    monthSelect.addEventListener('change', updateCalendar);
    yearSelect.addEventListener('change', updateCalendar);

    
    enterDateInput.addEventListener('keyup', function (event) {
        console.log(event.target.value);
        
        if (event.key === 'Enter') {
            if(parseInt(event.target.value) < 1 || parseInt(event.target.value) > lastDateInMonth){
                alert('Enter Valid Date')
            }
            else if(selectDate.includes(parseInt(event.target.value))){
                console.log('');
               selectDate = selectDate.filter((e)=> e != parseInt(event.target.value))
            }else{
                selectDate = [...selectDate, parseInt(event.target.value)]
            }
            updateCalendar()
        }
    });

    function updateCalendar() {
        const selectedMonth = parseInt(monthSelect.value, 10);
        const selectedYear = parseInt(yearSelect.value, 10);
        generateCalendar(selectedMonth, selectedYear);
    }

    
    // function toggleColor(event) {
    //     console.log(event.target.classList);
    //     // updateCalendar()
    //     event.target.classList.remove('cell')
    //     event.target.classList.add('green')
    // }
    
    
    const currentDate = new Date();
    monthSelect.value = currentDate.getMonth() + 1; // Months are zero-based
    yearSelect.value = currentDate.getFullYear();
    generateCalendar(currentDate.getMonth() + 1, currentDate.getFullYear());
});
