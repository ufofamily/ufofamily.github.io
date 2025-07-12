function parseTimeLabel(label) {
  const [date, time] = label.split(" ");
  const [day, month] = date.split(".").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  const year = new Date().getFullYear();
  return new Date(year, month - 1, day, hours, minutes);
}

function updateHighlighting() {
  const now = new Date();
  document.querySelectorAll(".entry-list").forEach(list => {
    const entries = list.querySelectorAll(".lineup-entry");
    let activeIndex = -1;
    for (let i = 0; i < entries.length; i++) {
      const entryTime = parseTimeLabel(entries[i].textContent.trim());
      if (now >= entryTime) {
        activeIndex = i;
      } else {
        break;
      }
    }

    entries.forEach((el, idx) => {
      if (idx === activeIndex) {
        el.classList.add("highlight");
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        el.classList.remove("highlight");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateHighlighting();
  setInterval(updateHighlighting, 60000); // обновление каждую минуту
});