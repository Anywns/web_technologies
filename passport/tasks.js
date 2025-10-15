document.addEventListener('DOMContentLoaded', function() {
    const S = document.getElementById('area');
    const R = document.getElementById('radius');
    const K = document.getElementById('passage');
    const solveBtn = document.getElementById('calculate-btn');
    const solutionText = document.getElementById('result');
    const resultHidden = document.getElementById('result_hidden');

    solveBtn.addEventListener('click', main);

    function main() {
        const SValue = S.value.trim();
        const RValue = R.value.trim();
        const KValue = K.value.trim();

        if (SValue === '' || RValue === '' || KValue === '') {
            solutionText.innerHTML = '<h4>Результат:</h4><p class="error">Ошибка. Заполните все поля</p>';
            resultHidden.value = 'Ошибка: не заполнены все поля';
            return;
        }

        const SNum = parseFloat(SValue);
        const RNum = parseFloat(RValue);
        const KNum = parseFloat(KValue);

        if (isNaN(SNum) || isNaN(RNum) || isNaN(KNum) || SNum <= 0 || RNum <= 0 || KNum < 0) {
            solutionText.innerHTML = '<h4>Результат:</h4><p class="error">Ошибка. Введите положительные числа (S > 0, R > 0, K ≥ 0)</p>';
            resultHidden.value = 'Ошибка: неверные числа';
            return;
        }

        const side = Math.sqrt(SNum); 
        const maxRadius = (side - 2 * KNum) / 2; 

        let out = `<h4>Результат:</h4>`;
        let resultText = '';

        if (RNum <= maxRadius) {
            out += `<p class="success">✓ МОЖНО разместить сцену<br>Сторона зала: ${side.toFixed(2)} м<br>Максимальный радиус: ${maxRadius.toFixed(2)} м</p>`;
            resultText = `МОЖНО. side=${side.toFixed(2)}, Rmax=${maxRadius.toFixed(2)}`;
        } else {
            out += `<p class="error">✗ НЕЛЬЗЯ разместить сцену<br>Сторона зала: ${side.toFixed(2)} м<br>Максимальный радиус: ${maxRadius.toFixed(2)} м<br>Требуется радиус ≤ ${maxRadius.toFixed(2)} м</p>`;
            resultText = `НЕЛЬЗЯ. side=${side.toFixed(2)}, Rmax=${maxRadius.toFixed(2)}, требуется≤${maxRadius.toFixed(2)}`;
        }
        solutionText.innerHTML = out;

        resultHidden.value = resultText;
    }

    const sendForm = document.getElementById('send-form');
    sendForm.addEventListener('submit', function(e) {
        if (!resultHidden.value) {
            e.preventDefault();
            alert('Сначала нажмите "Проверить возможность", чтобы получить результат, затем отправляйте.');
        }
    });

});