// Banque d'images/emojis par catégorie
const banqueImages = {
  animaux: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐸",
    "🦁",
    "🐧",
  ],
  fleurs: [
    "🌹",
    "🌻",
    "🌷",
    "🌸",
    "🌺",
    "🌼",
    "🌿",
    "🍀",
    "🌾",
    "🌱",
    "🌵",
    "🌴",
  ],
  legumes: [
    "🥕",
    "🥦",
    "🍅",
    "🥒",
    "🌽",
    "🥔",
    "🧅",
    "🥬",
    "🍆",
    "🧄",
    "🥑",
    "🌶️",
  ],
  fruits: [
    "🍎",
    "🍐",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🥭",
    "🍍",
    "🍒",
    "🍑",
  ],
  vetements: [
    "👕",
    "👖",
    "🧥",
    "👗",
    "👔",
    "🧦",
    "👟",
    "🧢",
    "🧣",
    "🧤",
    "👘",
    "🥿",
  ],
  fournitures: [
    "📚",
    "✏️",
    "📏",
    "📐",
    "📒",
    "📓",
    "📖",
    "📌",
    "✂️",
    "🖍️",
    "📎",
    "📝",
  ],
  metiers: ["👮🏻‍♀️", "👩🏻‍⚕️", "👷🏻‍♀️", "👩🏻‍🍳", "👩🏻‍🎓", "👩🏻‍🎤", "👩🏻‍💻", "👩🏼‍🏫", "👩🏻‍🎨", "👩🏻‍🚒", "👩🏻‍🚀"],
  imoujis: ["😂", "😭", "😡", "🥶", "😵‍💫", "😴", "🥱", "🤢", "😎", "😍", "🥳"],
  transport: [
    "🚗",
    "🚌",
    "🏎️",
    "🚓",
    "🚑",
    "🚜",
    "🚲",
    "✈️",
    "🚢",
    "🚁",
    "🚂",
    "🚀",
  ],
  sport: [
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🎾",
    "🏐",
    "🏉",
    "🎱",
    "🏓",
    "🏸",
    "🥊",
    "⛳",
  ],
  couleurs: ["🩷", "🧡", "💛", "💜", "🩵", "🖤", "🩶", "🤍", "🤎", "❤️", "💙"],
  nombres: [
    "1️⃣",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
    "🔟",
    "0️⃣",
    "#️⃣",
  ],
  alimentations: [
    "🍕",
    "🍔",
    "🌭",
    "🥪",
    "🍟",
    "🍜",
    "🍣",
    "🥗",
    "🥙",
    "🧋",
    "☕",
    "🍦",
  ],
  technologie: [
    "💻",
    "📱",
    "🖥️",
    "⌨️",
    "🖱️",
    "🖨️",
    "📷",
    "🎥",
    "📡",
    "☎️",
    "⏰",
    "🎮",
  ],
};

let cartes = [];
let cartesRetournees = [];
let cartesTrouvees = [];
let tentatives = 0;
let verrouillage = false;
let categorieActuelle = "animaux";

// Initialisation du jeu
function initGame() {
  const imagesCategorie = banqueImages[categorieActuelle];
  const imagesSelectionnees = imagesCategorie.slice(0, 8);

  cartes = [...imagesSelectionnees, ...imagesSelectionnees];
  cartes = melanger(cartes);

  cartesRetournees = [];
  cartesTrouvees = [];
  tentatives = 0;
  verrouillage = false;

  document.getElementById("paires").textContent = "0";
  document.getElementById("tentatives").textContent = "0";
  document.getElementById("categorie-active").textContent =
    getNomCategorie(categorieActuelle);

  afficherCartes();
}

// Obtenir le nom français de la catégorie
function getNomCategorie(categorie) {
  const noms = {
    imoujis: "Imoujis",
    animaux: "Animaux",
    fleurs: "Fleurs",
    legumes: "Légumes",
    fruits: "Fruits",
    vetements: "Vêtements",
    fournitures: "Fournitures",
    metiers: "Métiers",
    transport: "Transport",
    sport: "Sport",
    couleurs: "Couleurs",
    nombres: "Nombres",
    alimentations: "Alimentations",
    technologie: "Technologie",
  };
  return noms[categorie];
}

// Mélanger les cartes
function melanger(tableau) {
  for (let i = tableau.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tableau[i], tableau[j]] = [tableau[j], tableau[i]];
  }
  return tableau;
}

// Afficher les cartes
function afficherCartes() {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";

  cartes.forEach((emoji, index) => {
    const carte = document.createElement("div");
    carte.className = "card";
    carte.dataset.index = index;
    carte.dataset.emoji = emoji;

    if (cartesTrouvees.includes(index)) {
      carte.classList.add("matched");
      carte.textContent = emoji;
    }

    carte.addEventListener("click", () => retournerCarte(index));
    gameBoard.appendChild(carte);
  });
}

// Retourner une carte
function retournerCarte(index) {
  if (
    verrouillage ||
    cartesTrouvees.includes(index) ||
    cartesRetournees.includes(index) ||
    cartesRetournees.length >= 2
  ) {
    return;
  }

  cartesRetournees.push(index);

  const carte = document.querySelector(`[data-index="${index}"]`);
  carte.textContent = cartes[index];
  carte.classList.add("flipped");

  if (cartesRetournees.length === 2) {
    tentatives++;
    document.getElementById("tentatives").textContent = tentatives;
    verrouillage = true;
    verifierCorrespondance();
  }
}

// Vérifier la correspondance
function verifierCorrespondance() {
  const [index1, index2] = cartesRetournees;
  const carte1 = document.querySelector(`[data-index="${index1}"]`);
  const carte2 = document.querySelector(`[data-index="${index2}"]`);

  if (cartes[index1] === cartes[index2]) {
    cartesTrouvees.push(index1, index2);
    document.getElementById("paires").textContent = cartesTrouvees.length / 2;

    carte1.classList.remove("flipped");
    carte2.classList.remove("flipped");
    carte1.classList.add("matched");
    carte2.classList.add("matched");

    cartesRetournees = [];
    verrouillage = false;

    if (cartesTrouvees.length === cartes.length) {
      setTimeout(() => {
        alert(
          `🎉 BRAVO ! Tu as trouvé toutes les paires en ${tentatives} tentatives ! 🎉\nTu es un champion ! 🌟`,
        );
      }, 500);
    }
  } else {
    setTimeout(() => {
      carte1.textContent = "";
      carte2.textContent = "";
      carte1.classList.remove("flipped");
      carte2.classList.remove("flipped");
      cartesRetournees = [];
      verrouillage = false;
    }, 1000);
  }
}

// Changer de catégorie
function changerCategorie(categorie) {
  categorieActuelle = categorie;

  document.querySelectorAll(".categorie-item").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  initGame();

  // Fermer la barre et réafficher le bouton menu
  document.getElementById("sidebar").classList.remove("open");
  document.querySelector(".menu-toggle").style.display = "block";
}

// Changer la couleur du jeu
function changerCouleur(couleur1, couleur2) {
  document.body.style.background = `linear-gradient(135deg, ${couleur1} 0%, ${couleur2} 100%)`;

  // Fermer la barre et réafficher le bouton menu
  document.getElementById("sidebar").classList.remove("open");
  document.querySelector(".menu-toggle").style.display = "block";
}
// Fermer la barre si on clique en dehors
document.addEventListener("click", function (event) {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.querySelector(".menu-toggle");

  if (
    !sidebar.contains(event.target) &&
    !menuToggle.contains(event.target) &&
    sidebar.classList.contains("open")
  ) {
    sidebar.classList.remove("open");
    menuToggle.style.display = "block"; // Réaffiche le bouton
  }
});

// Ouvrir/fermer la barre latérale
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.querySelector(".menu-toggle");

  sidebar.classList.toggle("open");

  // Cache ou montre le bouton menu selon l'état de la sidebar
  if (sidebar.classList.contains("open")) {
    menuToggle.style.display = "none"; // Cache le bouton
  } else {
    menuToggle.style.display = "block"; // Montre le bouton
  }
}

// Réinitialiser le jeu
function resetGame() {
  initGame();
}

// Démarrer le jeu
window.onload = function () {
  initGame();
  // Couleur par défaut
  document.body.style.background =
    "linear-gradient(135deg, #c080cd 0%, #B5EAD7 100%)";
};

// Fermer la barre latérale si on clique ailleurs
document.addEventListener("click", function (event) {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.querySelector(".menu-toggle");

  if (
    !sidebar.contains(event.target) &&
    !menuToggle.contains(event.target) &&
    sidebar.classList.contains("open")
  ) {
    sidebar.classList.remove("open");
  }
});
// Fonction pour afficher la popup de victoire
function afficherPopupVictoire() {
  const popup = document.getElementById("popupVictoire");
  const message = document.getElementById("popupMessage");
  const stats = document.getElementById("popupStats");

  // Messages personnalisés selon le nombre de tentatives
  let felicitation = "";
  if (tentatives <= 10) {
    felicitation = "GÉNIE ! 🧠✨";
  } else if (tentatives <= 15) {
    felicitation = "CHAMPION ! 🏆";
  } else if (tentatives <= 20) {
    felicitation = "SUPER ! 🌟";
  } else {
    felicitation = "BRAVO ! 🎉";
  }

  message.textContent = felicitation;
  stats.textContent = `🎯 ${tentatives} tentatives • 🧩 8 paires`;

  // Ajouter la classe show pour afficher la popup
  popup.classList.add("show");

  // Créer des confettis (optionnel)
  creerConfettis();
}

// Fonction pour fermer la popup
function fermerPopup() {
  document.getElementById("popupVictoire").classList.remove("show");
}

// Fonction pour créer des confettis (optionnel)
function creerConfettis() {
  const popup = document.querySelector(".popup-content");
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDelay = Math.random() * 2 + "s";
    popup.appendChild(confetti);

    // Supprimer les confettis après l'animation
    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

// MODIFIEZ la fonction verifierCorrespondance() - Remplacez la partie "if (cartesTrouvees.length === cartes.length)"
// Par ce code :

// Vérifier la correspondance
function verifierCorrespondance() {
  const [index1, index2] = cartesRetournees;
  const carte1 = document.querySelector(`[data-index="${index1}"]`);
  const carte2 = document.querySelector(`[data-index="${index2}"]`);

  if (cartes[index1] === cartes[index2]) {
    cartesTrouvees.push(index1, index2);
    document.getElementById("paires").textContent = cartesTrouvees.length / 2;

    carte1.classList.remove("flipped");
    carte2.classList.remove("flipped");
    carte1.classList.add("matched");
    carte2.classList.add("matched");

    cartesRetournees = [];
    verrouillage = false;

    // ✅ MODIFICATION ICI : Afficher la popup au lieu de l'alert
    if (cartesTrouvees.length === cartes.length) {
      setTimeout(() => {
        afficherPopupVictoire(); // Appel de la popup personnalisée
      }, 500);
    }
  } else {
    setTimeout(() => {
      carte1.textContent = "";
      carte2.textContent = "";
      carte1.classList.remove("flipped");
      carte2.classList.remove("flipped");
      cartesRetournees = [];
      verrouillage = false;
    }, 1000);
  }
}

// Optionnel : fermer la popup en cliquant sur l'overlay
document.addEventListener("click", function (event) {
  const popup = document.getElementById("popupVictoire");
  if (event.target === popup) {
    fermerPopup();
  }
});
