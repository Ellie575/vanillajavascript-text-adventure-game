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
  return true;
}

function selectOption(option) {}

const textNodes = [
  {
    id: 1,
    text: "You wake up in a strange place and see a jar of pink goo near you.",
    options: [
      {
        text: "Take the goo",
        setState: { pinkGoo: true },
        nextState: 2,
      },
      {
        text: "Leave the goo",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
  },
];

startGame();
