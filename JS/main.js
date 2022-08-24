

fazFetch();

async function fazFetch() {
    //carrega informações do DOM
    const getInfoButton = document.getElementById("button-check");
    const ram = document.getElementById("RAM-quantity");
    const platform = document.getElementById("platform");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const submit = document.getElementById("button-check");

    //constantes e variaveis para serem usadas na função.

    const API_LINK = 'https://free-to-play-games-database.p.rapidapi.com/api/filter?';
    const CATEGORY = 'category=pc';

    var checkedValues = [];
    var TAG = "tag=";
    var PLATFORM = 'platform='
    var res1;
    var ramQuantity = '';


    //EVENTOS DE ESCUTA

    //cria evento de escuta para qualquer mudança nas checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', () => {
            if (checkboxes[i].checked == true) {

                //caso checkbox marcada atribui seu valor em values. também habilita butão submit que estava inativo.
                checkedValues.push(checkboxes[i].value);
                submit.removeAttribute("disabled");
                TAG = "tag=" + checkedValues.join('.');



            }
            else if (checkboxes[i].checked == false) {

                submit.setAttribute("disabled", "");
                checkedValues.pop();
                TAG = checkedValues.join('.')




            }

            console.log(TAG);
            console.log(checkedValues);
            console.log(checkedValues[0]);
        })

    }



    //cria evento de escuta para qualquer mudança no Select
    platform.addEventListener('change', () => {
        console.log("a plataforma selecionada foi " + platform.value)
        PLATFORM = 'platform=' + platform.value;
    })

    console.log

    // escuta mudança na caixa de input da memoria RAM
    ram.addEventListener('change', () => {
        ramQuantity = ram.value;
        console.log(ramQuantity);
    })


    //escuta pro botão
    getInfoButton.addEventListener("click", async () => {

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'cf1135635bmsh474fe305c0cc252p18816fjsne45f0c9774ab',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        // fetch(`${API_LINK}` + `${TAG}` + '&' + `${PLATFORM}`, options)
        // .then(response => response.json())
        // .then(data => res1 = data)
        // .then(response => console.log(response))
        // .catch(err => console.error(err));

        try {
            const res = await fetch(`${API_LINK}` + `${TAG}` + '&' + `${PLATFORM}`, options);
            res1 = await res.json();
            console.log(ramQuantity)

            var count = Object.keys(res1).length;
            console.log(count);
        } catch (error) {
            throw new Error(error);
        };
        if (ramQuantity == '') {
            console.log("entramos na condição if ramQuantity==''")
            console.log(res1);
            const keys = Object.values(res1);
            const prop = keys[Math.floor(Math.random() * keys.length)];
            console.log(prop);


            //manipulate section in DOM to show the response
            const sectionCard = document.getElementById("sectionCard")

            // Cria Bloco para mostrar o Jogo
            const gameCard = document.createElement("div");
            gameCard.classList.add("gameCard");
            sectionCard.append(gameCard);

            // Image
            const gameImg = document.createElement("img");
            gameImg.classList.add("gameImg");
            gameImg.src = prop.thumbnail;
            gameCard.append(gameImg);


            // Titulo
            const title = document.createElement("h2");
            title.classList.add("title");
            sectionCard.append(title);
            title.textContent = prop.name;
        }
        else {
            for (let i = 0; i < count; i++) {

            }

        }

    })
}




// function showGame(response) {
//     for (let i = 0; i < response; i++) {

        
//         const sectionCard = document.getElementById("gameCard")

//         Cria Bloco para mostrar o Jogo
//         const gameCard = document.createElement("div");
//         gameCard.classList.add("gameCard");
//         sectionCard.append(gameCard);

//         Image
//         const gameImg = document.createElement("img");
//         gameImg.classList.add("gameImg");
//         gameImg.src = response.results[i].thumbnail;
//         gameCard.append(gameImg);


//         Titulo
//         const title = document.createElement("h2");
//         title.classList.add("title");
//         titleMeta.append(title);
//         title.textContent = response.results[i].name;





//     }
// }