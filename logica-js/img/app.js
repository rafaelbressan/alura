alert('Boas vindas ao jogo do número secreto');
const MAX_NUMBER = 5000;
const SECRET_NUMBER = parseInt(Math.random() * MAX_NUMBER + 1);
console.log(SECRET_NUMBER);
let guess;
let attempts = 1;

// enquanto chute não for igual ao n.s.
while (guess != SECRET_NUMBER) {
    guess = prompt(`Escolha um número entre 1 e ${MAX_NUMBER}`);
    // se chute for igual ao número secreto
    if (guess == SECRET_NUMBER) {
        break;
    } else {
        if (guess > SECRET_NUMBER) {
            alert(`O número secreto é menor que ${guess}`);
        } else {
            alert(`O número secreto é maior que ${guess}`);
        }
        // tentativas = tentativas + 1;
        attempts++;
    }
}

let attemptWord = attempts > 1 ? 'tentativas' : 'tentativa';
alert(`Isso ai! Você descobriu o número secreto ${SECRET_NUMBER} com ${attempts} ${attemptWord}.`);

// if (attempts > 1) {
//     alert(`Isso ai! Você descobriu o número secreto ${SECRET_NUMBER} com ${attempts} tentativas.`);
// } else {
//     alert(`Isso ai! Você descobriu o número secreto ${SECRET_NUMBER} com ${attempts} tentativa.`);
// }
