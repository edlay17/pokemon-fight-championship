function $getById(idName){
    return document.getElementById(idName);
}

const $thunderJolt = $getById("btn-kick");
const $thunderJolt2 = $getById("btn-kick2");
$thunderJolt.addEventListener("click", onClickThunderJolt);
$thunderJolt2.addEventListener("click", onClickThunderJolt2);
function onClickThunderJolt2(){
    buttons.thunderJolt2.onClick();
}
function onClickThunderJolt(){
    buttons.thunderJolt.onClick();
}
const $log = document.querySelector("#log");


const hero = {
    name: "Pika",
    defaultHP: 1550,
    currentHP: 1550,
    $hpSpan: $getById("health-character"),
    $hpProgressBar: $getById("progressbar-character"),
    renderHP,
    addDamage,
}

const enemy = {
    name: "Bulba",
    defaultHP: 5000,
    currentHP: 5000,
    $hpSpan: $getById("health-enemy"),
    $hpProgressBar: $getById("progressbar-enemy"),
    renderHP,
    addDamage,
}

const buttons = {
    thunderJolt: {
        name: "thunderJolt",
        damagePerson1From: 1,
        damagePerson1To: 5,
        damagePerson2From: 2,
        damagePerson2To: 10,
        onClick: onClickAttackButton,
    },
    thunderJolt2: {
        name: "thunderJolt2",
        damagePerson1From: 10,
        damagePerson1To: 50,
        damagePerson2From: 20,
        damagePerson2To: 100,
        onClick: onClickAttackButton,
    },

}

function renderHPSpan(person){
    const {currentHP, defaultHP} = person;
    let {$hpSpan} = person;
    $hpSpan.innerText = currentHP + " / " + defaultHP;
}

function renderHPBar(person){
    const {currentHP, defaultHP} = person;
    let {$hpProgressBar} = person;
    $hpProgressBar.style.width = Math.ceil(currentHP / defaultHP * 100) + "%";
}

function renderHP(){
    renderHPSpan(this);
    renderHPBar(this);
}

function addDamage(count){
    const prevHP = this.currentHP;
    this.currentHP -= count;
    if(this.currentHP < 0){
        this.currentHP = 0;
        damageButtonsDisable();
    }
    addNewLogRecord(generateLog(this, hero, prevHP, this.currentHP));
    this.renderHP();
}

function addNewLogRecord(text){
    const $p = document.createElement("p");
    $p.innerText = text;
    $log.insertBefore($p, $log.children[1]);
}

const getRandomValue = (from = 1, to = 10) => Math.round(Math.random() * to + from);

function damageButtonsDisable(){
    $thunderJolt.disabled = true;
    $thunderJolt2.disabled = true;
}

const determineTheWinner = (person1, person2) => {
    const {currentHP: p1_currentHP, name: p1_name} = person1;
    const {currentHP: p2_currentHP, name: p2_name} = person2;
    if(p1_currentHP === p2_currentHP)return alert("draw");
    return p1_currentHP > p2_currentHP ? alert(p1_name + " win") : alert(p2_name + " win")
}

function clickCounter(){
    let count = 0;
    return function addClick(){
        return ++count;
    }
}

function onClickAttackButton(){
    addNewLogRecord("---");
    hero.addDamage(getRandomValue(this.damagePerson1From,this.damagePerson1To));
    enemy.addDamage(getRandomValue(this.damagePerson2From,this.damagePerson2To));
    if(hero.currentHP === 0 || enemy.currentHP === 0){
        setTimeout(() => determineTheWinner(hero, enemy), 0)
    }
}

function generateLog(person1, person2, prevHP, currentHP) {
    const messageTemplates = [
        `${person1.name} вспомнил что-то важное, но неожиданно ${person2.name}, не помня себя от испуга, ударил в предплечье врага.`,
        `${person1.name} поперхнулся, и за это ${person2.name} с испугу приложил прямой удар коленом в лоб врага.`,
        `${person1.name} забылся, но в это время наглый ${person2.name}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `${person1.name} пришел в себя, но неожиданно ${person2.name} случайно нанес мощнейший удар.`,
        `${person1.name} поперхнулся, но в это время ${person2.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
        `${person1.name} удивился, а ${person2.name} пошатнувшись влепил подлый удар.`,
        `${person1.name} высморкался, но неожиданно ${person2.name} провел дробящий удар.`,
        `${person1.name} пошатнулся, и внезапно наглый ${person2.name} беспричинно ударил в ногу противника`,
        `${person1.name} расстроился, как вдруг, неожиданно ${person2.name} случайно влепил стопой в живот соперника.`,
        `${person1.name} пытался что-то сказать, но вдруг, неожиданно ${person2.name} со скуки, разбил бровь сопернику.`
    ];
    return messageTemplates[getRandomValue(0,messageTemplates.length-1)] + ` | ХП ${person1.name}: ${currentHP} (-${prevHP-currentHP})`;
}

function gameInit(){
    hero.renderHP();
    enemy.renderHP();
}

function test(url){
    return function test2(domain){
        return `${url}.${domain}`
    }
}


gameInit();


/*
    let const создают локальные переменные внутри любых фигурных скобок, а var глобальные

    если иницилизация var после вызова, то в вызове вернется undefined (то есть она увидит объявление, но не увидит иницилизацию)
    var попадет в lexical envoiroment
    let и const нельзя вызвать до иницилизации!!!

    у стрелочной функции нет совего контекста (this), она берет его у родительской функции в месте объявления
    другие функции берут контекст в месте вызова
*/