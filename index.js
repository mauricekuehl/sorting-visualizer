import * as render from "./modules/render.js";
import { bblSort } from "./algorithm/bblsort.js";
import { mergeSort } from "./algorithm/mergesort.js";
import { quickSort } from "./algorithm/quicksort.js";
import { radixSort } from "./algorithm/radixsort.js";
import { heapSort } from "./algorithm/heapsort.js";
import { shellSort } from "./algorithm/shellsort.js";
import { codeScript } from "./modules/codeScript.js";
import { insertionSort } from "./algorithm/insertionsort.js";
import { CodeJar } from "./modules/codejar.js";

const jar = new CodeJar(document.querySelector(".editor"), (editor) => {
  editor.textContent = editor.textContent;
  hljs.highlightBlock(editor);
});
jar.updateCode(codeScript.coustomsort);
const defaultColor = "rgba(255, 255, 255, 0.75)";
const highlightColor = "#ff0000";
let array = [];
let isrunning = false;
let ispaused = false;
let arrHeight = Math.round(document.body.clientHeight * 0.8);
document.querySelector("#sliderSize").value = document.body.clientWidth / 3;
resize();
selectAlgoChange();
generateArr();

async function runAnimations(arr, speedX) {
  let count = 0;
  let value;
  let delay;
  for (let elm in arr) {
    while (ispaused) {
      await sleep(100);
    }
    if (isrunning) {
      if (arr[elm][0] === "r") {
        document.querySelector(
          `[data-pos='${arr[elm][1]}']`
        ).style.backgroundColor = defaultColor;
      } else if (arr[elm][0] === "c") {
        document.querySelector(
          `[data-pos='${arr[elm][1]}']`
        ).style.backgroundColor = highlightColor;
      } else {
        if (document.querySelector("#sliderSpeed").value !== value) {
          value = document.querySelector("#sliderSpeed").value;
          delay = Math.pow(value, 2) * 0.001;
        }
        if (delay >= 4) {
          await sleep(delay);
        } else if (count % Math.round(4 / delay) === 0) {
          await sleep(4);
        }
        count++;
        if (arr[elm][0] === "s") {
          render.swap(arr[elm][1], arr[elm][2]);
        } else {
          render.pos(arr[elm][1], arr[elm][2]);
        }
      }
    }
  }
  isrunning = false;
  ispaused = false;
}
function generateArr() {
  let length = document.querySelector("#sliderSize").value;
  let random = document.querySelector("#random").checked;
  array = [];
  if (random) {
    for (let i = 0; i < length; i++) {
      array.push(Math.floor(Math.random() * arrHeight));
    }
  } else {
    let linearArr = [];
    for (let i = 0; i < length; i++) {
      linearArr.push(Math.floor(i * (arrHeight / length)));
    }
    for (let i = 0; i < length; i++) {
      let rannum = Math.floor(Math.random() * linearArr.length);
      array.push(linearArr[rannum]);
      linearArr.splice(rannum, 1);
    }
  }
  render.all(array);
  resize();
}
const isSorted = () => {
  let lastHeight = 0;
  let height;
  let isSorted = true;
  document.querySelectorAll(".bar").forEach((elm) => {
    height = elm.style.height;
    height = parseInt(height.substring(0, height.length - 2));
    if (lastHeight > height) {
      isSorted = false;
    }
    lastHeight = height;
  });
  return isSorted;
};
function play() {
  if (isSorted()) {
    generateArr();
  }
  if (!isrunning) {
    isrunning = true;
    switch (document.querySelector("#selectAlgo").value) {
      case "bblsort":
        runAnimations(bblSort(array));
        break;
      case "quicksort":
        runAnimations(quickSort(array, 0, array.length - 1));
        break;
      case "mergesort":
        runAnimations(mergeSort(array));
        break;
      case "radixsort":
        runAnimations(radixSort(array));
        break;
      case "heapsort":
        runAnimations(heapSort(array));
        break;
      case "shellsort":
        runAnimations(shellSort(array));
        break;
      case "insertionsort":
        runAnimations(insertionSort(array));
        break;
      case "coustomsort":
        console.log("run coustomsort");
        let animation = [];
        try {
          eval(
            `function swap(first,sec){
              animation.push(['s', first, sec]);
            }
            function pos(pos, value){
              animation.push(['p', pos, value]);
            }
            function color(pos){
              animation.push(['c', pos]);
            }
            function removeColor(pos){
              animation.push(['r', pos]);
            }
            ${jar.toString()}
            coustomSort(array);`
          );
          runAnimations(animation, 1);
        } catch (error) {
          console.log("Your custom script throw an error");
          console.log(error);
          alert(error);
        }
    }
  } else if (isrunning && ispaused) {
    ispaused = false;
  } else {
    console.log("allready running...");
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function clear() {
  isrunning = false;
  ispaused = false;
  await sleep(125);
  generateArr();
}
document.querySelector("#play").addEventListener("click", play);
document.querySelector("#random").addEventListener("change", clear);
document.querySelector("#reset").addEventListener("click", clear);
document.querySelector("#sliderSize").addEventListener("change", clear);
document.querySelector("#selectAlgo").addEventListener("change", clear);
document.querySelector("#pause").addEventListener("click", () => {
  ispaused = true;
});
document
  .querySelector("#selectAlgo")
  .addEventListener("change", selectAlgoChange);
function selectAlgoChange() {
  const editor = document.querySelector(".editor");
  const codeScriptTag = document.querySelector(".codeSript");
  const coustomsortExplained = document.querySelector("#coustomsortExplained");
  if (document.querySelector("#selectAlgo").value === "coustomsort") {
    codeScriptTag.style.display = "none";
    editor.style.display = "block";
    coustomsortExplained.style.display = "block";
  } else {
    coustomsortExplained.style.display = "none";
    editor.style.display = "none";
    codeScriptTag.style.display = "block";
    codeScriptTag.innerHTML =
      codeScript[document.querySelector("#selectAlgo").value];
    hljs.highlightBlock(codeScriptTag);
  }
}
window.addEventListener("resize", resize);
function resize() {
  let sliderSize = document.querySelector("#sliderSize");
  if (document.body.clientWidth / 2 - 1 <= sliderSize.value) {
    sliderSize.value = sliderSize.value * 0.7;
    clear();
  } else {
    document
      .querySelectorAll(".bar")
      .forEach(
        (elm) =>
          (elm.style.width =
            Math.floor(document.body.clientWidth / sliderSize.value - 1) + "px")
      );
  }
  if (
    document.body.clientHeight < arrHeight * 1.15 ||
    document.body.clientHeight > arrHeight * 1.5
  ) {
    arrHeight = Math.round(document.body.clientHeight * 0.8);
    clear();
  }
  sliderSize.max = document.body.clientWidth / 2 - 2;
}
