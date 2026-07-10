// Base de dados fallback local para garantir funcionamento off-line ou caso a API dê erro (CORS, limite de quota, chave inválida)
const FALLBACK_GAMES = [
  {
    title: "League of Legends",
    genre: "MOBA",
    tags: ["moba", "strategy", "pvp", "3d"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/286/thumbnail.jpg",
    short_description:
      "Um MOBA lendário focado em equipes e estratégia, desenvolvido pela Riot Games.",
    developer: "Riot Games",
    publisher: "Riot Games",
    release_date: "2009-10-27",
    game_url: "https://www.leagueoflegends.com",
    min_ram: 8,
  },
  {
    title: "Valorant",
    genre: "Shooter",
    tags: ["shooter", "first-person", "pvp", "3d", "action"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/433/thumbnail.jpg",
    short_description:
      "Um shooter tático de 5v5 focado em personagens e precisão de tiro.",
    developer: "Riot Games",
    publisher: "Riot Games",
    release_date: "2020-06-02",
    game_url: "https://playvalorant.com",
    min_ram: 8,
  },
  {
    title: "Genshin Impact",
    genre: "Action RPG",
    tags: ["action-rpg", "open-world", "anime", "3d", "fantasy", "action"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/475/thumbnail.jpg",
    short_description:
      "Explore o vasto mundo de Teyvat neste RPG de ação de mundo aberto com visuais de anime.",
    developer: "miHoYo",
    publisher: "Cognosphere",
    release_date: "2020-09-28",
    game_url: "https://genshin.hoyoverse.com",
    min_ram: 8,
  },
  {
    title: "Apex Legends",
    genre: "Shooter",
    tags: ["shooter", "battle-royale", "pvp", "first-person", "action", "3d"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/11/thumbnail.jpg",
    short_description:
      "Um battle royale em ritmo acelerado onde personagens com habilidades únicas lutam pela glória.",
    developer: "Respawn Entertainment",
    publisher: "Electronic Arts",
    release_date: "2019-02-04",
    game_url: "https://www.ea.com/games/apex-legends",
    min_ram: 8,
  },
  {
    title: "Dota 2",
    genre: "MOBA",
    tags: ["moba", "strategy", "pvp", "3d"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/2/thumbnail.jpg",
    short_description:
      "A sequência do lendário mod Defense of the Ancients, oferecendo complexidade tática infinita.",
    developer: "Valve",
    publisher: "Valve",
    release_date: "2013-07-09",
    game_url: "https://www.dota2.com",
    min_ram: 8,
  },
  {
    title: "Warframe",
    genre: "Action",
    tags: ["action", "shooter", "third-person", "sci-fi", "pve", "3d"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/3/thumbnail.jpg",
    short_description:
      "Controle guerreiros ninjas espaciais cibernéticos em missões cooperativas épicas.",
    developer: "Digital Extremes",
    publisher: "Digital Extremes",
    release_date: "2013-03-25",
    game_url: "https://www.warframe.com",
    min_ram: 8,
  },
  {
    title: "Fortnite",
    genre: "Shooter",
    tags: ["shooter", "battle-royale", "third-person", "sandbox", "pvp", "3d"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/57/thumbnail.jpg",
    short_description:
      "Construa, lute e explore no battle royale mais famoso do mundo.",
    developer: "Epic Games",
    publisher: "Epic Games",
    release_date: "2017-07-21",
    game_url: "https://www.fortnite.com",
    min_ram: 8,
  },
  {
    title: "Lost Ark",
    genre: "Action RPG",
    tags: ["action-rpg", "mmo", "fantasy", "top-down", "pve", "pvp", "3d"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/516/thumbnail.jpg",
    short_description:
      "Embarque em uma jornada épica em busca da Lost Ark perdida em um vasto mundo de fantasia.",
    developer: "Smilegate RPG",
    publisher: "Amazon Games",
    release_date: "2022-02-11",
    game_url: "https://www.playlostark.com",
    min_ram: 8,
  },
  {
    title: "Hearthstone",
    genre: "Card",
    tags: ["card", "fantasy", "turn-based", "2d", "strategy"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/4/thumbnail.jpg",
    short_description:
      "O dinâmico jogo de cartas colecionáveis da Blizzard ambientado no universo Warcraft.",
    developer: "Blizzard Entertainment",
    publisher: "Blizzard Entertainment",
    release_date: "2014-03-11",
    game_url: "https://playhearthstone.com",
    min_ram: 4,
  },
  {
    title: "World of Tanks",
    genre: "Shooter",
    tags: ["shooter", "military", "tank", "strategy", "pvp", "3d"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/5/thumbnail.jpg",
    short_description:
      "Comande tanques blindados históricos em confrontos multiplayer estratégicos de alta escala.",
    developer: "Wargaming",
    publisher: "Wargaming",
    release_date: "2011-04-12",
    game_url: "https://worldoftanks.com",
    min_ram: 4,
  },
  {
    title: "Trove",
    genre: "MMO",
    tags: ["mmo", "voxel", "sandbox", "adventure", "3d"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/13/thumbnail.jpg",
    short_description:
      "Um MMO de ação voxelizado com mundos infinitos, construção e muita exploração.",
    developer: "Gamigo",
    publisher: "Gamigo",
    release_date: "2015-07-09",
    game_url: "https://www.trionworlds.com/trove",
    min_ram: 4,
  },
  {
    title: "Guild Wars 2",
    genre: "MMORPG",
    tags: ["mmorpg", "mmo", "fantasy", "open-world", "pvp", "pve", "3d"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/14/thumbnail.jpg",
    short_description:
      "Um dos MMORPGs de fantasia mais aclamados do mercado, com foco em história e eventos vivos.",
    developer: "ArenaNet",
    publisher: "NCSOFT",
    release_date: "2012-08-28",
    game_url: "https://www.guildwars2.com",
    min_ram: 8,
  },
  {
    title: "Albion Online",
    genre: "MMORPG",
    tags: [
      "mmorpg",
      "sandbox",
      "open-world",
      "pvp",
      "fantasy",
      "top-down",
      "3d",
    ],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/19/thumbnail.jpg",
    short_description:
      "Um MMORPG sandbox de fantasia onde a economia é 100% controlada por jogadores.",
    developer: "Sandbox Interactive",
    publisher: "Sandbox Interactive",
    release_date: "2017-07-17",
    game_url: "https://albiononline.com",
    min_ram: 8,
  },
  {
    title: "Path of Exile",
    genre: "Action RPG",
    tags: ["action-rpg", "fantasy", "pve", "top-down", "mmo", "3d"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/12/thumbnail.jpg",
    short_description:
      "RPG de ação sombrio e complexo com árvore de habilidades massiva e customização infinita.",
    developer: "Grinding Gear Games",
    publisher: "Grinding Gear Games",
    release_date: "2013-10-23",
    game_url: "https://www.pathofexile.com",
    min_ram: 8,
  },
  {
    title: "Team Fortress 2",
    genre: "Shooter",
    tags: ["shooter", "first-person", "action", "pvp", "military", "3d"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/20/thumbnail.jpg",
    short_description:
      "O clássico shooter de classes da Valve que continua divertido e atual até hoje.",
    developer: "Valve",
    publisher: "Valve",
    release_date: "2007-10-10",
    game_url: "https://www.teamfortress.com",
    min_ram: 4,
  },
  {
    title: "RuneScape",
    genre: "MMORPG",
    tags: ["mmorpg", "fantasy", "open-world", "3d", "mmo"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/21/thumbnail.jpg",
    short_description:
      "Um MMORPG de fantasia de mundo aberto que marcou gerações com sua liberdade.",
    developer: "Jagex",
    publisher: "Jagex",
    release_date: "2001-01-04",
    game_url: "https://www.runescape.com",
    min_ram: 4,
  },
  {
    title: "Brawlhalla",
    genre: "Fighting",
    tags: ["fighting", "action", "pvp", "2d"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/23/thumbnail.jpg",
    short_description:
      "Um jogo de luta de plataforma 2D divertido e competitivo com dezenas de personagens lendários.",
    developer: "Blue Mammoth Games",
    publisher: "Ubisoft",
    release_date: "2017-10-17",
    game_url: "https://www.brawlhalla.com",
    min_ram: 4,
  },
  {
    title: "SMITE",
    genre: "MOBA",
    tags: ["moba", "third-person", "action", "pvp", "3d", "strategy"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/24/thumbnail.jpg",
    short_description:
      "Um MOBA de ação em terceira pessoa onde você controla deuses mitológicos em combate direto.",
    developer: "Hi-Rez Studios",
    publisher: "Hi-Rez Studios",
    release_date: "2014-03-25",
    game_url: "https://www.smitegame.com",
    min_ram: 8,
  },
  {
    title: "Paladins",
    genre: "Shooter",
    tags: ["shooter", "first-person", "fantasy", "pvp", "3d", "action"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/25/thumbnail.jpg",
    short_description:
      "Hero shooter baseado em equipes em um mundo de fantasia repleto de tecnologia e magia.",
    developer: "Evil Mojo Games",
    publisher: "Hi-Rez Studios",
    release_date: "2018-05-08",
    game_url: "https://www.paladins.com",
    min_ram: 8,
  },
  {
    title: "Slither.io",
    genre: "Arcade",
    tags: ["social", "2d", "action"],
    platform: "browser",
    thumbnail: "https://www.freetogame.com/g/340/thumbnail.jpg",
    short_description:
      "Coma orbes brilhantes para crescer e eliminar as cobras rivais no seu navegador.",
    developer: "Lowtech Studios",
    publisher: "Lowtech Studios",
    release_date: "2016-03-25",
    game_url: "http://slither.io",
    min_ram: 2,
  },
  {
    title: "Agar.io",
    genre: "Arcade",
    tags: ["social", "2d", "action"],
    platform: "browser",
    thumbnail: "https://www.freetogame.com/g/341/thumbnail.jpg",
    short_description:
      "O clássico jogo de navegador onde você cresce absorvendo células menores e foge das maiores.",
    developer: "Matheus Valadares",
    publisher: "Miniclip",
    release_date: "2015-04-28",
    game_url: "http://agar.io",
    min_ram: 2,
  },
  {
    title: "Town of Salem",
    genre: "Strategy",
    tags: ["social", "strategy", "turn-based", "2d"],
    platform: "browser",
    thumbnail: "https://www.freetogame.com/g/343/thumbnail.jpg",
    short_description:
      "Um jogo de mentira, dedução e sobrevivência social focado em detectar traidores na vila.",
    developer: "BlankMediaGames",
    publisher: "BlankMediaGames",
    release_date: "2014-12-15",
    game_url: "https://www.blankmediagames.com",
    min_ram: 2,
  },
  {
    title: "Krunker.io",
    genre: "Shooter",
    tags: ["shooter", "first-person", "pixel", "3d", "action"],
    platform: "browser",
    thumbnail: "https://www.freetogame.com/g/345/thumbnail.jpg",
    short_description:
      "Um shooter em primeira pessoa rápido com gráficos pixelizados em estilo bloco, direto no navegador.",
    developer: "Yendis Entertainment",
    publisher: "Yendis Entertainment",
    release_date: "2018-05-20",
    game_url: "https://krunker.io",
    min_ram: 4,
  },
  {
    title: "Unturned",
    genre: "Survival",
    tags: [
      "survival",
      "shooter",
      "zombie",
      "voxel",
      "sandbox",
      "pvp",
      "pve",
      "3d",
    ],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/30/thumbnail.jpg",
    short_description:
      "Sobreviva ao apocalipse zumbi coletando recursos e construindo abrigos neste mundo voxelizado.",
    developer: "Smartly Gressed Games",
    publisher: "Smartly Gressed Games",
    release_date: "2017-07-07",
    game_url: "https://store.steampowered.com/app/304930/Unturned/",
    min_ram: 4,
  },
  {
    title: "Yu-Gi-Oh! Master Duel",
    genre: "Card",
    tags: ["card", "strategy", "anime", "turn-based", "2d"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/521/thumbnail.jpg",
    short_description:
      "Edição definitiva do jogo de cartas colecionáveis competitivo Yu-Gi-Oh, com milhares de cartas.",
    developer: "Konami Digital Entertainment",
    publisher: "Konami",
    release_date: "2022-01-19",
    game_url: "https://www.konami.com/yugioh/masterduel/",
    min_ram: 8,
  },
  {
    title: "Fallout Shelter",
    genre: "Strategy",
    tags: ["strategy", "survival", "2d"],
    platform: "pc",
    thumbnail: "https://www.freetogame.com/g/269/thumbnail.jpg",
    short_description:
      "Administre um abrigo nuclear subterrâneo subterrâneo Vault-Tec de última geração.",
    developer: "Bethesda Game Studios",
    publisher: "Bethesda Softworks",
    release_date: "2015-06-14",
    game_url: "https://store.steampowered.com/app/588430/Fallout_Shelter/",
    min_ram: 4,
  },
  {
    title: "Minecraft",
    genre: "Sandbox",
    tags: ["sandbox", "survival", "3d"],
    platform: "pc, playstation, xbox, switch",
    thumbnail:
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=600&auto=format&fit=crop",
    short_description:
      "Explore mundos infinitos e construa de tudo, desde a mais simples das casas até o mais grandioso dos castelos.",
    developer: "Mojang Studios",
    publisher: "Mojang Studios",
    release_date: "2011-11-18",
    game_url: "https://www.minecraft.net",
    min_ram: 4,
    price: "paid",
    worth: "$29.99",
  },
  {
    title: "Elden Ring",
    genre: "Action RPG",
    tags: ["action-rpg", "open-world", "fantasy", "3d", "action"],
    platform: "pc, playstation, xbox",
    thumbnail:
      "https://images.unsplash.com/photo-1655821888788-6107699e173b?q=80&w=600&auto=format&fit=crop",
    short_description:
      "Um RPG de ação de fantasia sombria em um vasto mundo aberto criado por Hidetaka Miyazaki e George R. R. Martin.",
    developer: "FromSoftware",
    publisher: "Bandai Namco Entertainment",
    release_date: "2022-02-25",
    game_url: "https://www.eldenring.com",
    min_ram: 12,
    price: "paid",
    worth: "$59.99",
  },
  {
    title: "Cyberpunk 2077",
    genre: "RPG",
    tags: ["sci-fi", "open-world", "action", "first-person", "3d"],
    platform: "pc, playstation, xbox",
    thumbnail:
      "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=600&auto=format&fit=crop",
    short_description:
      "RPG de ação e aventura em mundo aberto ambientado em Night City, uma megalópole obcecada por poder e modificações corporais.",
    developer: "CD Projekt Red",
    publisher: "CD Projekt Red",
    release_date: "2020-12-10",
    game_url: "https://www.cyberpunk.net",
    min_ram: 12,
    price: "paid",
    worth: "$59.99",
  },
  {
    title: "Grand Theft Auto V",
    genre: "Action",
    tags: ["open-world", "action", "3d", "pvp"],
    platform: "pc, playstation, xbox",
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    short_description:
      "Um ladrão de rua, um ladrão de bancos aposentado e um psicopata aterrorizante se envolvem com o submundo do crime.",
    developer: "Rockstar North",
    publisher: "Rockstar Games",
    release_date: "2013-09-17",
    game_url: "https://www.rockstargames.com/gta-v",
    min_ram: 8,
    price: "paid",
    worth: "$29.99",
  },
  {
    title: "Red Dead Redemption 2",
    genre: "Action",
    tags: ["open-world", "action", "survival", "3d"],
    platform: "pc, playstation, xbox",
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    short_description:
      "Uma história épica sobre a vida e a sobrevivência no implacável coração dos Estados Unidos no fim do século XIX.",
    developer: "CD Projekt Red",
    publisher: "Rockstar Games",
    release_date: "2018-10-26",
    game_url: "https://www.rockstargames.com/reddeadredemption2",
    min_ram: 12,
    price: "paid",
    worth: "$59.99",
  },
];

let loadedGames = [];

// Inicialização principal
window.addEventListener("DOMContentLoaded", async () => {
  await loadLocalDatabase();
  fazFetch();
});

async function loadLocalDatabase() {
  try {
    const response = await fetch("./data/games.json");
    if (!response.ok) throw new Error("Erro ao ler games.json");
    loadedGames = await response.json();
    console.log(
      `Sucesso! ${loadedGames.length} jogos carregados do banco estático.`,
    );
  } catch (error) {
    console.warn(
      "Falha ao carregar banco estático. Usando fallback offline de segurança...",
      error,
    );
    loadedGames = FALLBACK_GAMES;
  }
}

async function fazFetch() {
  const getInfoButton = document.getElementById("button-check");
  const ramInput = document.getElementById("RAM-quantity");
  const platformSelect = document.getElementById("platform");
  const tagsContainer = document.getElementById("container-1");
  const sectionCard = document.getElementById("sectionCard");
  const priceTypeSelect = document.getElementById("price-type");

  if (
    !getInfoButton ||
    !platformSelect ||
    !tagsContainer ||
    !sectionCard ||
    !priceTypeSelect
  )
    return;

  let checkedValues = [];
  let ramQuantity = "";

  // 1. Escuta mudanças na grid de tags (Event Delegation)
  tagsContainer.addEventListener("change", (event) => {
    if (event.target && event.target.type === "checkbox") {
      const allCheckboxes = tagsContainer.querySelectorAll(".checkbox-input");
      checkedValues = Array.from(allCheckboxes)
        .filter((cb) => cb.checked)
        .map((cb) => cb.value);

      if (checkedValues.length > 0) {
        getInfoButton.removeAttribute("disabled");
      } else {
        getInfoButton.setAttribute("disabled", "true");
      }
    }
  });

  // 2. Escuta mudanças no input de memória RAM
  ramInput.addEventListener("input", () => {
    ramQuantity = ramInput.value.trim();
  });

  // 3. Ação do Botão de Submit (Busca Estática Reativa)
  getInfoButton.addEventListener("click", () => {
    showLoading();

    const selectedPlatform = platformSelect.value;
    const selectedPrice = priceTypeSelect.value;

    const matchingGames = loadedGames.filter((game) => {
      // Filtro por Preço
      if (selectedPrice) {
        const isPaidGame =
          game.price === "paid" ||
          (game.worth && game.worth !== "N/A" && game.worth !== "$0.00");
        if (selectedPrice === "paid" && !isPaidGame) return false;
        if (selectedPrice === "free" && isPaidGame) return false;
      }

      // Filtro por plataforma
      if (selectedPlatform) {
        const platLower = (game.platform || "").toLowerCase();
        if (
          selectedPlatform === "pc" &&
          !platLower.includes("pc") &&
          !platLower.includes("windows")
        )
          return false;
        if (
          selectedPlatform === "browser" &&
          !platLower.includes("browser") &&
          !platLower.includes("web") &&
          !platLower.includes("navegador")
        )
          return false;
        if (
          selectedPlatform === "playstation" &&
          !platLower.includes("playstation") &&
          !platLower.includes("ps4") &&
          !platLower.includes("ps5")
        )
          return false;
        if (selectedPlatform === "xbox" && !platLower.includes("xbox"))
          return false;
        if (
          selectedPlatform === "switch" &&
          !platLower.includes("switch") &&
          !platLower.includes("nintendo")
        )
          return false;
      }

      // Filtro por tags
      if (checkedValues.length > 0) {
        const gameGenre = (game.genre || "").toLowerCase();
        const gameTags = Array.isArray(game.tags)
          ? game.tags.map((t) => t.toLowerCase())
          : [];
        const gameDesc = (
          game.description ||
          game.short_description ||
          ""
        ).toLowerCase();
        const gameTitle = (game.title || "").toLowerCase();

        return checkedValues.some((selectedTag) => {
          const tag = selectedTag.toLowerCase();
          return (
            gameGenre.includes(tag) ||
            gameTags.includes(tag) ||
            gameDesc.includes(tag) ||
            gameTitle.includes(tag)
          );
        });
      }
      return true;
    });

    // Simula delay de 300ms para feedback visual fluido do loading spinner
    setTimeout(() => {
      processAndDisplayGame(matchingGames, loadedGames === FALLBACK_GAMES);
    }, 300);
  });

  // Mostra spinner de carregamento tecnológico
  function showLoading() {
    sectionCard.innerHTML = `
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Vasculhando bancos de dados gamer...</p>
      </div>
    `;
  }

  // Processa e renderiza o jogo escolhido na tela
  function processAndDisplayGame(games, isFallback = false) {
    sectionCard.innerHTML = ""; // Limpa animação de loading
    const selectedPlatform = platformSelect.value;

    // Filtro por memória RAM
    let filteredGames = [...games];
    const userRamValue = parseInt(ramQuantity, 10);

    if (!isNaN(userRamValue)) {
      // Filtra jogos onde o min_ram estimado é compatível com o do usuário
      // Para jogos vindos da API externa, estimamos a RAM com base na plataforma/gênero
      const tempFiltered = filteredGames.filter((g) => {
        const estimatedMinRam = getEstimatedRamRequirement(g);
        return userRamValue >= estimatedMinRam;
      });

      // Se não houver nenhum jogo compatível para não deixar a tela vazia, mantemos a lista completa e exibiremos um aviso de compatibilidade
      if (tempFiltered.length > 0) {
        filteredGames = tempFiltered;
      }
    }

    // Seleciona um jogo aleatório da lista filtrada
    const game =
      filteredGames[Math.floor(Math.random() * filteredGames.length)];

    if (!game) {
      sectionCard.innerHTML = `
        <div class="error-card glass">
          <p>Desculpe, nenhum jogo atende aos filtros exigidos. Tente selecionar menos tags ou aumentar o limite de RAM.</p>
        </div>
      `;
      return;
    }

    // Determina o requisito de RAM estimado para exibição
    const ramReq = game.min_ram || getEstimatedRamRequirement(game);
    const isBrowser =
      (game.platform && game.platform.toLowerCase().includes("browser")) ||
      game.platform === "browser";

    // Cria o card de Jogo modernizado
    const gameCard = document.createElement("div");
    gameCard.className = "game-card glass fade-in-up";

    // Tag Badge de Fallback Local vs API Online
    const originBadge = document.createElement("span");
    originBadge.className = isFallback
      ? "badge badge-fallback"
      : "badge badge-online";
    originBadge.textContent = isFallback ? "Backup Offline" : "Live API";
    gameCard.appendChild(originBadge);

    // Container de Imagem
    const imgContainer = document.createElement("div");
    imgContainer.className = "game-img-container";

    const gameImg = document.createElement("img");
    gameImg.className = "game-img";
    gameImg.src = game.thumbnail;
    gameImg.alt = game.title || game.name;
    gameImg.onerror = () => {
      // Imagem padrão caso a do FreeToGame falhe no carregamento
      gameImg.src =
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop";
    };
    imgContainer.appendChild(gameImg);
    gameCard.appendChild(imgContainer);

    // Corpo de Informações do Card
    const cardBody = document.createElement("div");
    cardBody.className = "game-card-body";

    // Determina se é pago
    const isPaid =
      game.price === "paid" ||
      (game.worth && game.worth !== "N/A" && game.worth !== "$0.00");

    let priceText = "Grátis";
    if (isPaid) {
      if (game.sale_price) {
        priceText = `Promo: ${game.sale_price} (Era ${game.worth})`;
      } else if (game.worth && game.worth !== "N/A") {
        priceText = `Pago (${game.worth})`;
      } else {
        priceText = "Pago";
      }
    }

    // Gênero / Categoria Badge (GamerPower usa .type, FreeToGame usa .genre)
    const genre =
      game.genre || game.type || (game.tags && game.tags[0]) || "Gamer";
    const genreBadge = document.createElement("span");
    genreBadge.className = "game-genre";
    genreBadge.textContent = genre.toUpperCase();

    // Price Badge
    const priceBadge = document.createElement("span");
    priceBadge.className = isPaid
      ? "game-price-badge price-paid"
      : "game-price-badge price-free";
    priceBadge.textContent = priceText.toUpperCase();

    // Badges Row Wrapper
    const badgesRow = document.createElement("div");
    badgesRow.className = "badges-row";
    badgesRow.appendChild(genreBadge);
    badgesRow.appendChild(priceBadge);
    cardBody.appendChild(badgesRow);

    // Título do Jogo
    const title = document.createElement("h2");
    title.className = "game-title";
    title.textContent = game.title || game.name || "Jogo Desconhecido";
    cardBody.appendChild(title);

    // Descrição Curta (GamerPower usa .description, FreeToGame usa .short_description)
    const desc = document.createElement("p");
    desc.className = "game-desc";
    desc.textContent =
      game.description ||
      game.short_description ||
      "Um jogo eletrizante gratuito para você jogar agora mesmo!";
    cardBody.appendChild(desc);

    // Metadados rápidos (Desenvolvedora, Ano)
    const metaRow = document.createElement("div");
    metaRow.className = "game-meta-row";

    const devText = game.developer ? `Dev: ${game.developer}` : "Gratuito";
    const releaseText =
      game.release_date || game.published_date
        ? `Lançado: ${(game.release_date || game.published_date).split("-")[0]}`
        : "";

    metaRow.innerHTML = `
      <span>${devText}</span>
      <span>${releaseText}</span>
    `;
    cardBody.appendChild(metaRow);

    // Detecta se é um jogo de console
    const isConsoleGame =
      (game.platforms &&
        (game.platforms.toLowerCase().includes("playstation") ||
          game.platforms.toLowerCase().includes("xbox") ||
          game.platforms.toLowerCase().includes("switch") ||
          game.platforms.toLowerCase().includes("nintendo"))) ||
      ["playstation", "xbox", "switch"].includes(platformSelect.value);

    // Info do Sistema & RAM
    const sysInfo = document.createElement("div");
    sysInfo.className = "game-sys-info";

    // Determina Rótulo e Ícone da plataforma
    let platformLabel = "PC Windows";
    if (isBrowser) {
      platformLabel = "Navegador Web";
    } else if (isConsoleGame) {
      if (
        game.platforms &&
        game.platforms.toLowerCase().includes("playstation")
      ) {
        platformLabel = "PlayStation";
      } else if (
        game.platforms &&
        game.platforms.toLowerCase().includes("xbox")
      ) {
        platformLabel = "Xbox";
      } else if (
        game.platforms &&
        game.platforms.toLowerCase().includes("switch")
      ) {
        platformLabel = "Nintendo Switch";
      } else {
        platformLabel =
          selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1);
      }
    }

    const platformIcon = isBrowser
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
      : isConsoleGame
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="3" ry="3"/><circle cx="6" cy="12" r="1"/><circle cx="10" cy="12" r="1"/><circle cx="8" cy="10" r="1"/><circle cx="8" cy="14" r="1"/><circle cx="15" cy="11" r="1.5"/><circle cx="18" cy="13" r="1.5"/></svg>`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>`;

    // Análise de RAM inteligente
    let ramStatusHtml = "";
    if (isBrowser) {
      ramStatusHtml = `<span class="ram-status ram-compatible">⚡ Roda direto no navegador (Leve)</span>`;
    } else if (isConsoleGame) {
      ramStatusHtml = `<span class="ram-status ram-compatible">🎮 Roda direto no console (Sem limites de RAM)</span>`;
    } else if (userRamValue) {
      if (userRamValue >= ramReq) {
        ramStatusHtml = `<span class="ram-status ram-compatible">✅ Compatível (Você: ${userRamValue}GB | Requer: ~${ramReq}GB)</span>`;
      } else {
        ramStatusHtml = `<span class="ram-status ram-warning">⚠️ Limite de RAM (Você: ${userRamValue}GB | Requer: ~${ramReq}GB)</span>`;
      }
    } else {
      ramStatusHtml = `<span class="ram-status ram-neutral">💻 Requisito estimado: ~${ramReq}GB RAM</span>`;
    }

    sysInfo.innerHTML = `
      <div class="platform-badge">
        ${platformIcon}
        <span>${platformLabel}</span>
      </div>
      ${ramStatusHtml}
    `;
    cardBody.appendChild(sysInfo);

    // Botão de ação para jogar (suporta game_url, open_giveaway_url e freetogame_profile_url)
    const playUrl =
      game.game_url ||
      game.open_giveaway_url ||
      game.freetogame_profile_url ||
      "https://www.gamerpower.com";

    let btnText = "Jogar Grátis";
    if (isPaid) {
      if (game.sale_price) {
        btnText = "Ver Oferta";
      } else if (
        game.open_giveaway_url ||
        (game.game_url && game.game_url.includes("gamerpower"))
      ) {
        btnText = "Resgatar Grátis";
      } else {
        btnText = "Comprar Jogo";
      }
    }

    const playBtn = document.createElement("a");
    playBtn.className = "btn btn-secondary btn-play";
    playBtn.href = playUrl;
    playBtn.target = "_blank";
    playBtn.rel = "noopener noreferrer";
    playBtn.innerHTML = `
      <span>${btnText}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    `;
    cardBody.appendChild(playBtn);

    gameCard.appendChild(cardBody);
    sectionCard.appendChild(gameCard);
  }

  // Estima dinamicamente o requisito de RAM com base nas tags e plataforma
  function getEstimatedRamRequirement(game) {
    if (game.platform && game.platform.toLowerCase().includes("browser")) {
      return 2; // Leve
    }

    // Procura por tags pesadas
    const desc = (game.short_description || "").toLowerCase();
    const genre = (game.genre || "").toLowerCase();
    const tags = game.tags || [];

    const isHeavy =
      tags.includes("open-world") ||
      tags.includes("battle-royale") ||
      tags.includes("action-rpg") ||
      tags.includes("shooter") ||
      desc.includes("open world") ||
      desc.includes("graficos de ultima geracao") ||
      genre.includes("shooter");

    if (isHeavy) {
      return 8; // 8GB RAM recomendado
    }

    return 4; // 4GB RAM padrão
  }
}
