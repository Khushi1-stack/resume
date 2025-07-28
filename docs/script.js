document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("darkToggle");

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggle.textContent = document.body.classList.contains("dark-mode")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
  });

  const sections = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  sections.forEach((section) => {
    observer.observe(section);
  });

  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": { "value": "#00aaff" },
      "shape": { "type": "edge" },
      "opacity": {
        "value": 0.4,
        "random": false
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#00aaff",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "out_mode": "bounce"
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "grab" },
        "onclick": { "enable": true, "mode": "push" }
      },
      "modes": {
        "grab": {
          "distance": 200,
          "line_linked": {
            "opacity": 0.5
          }
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  });
});
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSort() {
  const input = document.getElementById("inputArray").value;
  let arr = input.split(',').map(Number).filter(n => !isNaN(n));
  if (arr.length === 0) {
    alert("Please enter a valid list of numbers.");
    return;
  }

  const container = document.getElementById("bars-container");
  container.innerHTML = '';

  // Create bars
  arr.forEach((value, idx) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 3}px`;
    bar.dataset.value = value;
    container.appendChild(bar);
  });

  const bars = document.querySelectorAll(".bar");

  // Bubble Sort with animation
  for (let i = 0; i < bars.length; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      bars[j].classList.add("highlight");
      bars[j + 1].classList.add("highlight");

      await sleep(400);

      const val1 = parseInt(bars[j].dataset.value);
      const val2 = parseInt(bars[j + 1].dataset.value);

      if (val1 > val2) {
        // Swap heights and values
        [bars[j].style.height, bars[j + 1].style.height] = [bars[j + 1].style.height, bars[j].style.height];
        [bars[j].dataset.value, bars[j + 1].dataset.value] = [bars[j + 1].dataset.value, bars[j].dataset.value];
      }

      bars[j].classList.remove("highlight");
      bars[j + 1].classList.remove("highlight");
    }
  }
}
// After sorting ends, collect the values from the bars
let sorted = [];
document.querySelectorAll(".bar").forEach(bar => {
  sorted.push(parseInt(bar.dataset.value));
});
document.getElementById("sorted-output").innerText = "Sorted: " + sorted.join(", ");

function forceDownload(e) {
  e.preventDefault();
  const link = document.createElement('a');
  link.href = 'Khushi_Kandhani_Resume.pdf';
  link.download = 'Khushi_Kandhani_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
