let maxCars = 4;
let carCount = 0;
const lot = document.getElementById("lot");
const ssdDisplay = document.getElementById("ssd-display");
const countDisplay = document.getElementById("countDisplay");

const TH = 148; // ON time
const TL = 52;  // OFF time
let blinkInterval;

// Map characters to segments
const charSegments = {
  'A': ['a','b','c','e','f','g'],
  'B': ['c','d','e','f','g'],
  'C': ['a','d','e','f'],
  'D': ['b','c','d','e','g'],
  'E': ['a','d','e','f','g'],
  'F': ['a','e','f','g'],
  'L': ['d','e','f'],
  'P': ['a','b','e','f','g'],
  'S': ['a','c','d','f','g'],
  'U': ['b','c','d','e','f'],
  'V': ['c','d','e'],
  ' ': []
};

function renderSSDText(text) {
  ssdDisplay.innerHTML = "";
  for (let char of text.toUpperCase()) {
    const ssdChar = document.createElement("div");
    ssdChar.className = "ssd-char";
    ['a','b','c','d','e','f','g'].forEach(seg => {
      const segment = document.createElement("div");
      segment.className = `segment ${seg}`;
      if (charSegments[char]?.includes(seg)) {
        segment.classList.add("on");
      }
      ssdChar.appendChild(segment);
    });
    ssdDisplay.appendChild(ssdChar);
  }
}

function renderCars() {
  lot.innerHTML = "";
  for (let i = 0; i < maxCars; i++) {
    const slot = document.createElement("div");
    slot.className = "slot";
    if (i < carCount) {
      const car = document.createElement("div");
      car.className = "car";
      slot.appendChild(car);
    }
    lot.appendChild(slot);
  }
}

function updateDisplay() {
  countDisplay.textContent = `Cars Parked: ${carCount} / ${maxCars}`;
  if (carCount >= maxCars) {
    clearInterval(blinkInterval);
    renderSSDText("FULL");
    ssdDisplay.style.visibility = "visible";
  } else {
    startBlinking();
  }
}

function enterCar() {
  if (carCount < maxCars) {
    animateGate("entryGate");
    carCount++;
    renderCars();
    updateDisplay();
  }
}

function exitCar() {
  if (carCount > 0) {
    animateGate("exitGate");
    carCount--;
    renderCars();
    updateDisplay();
  }
}

function startBlinking() {
  clearInterval(blinkInterval);
  renderSSDText("SPACE AVAILABLE");
  ssdDisplay.style.visibility = "visible";

  let visible = true;
  blinkInterval = setInterval(() => {
    visible = !visible;
    ssdDisplay.style.visibility = visible ? "visible" : "hidden";
  }, TH + TL);
}

function setCapacity() {
  const input = document.getElementById("capacityInput");
  const value = parseInt(input.value);
  if (!isNaN(value) && value >= 1 && value <= 20) {
    maxCars = value;
    if (carCount > maxCars) {
      carCount = maxCars;
    }
    renderCars();
    updateDisplay();
  } else {
    alert("Enter a number between 1 and 20");
  }
}

function animateGate(gateId) {
  const gate = document.getElementById(gateId);
  gate.classList.add("open");
  setTimeout(() => gate.classList.remove("open"), 1000);
}

// Initial render
renderCars();
updateDisplay();
