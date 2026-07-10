// Base de dados fallback local para garantir funcionamento off-line ou caso a API dê erro (CORS, limite de quota, chave inválida)
const FALLBACK_GAMES = [
  {
    title: "League of Legends",
    genre: "MOBA",
    tags: ["moba", "strategy", "pvp", "3d"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/286/thumbnail.jpg",
    short_description:
      "Um MOBA lendário focado em equipes e estratégia, desenvolvido pela Riot Games.",
    developer: "Riot Games",
    publisher: "Riot Games",
    release_date: "2009-10-27",
    game_url: "https://www.leagueoflegends.com",
  },
  {
    title: "Valorant",
    genre: "Shooter",
    tags: ["shooter", "first-person", "pvp", "3d", "action"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/433/thumbnail.jpg",
    short_description:
      "Um shooter tático de 5v5 focado em personagens e precisão de tiro.",
    developer: "Riot Games",
    publisher: "Riot Games",
    release_date: "2020-06-02",
    game_url: "https://playvalorant.com",
  },
  {
    title: "Genshin Impact",
    genre: "Action RPG",
    tags: ["action-rpg", "open-world", "anime", "3d", "fantasy", "action"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/475/thumbnail.jpg",
    short_description:
      "Explore o vasto mundo de Teyvat neste RPG de ação de mundo aberto com visuais de anime.",
    developer: "miHoYo",
    publisher: "Cognosphere",
    release_date: "2020-09-28",
    game_url: "https://genshin.hoyoverse.com",
  },
  {
    title: "Apex Legends",
    genre: "Shooter",
    tags: ["shooter", "battle-royale", "pvp", "first-person", "action", "3d"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/11/thumbnail.jpg",
    short_description:
      "Um battle royale em ritmo acelerado onde personagens com habilidades únicas lutam pela glória.",
    developer: "Respawn Entertainment",
    publisher: "Electronic Arts",
    release_date: "2019-02-04",
    game_url: "https://www.ea.com/games/apex-legends",
  },
  {
    title: "Dota 2",
    genre: "MOBA",
    tags: ["moba", "strategy", "pvp", "3d"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/2/thumbnail.jpg",
    short_description:
      "A sequência do lendário mod Defense of the Ancients, oferecendo complexidade tática infinita.",
    developer: "Valve",
    publisher: "Valve",
    release_date: "2013-07-09",
    game_url: "https://www.dota2.com",
  },
  {
    title: "Warframe",
    genre: "Action",
    tags: ["action", "shooter", "third-person", "sci-fi", "pve", "3d"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/3/thumbnail.jpg",
    short_description:
      "Controle guerreiros ninjas espaciais cibernéticos em missões cooperativas épicas.",
    developer: "Digital Extremes",
    publisher: "Digital Extremes",
    release_date: "2013-03-25",
    game_url: "https://www.warframe.com",
  },
  {
    title: "Fortnite",
    genre: "Shooter",
    tags: ["shooter", "battle-royale", "third-person", "sandbox", "pvp", "3d"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/57/thumbnail.jpg",
    short_description:
      "Construa, lute e explore no battle royale mais famoso do mundo.",
    developer: "Epic Games",
    publisher: "Epic Games",
    release_date: "2017-07-21",
    game_url: "https://www.fortnite.com",
  },
  {
    title: "Lost Ark",
    genre: "Action RPG",
    tags: ["action-rpg", "mmo", "fantasy", "top-down", "pve", "pvp", "3d"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/516/thumbnail.jpg",
    short_description:
      "Embarque em uma jornada épica em busca da Lost Ark perdida em um vasto mundo de fantasia.",
    developer: "Smilegate RPG",
    publisher: "Amazon Games",
    release_date: "2022-02-11",
    game_url: "https://www.playlostark.com",
  },
  {
    title: "Hearthstone",
    genre: "Card",
    tags: ["card", "fantasy", "turn-based", "2d", "strategy"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/4/thumbnail.jpg",
    short_description:
      "O dinâmico jogo de cartas colecionáveis da Blizzard ambientado no universo Warcraft.",
    developer: "Blizzard Entertainment",
    publisher: "Blizzard Entertainment",
    release_date: "2014-03-11",
    game_url: "https://playhearthstone.com",
  },
  {
    title: "World of Tanks",
    genre: "Shooter",
    tags: ["shooter", "military", "tank", "strategy", "pvp", "3d"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/5/thumbnail.jpg",
    short_description:
      "Comande tanques blindados históricos em confrontos multiplayer estratégicos de alta escala.",
    developer: "Wargaming",
    publisher: "Wargaming",
    release_date: "2011-04-12",
    game_url: "https://worldoftanks.com",
  },
  {
    title: "Trove",
    genre: "MMO",
    tags: ["mmo", "voxel", "sandbox", "adventure", "3d"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/13/thumbnail.jpg",
    short_description:
      "Um MMO de ação voxelizado com mundos infinitos, construção e muita exploração.",
    developer: "Gamigo",
    publisher: "Gamigo",
    release_date: "2015-07-09",
    game_url: "https://www.trionworlds.com/trove",
  },
  {
    title: "Guild Wars 2",
    genre: "MMORPG",
    tags: ["mmorpg", "mmo", "fantasy", "open-world", "pvp", "pve", "3d"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/14/thumbnail.jpg",
    short_description:
      "Um dos MMORPGs de fantasia mais aclamados do mercado, com foco em história e eventos vivos.",
    developer: "ArenaNet",
    publisher: "NCSOFT",
    release_date: "2012-08-28",
    game_url: "https://www.guildwars2.com",
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
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/19/thumbnail.jpg",
    short_description:
      "Um MMORPG sandbox de fantasia onde a economia é 100% controlada por jogadores.",
    developer: "Sandbox Interactive",
    publisher: "Sandbox Interactive",
    release_date: "2017-07-17",
    game_url: "https://albiononline.com",
  },
  {
    title: "Path of Exile",
    genre: "Action RPG",
    tags: ["action-rpg", "fantasy", "pve", "top-down", "mmo", "3d"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/12/thumbnail.jpg",
    short_description:
      "RPG de ação sombrio e complexo com árvore de habilidades massiva e customização infinita.",
    developer: "Grinding Gear Games",
    publisher: "Grinding Gear Games",
    release_date: "2013-10-23",
    game_url: "https://www.pathofexile.com",
  },
  {
    title: "Team Fortress 2",
    genre: "Shooter",
    tags: ["shooter", "first-person", "action", "pvp", "military", "3d"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/20/thumbnail.jpg",
    short_description:
      "O clássico shooter de classes da Valve que continua divertido e atual até hoje.",
    developer: "Valve",
    publisher: "Valve",
    release_date: "2007-10-10",
    game_url: "https://www.teamfortress.com",
  },
  {
    title: "RuneScape",
    genre: "MMORPG",
    tags: ["mmorpg", "fantasy", "open-world", "3d", "mmo"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/21/thumbnail.jpg",
    short_description:
      "Um MMORPG de fantasia de mundo aberto que marcou gerações com sua liberdade.",
    developer: "Jagex",
    publisher: "Jagex",
    release_date: "2001-01-04",
    game_url: "https://www.runescape.com",
  },
  {
    title: "Brawlhalla",
    genre: "Fighting",
    tags: ["fighting", "action", "pvp", "2d"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/23/thumbnail.jpg",
    short_description:
      "Um jogo de luta de plataforma 2D divertido e competitivo com dezenas de personagens lendários.",
    developer: "Blue Mammoth Games",
    publisher: "Ubisoft",
    release_date: "2017-10-17",
    game_url: "https://www.brawlhalla.com",
  },
  {
    title: "SMITE",
    genre: "MOBA",
    tags: ["moba", "third-person", "action", "pvp", "3d", "strategy"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/24/thumbnail.jpg",
    short_description:
      "Um MOBA de ação em terceira pessoa onde você controla deuses mitológicos em combate direto.",
    developer: "Hi-Rez Studios",
    publisher: "Hi-Rez Studios",
    release_date: "2014-03-25",
    game_url: "https://www.smitegame.com",
  },
  {
    title: "Paladins",
    genre: "Shooter",
    tags: ["shooter", "first-person", "fantasy", "pvp", "3d", "action"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/25/thumbnail.jpg",
    short_description:
      "Hero shooter baseado em equipes em um mundo de fantasia repleto de tecnologia e magia.",
    developer: "Evil Mojo Games",
    publisher: "Hi-Rez Studios",
    release_date: "2018-05-08",
    game_url: "https://www.paladins.com",
  },
  {
    title: "Slither.io",
    genre: "Arcade",
    tags: ["social", "2d", "action"],
    platform: "Web Browser",
    thumbnail: "https://www.freetogame.com/g/340/thumbnail.jpg",
    short_description:
      "Coma orbes brilhantes para crescer e eliminar as cobras rivais no seu navegador.",
    developer: "Lowtech Studios",
    publisher: "Lowtech Studios",
    release_date: "2016-03-25",
    game_url: "http://slither.io",
  },
  {
    title: "Agar.io",
    genre: "Arcade",
    tags: ["social", "2d", "action"],
    platform: "Web Browser",
    thumbnail: "https://www.freetogame.com/g/341/thumbnail.jpg",
    short_description:
      "O clássico jogo de navegador onde você cresce absorvendo células menores e foge das maiores.",
    developer: "Matheus Valadares",
    publisher: "Miniclip",
    release_date: "2015-04-28",
    game_url: "http://agar.io",
  },
  {
    title: "Town of Salem",
    genre: "Strategy",
    tags: ["social", "strategy", "turn-based", "2d"],
    platform: "Web Browser",
    thumbnail: "https://www.freetogame.com/g/343/thumbnail.jpg",
    short_description:
      "Um jogo de mentira, dedução e sobrevivência social focado em detectar traidores na vila.",
    developer: "BlankMediaGames",
    publisher: "BlankMediaGames",
    release_date: "2014-12-15",
    game_url: "https://www.blankmediagames.com",
  },
  {
    title: "Krunker.io",
    genre: "Shooter",
    tags: ["shooter", "first-person", "pixel", "3d", "action"],
    platform: "Web Browser",
    thumbnail: "https://www.freetogame.com/g/345/thumbnail.jpg",
    short_description:
      "Um shooter em primeira pessoa rápido com gráficos pixelizados em estilo bloco, direto no navegador.",
    developer: "Yendis Entertainment",
    publisher: "Yendis Entertainment",
    release_date: "2018-05-20",
    game_url: "https://krunker.io",
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
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/30/thumbnail.jpg",
    short_description:
      "Sobreviva ao apocalipse zumbi coletando recursos e construindo abrigos neste mundo voxelizado.",
    developer: "Smartly Gressed Games",
    publisher: "Smartly Gressed Games",
    release_date: "2017-07-07",
    game_url: "https://store.steampowered.com/app/304930/Unturned/",
  },
  {
    title: "Yu-Gi-Oh! Master Duel",
    genre: "Card",
    tags: ["card", "strategy", "anime", "turn-based", "2d"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/521/thumbnail.jpg",
    short_description:
      "Edição definitiva do jogo de cartas colecionáveis competitivo Yu-Gi-Oh, com milhares de cartas.",
    developer: "Konami Digital Entertainment",
    publisher: "Konami",
    release_date: "2022-01-19",
    game_url: "https://www.konami.com/yugioh/masterduel/",
  },
  {
    title: "Fallout Shelter",
    genre: "Strategy",
    tags: ["strategy", "survival", "2d"],
    platform: "PC (Windows)",
    thumbnail: "https://www.freetogame.com/g/269/thumbnail.jpg",
    short_description:
      "Administre um abrigo nuclear subterrâneo subterrâneo Vault-Tec de última geração.",
    developer: "Bethesda Game Studios",
    publisher: "Bethesda Softworks",
    release_date: "2015-06-14",
    game_url: "https://store.steampowered.com/app/588430/Fallout_Shelter/",
  },
  {
    title: "Minecraft",
    genre: "Sandbox",
    tags: ["sandbox", "survival", "3d"],
    platform: "PC (Windows), PlayStation, Xbox, Switch",
    thumbnail:
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=600&auto=format&fit=crop",
    short_description:
      "Explore mundos infinitos e construa de tudo, desde a mais simples das casas até o mais grandioso dos castelos.",
    developer: "Mojang Studios",
    release_date: "2011-11-18",
    game_url: "https://www.minecraft.net",
    price: "paid",
    worth: "$29.99",
  },
  {
    title: "Elden Ring",
    genre: "Action RPG",
    tags: ["action-rpg", "open-world", "fantasy", "3d", "action"],
    platform: "PC (Windows), PlayStation, Xbox",
    thumbnail:
      "https://images.unsplash.com/photo-1655821888788-6107699e173b?q=80&w=600&auto=format&fit=crop",
    short_description:
      "Um RPG de ação de fantasia sombria em um vasto mundo aberto criado por Hidetaka Miyazaki e George R. R. Martin.",
    developer: "FromSoftware",
    release_date: "2022-02-25",
    game_url: "https://www.eldenring.com",
    price: "paid",
    worth: "$59.99",
  },
  {
    title: "Cyberpunk 2077",
    genre: "RPG",
    tags: ["sci-fi", "open-world", "action", "first-person", "3d"],
    platform: "PC (Windows), PlayStation, Xbox",
    thumbnail:
      "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=600&auto=format&fit=crop",
    short_description:
      "RPG de ação e aventura em mundo aberto ambientado em Night City, uma megalópole obcecada por poder e modificações corporais.",
    developer: "CD Projekt Red",
    release_date: "2020-12-10",
    game_url: "https://www.cyberpunk.net",
    price: "paid",
    worth: "$59.99",
  },
  {
    title: "Grand Theft Auto V",
    genre: "Action",
    tags: ["open-world", "action", "3d", "pvp"],
    platform: "PC (Windows), PlayStation, Xbox",
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    short_description:
      "Um ladrão de rua, um ladrão de bancos aposentado e um psicopata aterrorizante se envolvem com o submundo do crime.",
    developer: "Rockstar North",
    release_date: "2013-09-17",
    game_url: "https://www.rockstargames.com/gta-v",
    price: "paid",
    worth: "$29.99",
  },
  {
    title: "Red Dead Redemption 2",
    genre: "Action",
    tags: ["open-world", "action", "survival", "3d"],
    platform: "PC (Windows), PlayStation, Xbox",
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    short_description:
      "Uma história épica sobre a vida e a sobrevivência no implacável coração dos Estados Unidos no fim do século XIX.",
    developer: "Rockstar Games",
    release_date: "2018-10-26",
    game_url: "https://www.rockstargames.com/reddeadredemption2",
    price: "paid",
    worth: "$59.99",
  },
];

// Configurações Globais do Gráfico do Chart.js
Chart.defaults.color = "#a39eb2";
Chart.defaults.font.family = "'Inter', sans-serif";

let allGamesData = [];
let filteredGamesData = [];

// Estados da paginação e filtros
let currentPage = 1;
const itemsPerPage = 10;

// Elementos do DOM
const totalGamesEl = document.getElementById("stat-total-games");
const pcGamesEl = document.getElementById("stat-pc-games");
const browserGamesEl = document.getElementById("stat-browser-games");
const topGenreEl = document.getElementById("stat-top-genre");

const tableBody = document.getElementById("games-table-body");
const searchInput = document.getElementById("table-search");
const genreFilter = document.getElementById("table-genre-filter");
const platformFilter = document.getElementById("table-platform-filter");
const priceFilter = document.getElementById("table-price-filter");

const paginationInfo = document.getElementById("pagination-info");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

// Referências de Gráficos instanciados
let genresChartInstance = null;
let platformsChartInstance = null;

// Inicialização
window.addEventListener("DOMContentLoaded", () => {
  initDashboard();
});

async function initDashboard() {
  try {
    const res = await fetch("./data/games.json");
    if (!res.ok) throw new Error("Erro ao buscar base estática games.json");

    const data = await res.json();
    allGamesData = Array.isArray(data) ? data : Object.values(data);
    console.log(
      "Sucesso ao obter jogos da base estática para o dashboard:",
      allGamesData.length,
    );
    renderDashboard(allGamesData);
  } catch (error) {
    console.warn(
      "Falha ao carregar banco de dados estático. Usando fallback offline no dashboard...",
      error,
    );
    allGamesData = [...FALLBACK_GAMES];
    renderDashboard(allGamesData);
  }
}

function renderDashboard(games) {
  filteredGamesData = [...games];

  // 1. Calcular Estatísticas Rápidas (KPIs)
  calculateKPIs(games);

  // 2. Montar Gráficos
  setupCharts(games);

  // 3. Carregar Filtros do Dropdown de Gênero dinamicamente
  populateGenreFilter(games);

  // 4. Configurar Eventos da Tabela
  setupTableEvents();

  // 5. Renderizar Tabela Inicial
  currentPage = 1;
  renderTable();
}

function calculateKPIs(games) {
  totalGamesEl.textContent = games.length;

  let pcCount = 0;
  let browserCount = 0;
  let genreCounts = {};

  games.forEach((g) => {
    // Conta plataformas
    const platform = (g.platform || "").toLowerCase();
    if (
      platform.includes("playstation") ||
      platform.includes("ps4") ||
      platform.includes("ps5") ||
      platform.includes("xbox") ||
      platform.includes("switch") ||
      platform.includes("nintendo")
    ) {
      // Consoles não incrementam PC ou Browser dos KPIs principais
    } else if (platform.includes("pc") || platform.includes("windows")) {
      pcCount++;
    } else if (
      platform.includes("browser") ||
      platform.includes("web") ||
      platform.includes("navegador")
    ) {
      browserCount++;
    } else {
      pcCount++;
    }

    // Conta gêneros
    const genre = g.genre || "Gamer";
    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
  });

  pcGamesEl.textContent = pcCount;
  browserGamesEl.textContent = browserCount;

  // Encontra gênero mais popular
  let topGenre = "Nenhum";
  let maxCount = 0;
  for (let g in genreCounts) {
    if (genreCounts[g] > maxCount) {
      maxCount = genreCounts[g];
      topGenre = g;
    }
  }
  topGenreEl.textContent = topGenre;
}

function setupCharts(games) {
  // Destruir gráficos se existirem (para re-renderizações seguras)
  if (genresChartInstance) genresChartInstance.destroy();
  if (platformsChartInstance) platformsChartInstance.destroy();

  // Proporção de Plataformas
  let pcCount = 0;
  let browserCount = 0;
  let playstationCount = 0;
  let xboxCount = 0;
  let switchCount = 0;
  let genreCounts = {};

  games.forEach((g) => {
    const platform = (g.platform || "").toLowerCase();
    if (
      platform.includes("playstation") ||
      platform.includes("ps4") ||
      platform.includes("ps5")
    ) {
      playstationCount++;
    } else if (platform.includes("xbox")) {
      xboxCount++;
    } else if (platform.includes("switch") || platform.includes("nintendo")) {
      switchCount++;
    } else if (
      platform.includes("browser") ||
      platform.includes("web") ||
      platform.includes("navegador")
    ) {
      browserCount++;
    } else {
      pcCount++;
    }

    const genre = g.genre || "Gamer";
    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
  });

  // Gêneros Top 6
  let genresSorted = Object.keys(genreCounts)
    .map((key) => {
      return { name: key, count: genreCounts[key] };
    })
    .sort((a, b) => b.count - a.count);

  const topGenres = genresSorted.slice(0, 6);
  const otherGenresCount = genresSorted
    .slice(6)
    .reduce((acc, curr) => acc + curr.count, 0);

  if (otherGenresCount > 0) {
    topGenres.push({ name: "Outros", count: otherGenresCount });
  }

  // Cores Neon Cyberpunk 2026
  const colors = {
    purple: "rgba(182, 92, 251, 0.65)",
    purpleBorder: "#b65cfb",
    cyan: "rgba(51, 214, 255, 0.65)",
    cyanBorder: "#33d6ff",
    pink: "rgba(255, 94, 151, 0.65)",
    pinkBorder: "#ff5e97",
    green: "rgba(0, 242, 254, 0.65)",
    greenBorder: "#00f2fe",
    amber: "rgba(255, 179, 64, 0.65)",
    amberBorder: "#ffb340",
    blue: "rgba(59, 130, 246, 0.65)",
    blueBorder: "#3b82f6",
    gray: "rgba(163, 158, 178, 0.4)",
    grayBorder: "#a39eb2",

    // Consoles Brand Colors
    psBlue: "rgba(0, 112, 204, 0.65)",
    psBlueBorder: "#0070cc",
    xboxGreen: "rgba(16, 124, 16, 0.65)",
    xboxGreenBorder: "#107c10",
    switchRed: "rgba(228, 0, 15, 0.65)",
    switchRedBorder: "#e4000f",
  };

  // 1. Gráfico de Gêneros (Barra Horizontal)
  const ctxGenres = document.getElementById("genresChart").getContext("2d");
  genresChartInstance = new Chart(ctxGenres, {
    type: "bar",
    data: {
      labels: topGenres.map((g) => g.name),
      datasets: [
        {
          label: "Quantidade de Jogos",
          data: topGenres.map((g) => g.count),
          backgroundColor: [
            colors.purple,
            colors.cyan,
            colors.pink,
            colors.green,
            colors.amber,
            colors.blue,
            colors.gray,
          ],
          borderColor: [
            colors.purpleBorder,
            colors.cyanBorder,
            colors.pinkBorder,
            colors.greenBorder,
            colors.amberBorder,
            colors.blueBorder,
            colors.grayBorder,
          ],
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { color: "rgba(255, 255, 255, 0.04)" },
          ticks: { color: "#a39eb2" },
        },
        y: {
          grid: { display: false },
          ticks: { color: "#fff", font: { weight: "600" } },
        },
      },
    },
  });

  // 2. Gráfico de Plataformas (Doughnut/Rosca)
  const ctxPlatforms = document
    .getElementById("platformsChart")
    .getContext("2d");

  const rawLabels = [
    "PC Windows",
    "Navegador Web",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
  ];
  const rawData = [
    pcCount,
    browserCount,
    playstationCount,
    xboxCount,
    switchCount,
  ];
  const rawBgColors = [
    colors.purple,
    colors.cyan,
    colors.psBlue,
    colors.xboxGreen,
    colors.switchRed,
  ];
  const rawBorderColors = [
    colors.purpleBorder,
    colors.cyanBorder,
    colors.psBlueBorder,
    colors.xboxGreenBorder,
    colors.switchRedBorder,
  ];

  // Filtra apenas plataformas que têm jogos ativos na base para manter o gráfico limpo
  const activeIndices = rawData
    .map((val, idx) => (val > 0 ? idx : -1))
    .filter((idx) => idx !== -1);

  const finalLabels = activeIndices.map((idx) => rawLabels[idx]);
  const finalData = activeIndices.map((idx) => rawData[idx]);
  const finalBgColors = activeIndices.map((idx) => rawBgColors[idx]);
  const finalBorderColors = activeIndices.map((idx) => rawBorderColors[idx]);

  platformsChartInstance = new Chart(ctxPlatforms, {
    type: "doughnut",
    data: {
      labels: finalLabels,
      datasets: [
        {
          data: finalData,
          backgroundColor: finalBgColors,
          borderColor: finalBorderColors,
          borderWidth: 2,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 12,
            color: "#fff",
            font: { size: 11, weight: "500" },
          },
        },
      },
      cutout: "65%",
    },
  });
}

function populateGenreFilter(games) {
  const genresSet = new Set();
  games.forEach((g) => {
    if (g.genre) genresSet.add(g.genre);
  });

  // Limpa opções antigas exceto a primeira
  genreFilter.innerHTML = '<option value="">-- Todos os Gêneros --</option>';

  const sortedGenres = Array.from(genresSet).sort();
  sortedGenres.forEach((genre) => {
    const opt = document.createElement("option");
    opt.value = genre;
    opt.textContent = genre;
    genreFilter.appendChild(opt);
  });
}

function setupTableEvents() {
  // Filtro de Busca Digitação (Keyup reativo)
  searchInput.addEventListener("input", () => {
    filterData();
  });

  // Filtro de Gênero
  genreFilter.addEventListener("change", () => {
    filterData();
  });

  // Filtro de Plataforma (Agora instantâneo e local via base estática)
  platformFilter.addEventListener("change", () => {
    filterData();
  });

  // Filtro de Preço
  priceFilter.addEventListener("change", () => {
    filterData();
  });

  // Botões de Paginação
  btnPrev.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  });

  btnNext.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredGamesData.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
    }
  });
}

// Filtra a base de dados em tempo real com base nos filtros
function filterData() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedGenre = genreFilter.value;
  const selectedPlatform = platformFilter.value;
  const selectedPrice = priceFilter.value;

  filteredGamesData = allGamesData.filter((game) => {
    // Filtro por Nome
    const title = (game.title || game.name || "").toLowerCase();
    if (query && !title.includes(query)) return false;

    // Filtro por Gênero
    if (selectedGenre && game.genre !== selectedGenre) return false;

    // Filtro por Preço
    if (selectedPrice) {
      const isPaidGame =
        game.price === "paid" ||
        (game.worth && game.worth !== "N/A" && game.worth !== "$0.00");
      if (selectedPrice === "paid" && !isPaidGame) return false;
      if (selectedPrice === "free" && isPaidGame) return false;
    }

    // Filtro por Plataforma
    if (selectedPlatform) {
      const platform = (game.platform || "").toLowerCase();
      if (
        selectedPlatform === "pc" &&
        !platform.includes("pc") &&
        !platform.includes("windows")
      ) {
        return false;
      }
      if (
        selectedPlatform === "browser" &&
        !platform.includes("browser") &&
        !platform.includes("web") &&
        !platform.includes("navegador")
      ) {
        return false;
      }
      if (
        selectedPlatform === "playstation" &&
        !platform.includes("playstation") &&
        !platform.includes("ps4") &&
        !platform.includes("ps5")
      ) {
        return false;
      }
      if (selectedPlatform === "xbox" && !platform.includes("xbox")) {
        return false;
      }
      if (
        selectedPlatform === "switch" &&
        !platform.includes("switch") &&
        !platform.includes("nintendo")
      ) {
        return false;
      }
    }

    return true;
  });

  currentPage = 1;
  renderTable();
}

function renderTable() {
  tableBody.innerHTML = "";

  const totalItems = filteredGamesData.length;

  if (totalItems === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 40px; color: var(--text-muted);">
          Nenhum jogo encontrado com os filtros selecionados.
        </td>
      </tr>
    `;
    updatePaginationControls(0, 0, 0);
    return;
  }

  // Calcula fatias de paginação
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedItems = filteredGamesData.slice(startIndex, endIndex);

  paginatedItems.forEach((game) => {
    const tr = document.createElement("tr");

    // Imagem Miniatura
    const tdThumb = document.createElement("td");
    const img = document.createElement("img");
    img.className = "game-table-thumb";
    img.src = game.thumbnail;
    img.alt = game.title || game.name;
    img.onerror = () => {
      img.src =
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=100&auto=format&fit=crop";
    };
    tdThumb.appendChild(img);
    tr.appendChild(tdThumb);

    // Título
    const tdTitle = document.createElement("td");
    tdTitle.innerHTML = `<strong>${game.title || game.name}</strong>`;
    tr.appendChild(tdTitle);

    // Gênero Badge
    const tdGenre = document.createElement("td");
    const genreTag = document.createElement("span");
    genreTag.className = "table-genre-tag";
    genreTag.textContent = game.genre || "Gamer";
    tdGenre.appendChild(genreTag);
    tr.appendChild(tdGenre);

    // Plataforma
    const tdPlatform = document.createElement("td");
    const isBrowser =
      (game.platform && game.platform.toLowerCase().includes("browser")) ||
      (game.platform && game.platform.toLowerCase().includes("web")) ||
      game.platform === "browser";

    let platformText = isBrowser ? "Navegador Web" : "PC Windows";
    const platLower = (game.platform || "").toLowerCase();
    if (platLower.includes("playstation")) {
      platformText = "PlayStation";
    } else if (platLower.includes("xbox")) {
      platformText = "Xbox";
    } else if (platLower.includes("switch") || platLower.includes("nintendo")) {
      platformText = "Nintendo Switch";
    }
    tdPlatform.textContent = platformText;
    tr.appendChild(tdPlatform);

    // Preço
    const tdPrice = document.createElement("td");
    const isPaid =
      game.price === "paid" ||
      (game.worth && game.worth !== "N/A" && game.worth !== "$0.00");
    const priceText = isPaid
      ? game.worth && game.worth !== "N/A"
        ? game.worth
        : "Pago"
      : "Grátis";

    const priceTag = document.createElement("span");
    priceTag.className = isPaid
      ? "table-price-tag price-paid"
      : "table-price-tag price-free";
    priceTag.textContent = priceText;
    tdPrice.appendChild(priceTag);
    tr.appendChild(tdPrice);

    // Desenvolvedor
    const tdDev = document.createElement("td");
    tdDev.textContent = game.developer || "Não Informado";
    tr.appendChild(tdDev);

    // Lançamento
    const tdRelease = document.createElement("td");
    tdRelease.textContent = game.release_date || "N/A";
    tr.appendChild(tdRelease);

    // Link de Ação (Jogar / Resgatar)
    const tdAction = document.createElement("td");
    tdAction.style.textAlign = "center";
    const playUrl =
      game.game_url ||
      game.open_giveaway_url ||
      game.freetogame_profile_url ||
      "https://www.gamerpower.com";

    let actionLabel = "Jogar";
    if (isPaid) {
      actionLabel = game.open_giveaway_url ? "Resgatar" : "Comprar";
    }

    const playLink = document.createElement("a");
    playLink.className = "btn-table-action";
    playLink.href = playUrl;
    playLink.target = "_blank";
    playLink.rel = "noopener noreferrer";
    playLink.innerHTML = `
      <span>${actionLabel}</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
    `;
    tdAction.appendChild(playLink);
    tr.appendChild(tdAction);

    tableBody.appendChild(tr);
  });

  updatePaginationControls(startIndex + 1, endIndex, totalItems);
}

function updatePaginationControls(start, end, total) {
  paginationInfo.textContent = `Mostrando ${start}-${end} de ${total} jogos`;

  const totalPages = Math.ceil(total / itemsPerPage);

  // Habilita ou desabilita botões
  btnPrev.disabled = currentPage === 1 || totalPages <= 1;
  btnNext.disabled = currentPage === totalPages || totalPages <= 1;
}
