var listaTipoJogos = [
  "mmorpg",
  "shooter",
  "strategy",
  "moba",
  "racing",
  "sports",
  "social",
  "sandbox",
  "open-world",
  "survival",
  "pvp",
  "pve",
  "pixel",
  "voxel",
  "zombie",
  "turn-based",
  "first-person",
  "third-person",
  "top-down",
  "tank",
  "space",
  "sailing",
  "side-scroller",
  "superhero",
  "permadeath",
  "card",
  "battle-royale",
  "mmo",
  "mmofps",
  "mmotps",
  "3d",
  "2d",
  "anime",
  "fantasy",
  "sci-fi",
  "fighting",
  "action-rpg",
  "action",
  "military",
  "martial-arts",
  "flight",
  "low-spec",
  "tower-defense",
  "horror",
  "mmorts",
];

const container1 = document.getElementById("container-1");

function callCheckBox(array) {
  if (!container1) return;
  container1.innerHTML = ""; // Limpa o container

  array.forEach((tag, idx) => {
    // Wrapper para o chip de checkbox
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "chip-wrapper");

    // Input de checkbox real (oculto visualmente)
    const box = document.createElement("input");
    box.setAttribute("class", "checkbox-input");
    box.setAttribute("id", "checkbox-" + (idx + 1));
    box.type = "checkbox";
    box.value = tag;

    // Label estilizada
    const labelbox = document.createElement("label");
    labelbox.setAttribute("class", "chip-label");
    labelbox.setAttribute("id", "labelbox-" + (idx + 1));
    labelbox.htmlFor = "checkbox-" + (idx + 1);

    // Formatação amigável do texto da tag (ex: action-rpg -> Action RPG)
    let formattedText = tag
      .split("-")
      .map((word) => {
        const uppercaseWords = [
          "rpg",
          "mmo",
          "fps",
          "tps",
          "rts",
          "pvp",
          "pve",
          "3d",
          "2d",
        ];
        if (uppercaseWords.includes(word.toLowerCase())) {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");

    labelbox.textContent = formattedText;

    // Aninha os elementos
    wrapper.appendChild(box);
    wrapper.appendChild(labelbox);
    container1.appendChild(wrapper);
  });
}

// Inicializa a criação de todos os chips em formato de grid
callCheckBox(listaTipoJogos);
