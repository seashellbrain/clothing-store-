


// Функция для анимации подсчета
function animateCounter(id, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);
    let timer = setInterval(function() {
        current += increment;
        obj.textContent = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Вызов функции для каждого счетчика
window.onload = function() {
    animateCounter("counter1", 0, 100, 2000); // 100 тысяч доставок в год
    animateCounter("counter2", 0, 20, 2000);  // 20 великих компаний
    animateCounter("counter3", 0, 2, 2000);   // 2 тысячи сотрудников
    animateCounter("counter4", 0, 10, 2000);  // 10 миллионов продукции
};