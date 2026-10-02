```javascript
const Dialogue = {

  active: false,

  index: 0,

  lines: [],

  start(lines) {

    this.lines = lines;
    this.index = 0;

    this.active = true;

    this.show();
  },

  show() {

    const line =
      this.lines[this.index];

    document.getElementById("speaker")
      .textContent = line.name;

    document.getElementById("dialogueText")
      .textContent = line.text;

    document.getElementById("dialogue")
      .style.display = "block";
  },

  next() {

    this.index++;

    if (this.index >= this.lines.length) {

      this.active = false;

      document.getElementById("dialogue")
        .style.display = "none";

      return;
    }

    this.show();
  }
};
```
