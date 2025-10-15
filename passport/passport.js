document.addEventListener('DOMContentLoaded', function() {
    const navChange = document.getElementById('nav-change');
    const navDom = document.getElementById('nav-dom');
    
    
    navChange.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('page-change').scrollIntoView({ 
            behavior: 'smooth' 
        });
        updateActiveNav('nav-change');
    });

    navDom.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('page-dom').scrollIntoView({ 
            behavior: 'smooth' 
        });
        updateActiveNav('nav-dom');
    });
    
    function updateActiveNav(activeId) {
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        document.getElementById(activeId).classList.add('active');
    }
});

const btn = document.getElementById('change-btn');
btn.addEventListener('click', changeLang)

let issuing = document.getElementById('issued');
let surname = document.querySelector('.surname');
let name = document.querySelector('.name');
let patronymic = document.querySelector('.patronymic');
let gender = document.querySelector('.gender');
let birthday = document.querySelector('.birthday');
let city = document.querySelector('.city');
let area = document.querySelector('.area');

const eng = [
    'MVD OF RUSSIA FOR ORENBURG REGION',
    'OGEY', 
    'ANNA',
    'SERGEEVNA',
    'FEMALE',
    '24.12.2005',
    'ORENBURG CITY',
    'ORENBURG REGION'
];

const rus = [
    'УМВД РОССИИ ПО ОРЕНБУРГСКОЙ ОБЛАСТИ',
    'ОГЕЙ',
    'АННА',
    'СЕРГЕЕВНА', 
    'ЖЕН',
    '24.12.2005',
    'Г. ОРЕНБУРГ',
    'ОРЕНБУРГСКАЯ ОБЛАСТЬ'
];

function changeLang() {
    if (btn.innerText == 'Click to show English version') {
        issuing.innerText = eng[0];
        surname.innerText = eng[1];
        name.innerText = eng[2];
        patronymic.innerText = eng[3];
        gender.innerText = eng[4];
        birthday.innerText = eng[5];
        city.innerText = eng[6];
        area.innerText = eng[7];

        btn.innerText = 'Вернуться к русской версии'
    } else {
        issuing.innerText = rus[0];
        surname.innerText = rus[1];
        name.innerText = rus[2];
        patronymic.innerText = rus[3];
        gender.innerText = rus[4];
        birthday.innerText = rus[5];
        city.innerText = rus[6];
        area.innerText = rus[7];

        btn.innerText = 'Click to show English version'
    };
};