```javascript
const Horror = {

  trigger() {

    const film =
      document.getElementById("film");

    const cursor =
      document.getElementById("cursor");

    /* temporarily distort screen */

    film.style.opacity = ".35";

    cursor.classList.add("danger");

    document.body.style.filter =
      "contrast(1.3)";

    setTimeout(() => {

      film.style.opacity = ".10";

      cursor.classList.remove("danger");

      document.body.style.filter =
        "none";

    }, 900);
  }

};
```
