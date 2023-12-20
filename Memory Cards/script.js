function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

function elemInArray(elem, array){
    for (let i = 0; i < array.length; i++){
        if (array[i] != elem) return false;
    }
    return true;
}
  
let firstArr = []
for (let i = 0; i < 5; i++){
    while (firstArr.length < 5){
        let rnd = getRandomInt(0, 9);
        if (!contains(firstArr, String.fromCodePoint("0x1F62" + rnd))){
            firstArr.push(String.fromCodePoint("0x1F62" + rnd));
        }
    }
}

let secondArr = shuffle(firstArr);
let mainArr = [];

for (let i = 0; i < firstArr.length; i++){
    mainArr.push(firstArr[i]);
    mainArr.push(secondArr[i]);
}

let firstSmile = -1;
let secondSmile = -1;

for (let i = 0; i < 10; i++){
    let btn = document.getElementById(String(i));
    btn.addEventListener('click', function(){
        btn.textContent = mainArr[i];   
        if (firstSmile < 0 && secondSmile < 0){
            firstSmile = btn.id;
        }
        else if(firstSmile >= 0 && secondSmile < 0){
            secondSmile = btn.id; 
            let b1 = document.getElementById(firstSmile);
            let b2 = document.getElementById(secondSmile);
            b2.textContent = mainArr[i];
            if (mainArr[firstSmile] == mainArr[secondSmile]){
                b1.textContent="✅";
                b2.textContent="✅";
                mainArr[firstSmile] = "✅";
                mainArr[secondSmile] = "✅";
            }
            else{
                setTimeout(function(){if (b1.textContent != "✅") b1.textContent="?";
                if (b2.textContent != "✅") b2.textContent="?";}, 500);
            }
            firstSmile = -1;
            secondSmile = -1;
        }
        event.preventDefault();

        if (elemInArray("✅", mainArr)){
            setTimeout(function(){
                if (confirm("Вы победили! Начать новую игру?")) location.reload();
            }, 300)
        }
    })

}



mainArr = shuffle(mainArr);

for (let i = 0; i < mainArr.length; i++){
    console.log(mainArr[i]); //подсказка в консоли
}