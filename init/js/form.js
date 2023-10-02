function blockDisabled(selBlock) {
  const block = document.querySelector("." + selBlock);
  block.classList.toggle(selBlock + "--disabled");

  if (block.classList.contains(selBlock + "--disabled")) {
    addDisabled(block, selBlock + " > *", true);
  } else {
    addDisabled(block, selBlock + " > *", false);
  }
}

function addDisabled(block, teg, flag) {
  const elements = block.querySelectorAll("." + teg);
  for (let element of elements) {
    element.disabled = flag;
  }
}

function activeTogler() {
  blockDisabled("ad-form");
  blockDisabled("map__filters");
}

export { activeTogler };
