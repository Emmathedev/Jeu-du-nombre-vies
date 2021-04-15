// Elements du DOM
const divVies = document.querySelector('.vies');
const message = document.getElementById('message');
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerBtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0];

//Modèle de coeurs
const coeurVide = '<ion-icon name="heart-outline"></ion-icon>';
const coeurPlein = '<ion-icon name="heart"></ion-icon>';

//fond
const bgFroid = 'linear-gradient(to top, #5ee7df 0%, #b490ca 100%)';
const bgTiede = 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
const bgChaud = 'linear-gradient(to right, #fa709a 0%, #fee140 100%)';
const bgBrulant = ' linear-gradient(to top, #ff0844 0%, #ffb199 100%)';

const bgWin = 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)';
const bgLoose = 'linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)';

//play : 
const play = () => {
    //nombre aléatoire 
    const randomNumber = Math.floor(Math.random() *101); //floor arrondie à la valeur en dessous
    const totalVies = 5;
    let vies = totalVies;
    console.log(randomNumber);

    //Actualisation à chaque essai 
    formulaire.addEventListener('submit', (e) => {
        e.preventDefault() //empeche l'envoie du formulaire
        const valeurInput = parseInt(input.value); //'3' => 3 

        if(valeurInput < 0 || valeurInput > 100) return;

        if(valeurInput === randomNumber){
            body.style.backgroundImage = bgWin;
            message.textContent = `BRAVO !!! Le nombre était bien ${randomNumber}`;
            rejouerBtn.style.display = "block";
        }
        console.log(play);

        if(valeurInput !== randomNumber){
            if(randomNumber < valeurInput + 3 && randomNumber > valeurInput - 3) {
                body.style.backgroundImage = bgBrulant;
                message.textContent = "C'est brûlant !!!";
            } else if(randomNumber < valeurInput + 6 && randomNumber > valeurInput - 6) {
                body.style.backgroundImage = bgChaud;
                message.textContent = "C'est Chaud!";
            } else if (randomNumber < valeurInput + 11 && randomNumber > valeurInput - 11) {
                body.style.backgroundImage = bgTiede;
                message.textContent = "C'est Tiède";
            } else {
                body.style.backgroundImage = bgFroid;
                message.textContent = "C'est froid...";
            }
            vies--;
            verifyLoose();
        } 

        actualiseCoeurs(vies);
    })

    const verifyLoose = () => {
        if(vies === 0){
            body.style.backgroundImage = bgLoose;
            body.style.color = '#990000';
            essayerBtn.setAttribute("disabled", "disabled");
            message.textContent = `Vous avez perdu. La réponse était ${randomNumber}`;
        }
    }
    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = "";
        let tableauDeVies = [];
        for(let i=0; i < vies; i++){
            tableauDeVies.push(coeurPlein);
        }
        // [ coeur, coeur, coeur, coeur ]
        for(let i=0; i < totalVies - vies; i++){
            tableauDeVies.push(coeurVide);
        }
        tableauDeVies.forEach(coeur => {
            divVies.innerHTML += coeur;
        });
    };
    actualiseCoeurs(vies);

    rejouerBtn.addEventListener("click", () =>{
        message.style.display = 'none';
        document.location.reload(true); //rechargement de la page
    });
};
play();