document.addEventListener("DOMContentLoaded", function () {
  // fall item animation
  let container = document.querySelector(".container_fall_items");
  let items = document.querySelectorAll(".fall_item");

  let itemsData = [];

  items.forEach((item) => {
    if (!item.style.left) {
      let randomLeft = Math.random() * (container.clientWidth - 60);
      let randomTop = Math.random() * (container.clientHeight - 60);
      item.style.left = randomLeft + "px";
      item.style.top = randomTop + "px";
    }

    if (!item.style.position) {
      item.style.position = "absolute";
    }

    itemsData.push({
      element: item,
      vy: 0.5,
      vx: (Math.random() - 0.5) * 2,
      dragging: false,
    });
  });

  let dragItem = null;
  let mouseX = 0,
    mouseY = 0;

  container.addEventListener("mousemove", (e) => {
    let rect = container.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  container.addEventListener("mouseup", () => {
    if (dragItem) {
      let data = itemsData.find((d) => d.element === dragItem);
      if (data) {
        data.dragging = false;
      }
      dragItem.style.zIndex = "";
      dragItem = null;
    }
  });

  function fall() {
    itemsData.forEach((data) => {
      if (!data.dragging) {
        let left = parseFloat(data.element.style.left) || 0;
        let top = parseFloat(data.element.style.top) || 0;

        let newLeft = left + data.vx;
        let newTop = top + data.vy;

        let centerX = left + data.element.offsetWidth / 2;
        let centerY = top + data.element.offsetHeight / 2;
        let dx = centerX - mouseX;
        let dy = centerY - mouseY;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100 && !dragItem) {
          let force = ((100 - dist) / 100) * 3;
          let angle = Math.atan2(dy, dx);
          data.vx += Math.cos(angle) * force;
          data.vy += Math.sin(angle) * force;
        }

        if (newLeft < 0) {
          newLeft = 0;
          data.vx *= -0.5;
        }

        if (newLeft > container.clientWidth - data.element.offsetWidth) {
          newLeft = container.clientWidth - data.element.offsetWidth;
          data.vx *= -0.5;
        }

        if (newTop < 0) {
          newTop = 0;
          data.vy *= -0.5;
        }

        if (newTop > container.clientHeight - data.element.offsetHeight) {
          newTop = container.clientHeight - data.element.offsetHeight;
          data.vy *= -0.5;
        }

        data.element.style.left = newLeft + "px";
        data.element.style.top = newTop + "px";
      }
    });

    requestAnimationFrame(fall);
  }

  fall();
});
