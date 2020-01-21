async function readData() {
    const decoder = new TextDecoder("utf-8");
    let response = await fetch("https://api.myjson.com/bins/zyv02");
    let length = response.headers.get("Content-Length");
    if (!length) {
        // something was wrong with response, just give up
        return await response.arrayBuffer();
    }
    let array = new Uint8Array(length);
    let at = 0; // to index into the array
    let reader = response.body.getReader();
    for (;;) {
        let {
            done,
            value
        } = await reader.read();
        if (done) {
            break;
        }
        array.set(value, at);
        at += value.length;
        let progBar = (at / length).toFixed(2) * 100;
        let div = document.getElementById("loadBar");
        if (progBar < 100) {
            this.loadBar = `
            <div
                style="width: ${progBar}%; height: 40px; padding-top: 5px;
                background: repeating-linear-gradient(
                    45deg,
                    rgb(${255 - 1.59 * progBar}, ${1.09 * progBar}, ${1.88 *
            progBar}),
                    rgb(${255 - 1.59 * progBar}, ${1.09 * progBar}, ${1.88 *
            progBar}) 10px,
                    rgb(${255 - 1.85 * progBar}, ${0.82 * progBar}, ${1.52 *
            progBar}) 10px,
                    rgb(${255 - 1.85 * progBar}, ${0.82 * progBar}, ${1.52 *
            progBar}) 20px
                ); color: white; text-align: center;"
                >
                Loading...
                </div>`;
            div.innerHTML = this.loadBar;
        } else {
            this.loadBar = `
            <div
                style="width: 100%; height: 40px; padding-top: 5px;
                background: repeating-linear-gradient(
                    45deg,
                    rgb(96, 109, 188),
                    rgb(96, 109,188) 10px,
                    rgb(70, 82, 152) 10px,
                    rgb(70, 82, 152) 20px
                ); color: white; text-align: center;"
                >
                Book list updated
                </div>`;
            div.innerHTML = this.loadBar;
        }
    };
    let books = JSON.parse(decoder.decode(array)).books;
    console.log(books);
    let string = "";
    books.forEach(book => {
        let div = document.getElementById("card");
        /*  let flipCard = document.createElement("div");
         div.append(flipCard); */
        string += `
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src=${book.cover} alt=${book.title} style="width:205px;height:320px;">
                </div>
                <div class="flip-card-back">
                    <h1>${book.title}</h1>
                    <p>${book.description}</p>
                    <button class="button">Details</button>
                </div>
            </div>
        </div>
            `;
        console.log(string);
        div.innerHTML = string;
    });
    return;
};

readData()