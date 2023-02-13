let sadFaceCanvas;
let data;
let currentLine = 0;
let usedWords = [];
let stopWords = ["a", "an", "and", "as", "at", "but", "by", "for", "if", "in", "into", "is", "it", "of", "on", "or", "such", "that", "the", "their", "then", "there", "these", "they", "this", "to", "was", "will", "with", "b", "pm25"];

function setup() {
  createCanvas(800, 800);
  sadFaceCanvas = createGraphics(800, 800);
  loadJSON("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=polluting%20the%20environment&format=json&origin=*", gotData);
}

function gotData(d) {
  data = d;
  let articles = data.query.search;
  let randomIndex = floor(random(articles.length));
  let article = articles[randomIndex];
  let title = article.title;
  let url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  fetch(url)
    .then(response => response.json())
    .then(gotArticleData)
    .catch(error => console.error(error));
}

function gotArticleData(d) {
  let firstHundredWords = d.extract.substr(0, 100);
  let words = firstHundredWords.split(" ");
  let randomWords = [];
  for (let i = 0; i < 15; i++) {
    let randomIndex = floor(random(words.length));
    let word = words[randomIndex];
    word = word.replace(/[^\w\s]/gi, '');
    word = word.toLowerCase();
    if (!usedWords.includes(word) && !stopWords.includes(word)) {
      randomWords.push(word);
      usedWords.push(word);
    }
  }
  let textToDisplay = randomWords.join(" ");
  textAlign(CENTER);
  text(textToDisplay, width / 2, 30 * currentLine + 30);
  currentLine++;
  image(sadFaceCanvas, 0, 0);
}



function drawSadFace() {
  sadFaceCanvas.clear();
  let x = random(width);
  let y = random(height);
  let size = random(20, 80);
  sadFaceCanvas.fill(255, 0, 0);
  sadFaceCanvas.textSize(size);
  sadFaceCanvas.push();
  sadFaceCanvas.translate(x + size / 2, y + size / 2);
  sadFaceCanvas.rotate(radians(90));
  sadFaceCanvas.text(":(", -size / 2, -size / 2);
  sadFaceCanvas.pop();
}

function mousePressed() {
  usedWords = [];
  gotData(data);
  drawSadFace();
}
