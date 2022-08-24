const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: "You wake up in a strange place and see a jar of pink goo near you.",
    options: [
      {
        text: "Take the goo",
        setState: { pinkGoo: true },
        nextText: 2,
      },
      {
        text: "Leave the goo",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text: "You venture forth in search of answers and you come across a merchant.",
    options: [
      {
        text: "Trade the goo for fairy dust",
        requiredState: (currentState) => currentState.pinkGoo,
        setState: { pinkGoo: false, fairyDust: true },
        nextText: 3,
      },
      {
        text: "Trade the goo for a magic wand",
        requiredState: (currentState) => currentState.pinkGoo,
        setState: { pinkGoo: false, magicWand: true },
        nextText: 3,
      },
      {
        text: "Ignore the merchant.",
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text: "After seeing the merchant you feel tired and you stumble across a castle which looks like it's out of a fairytale.",
    options: [
      {
        text: "Explore the castle",
        nextText: 4,
      },
      {
        text: "Knock on the gates",
        nextText: 5,
      },
      {
        text: "Find a hay stack to sleep on",
        nextText: 6,
      },
    ],
  },
  {
    id: 4,
    text: "You are tired when you're inside the castle and the fairy Queen finds you asleep in the Hallway. She turns you into a frog for tresspassing the castle.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 5,
    text: "The fairy Queen welcomes you into her castle and gives you food to eat and a bed to rest in.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 6,
    text: "The castle servants finds you on the haystack and takes you into their quarters for food and rest until you are able to journey forth.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
];

startGame();
