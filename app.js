const subReddits = [
  'techhumor',
  'programmerhumor',
  'ITMemes',
  'memes',
  'meme',
  'MemeEconomy',
  'Memes_Of_The_Dank',
  'AnimalMeme',
  'AnimalMemes',
  'HistoryMemes',
  'HistoryMemeVault',
  'nextfuckinglevel',
  'iamverysmart',
  'oldpeoplefacebook',
  'ComedyCemetery',
  'dankmemes',
  'PrequelMemes',
  'terriblefacebookmemes',
  'PewdiepieSubmissions',
  'funny',
  'teenagersd'
]
const memeContainer = document.getElementById("content");
const createMeme = () => {
  return new Promise((resolve) => {
    const reddit = subReddits[Math.floor(Math.random() * subReddits.length)];
    fetch(`https://meme-api.com/gimme/${reddit}`).then((value) =>
      value.json().then((res) => {
        if(res?.title === undefined||res?.url === undefined||res.title === "undefined"||res.url === "undefined"||res.url.includes("imgur")){
          resolve();
        }
        else{
          const meme = document.createElement("div");
          meme.className = "meme";
          meme.innerHTML = `
          <a>${res.title}</a>
          <img src="${res.url}">`;
          memeContainer.appendChild(meme);
          resolve();
        }
        resolve()
      })
    );
  });
};
const addMemes = async () => {
  for (let i = 0; i <= 3; i++) {
    await createMeme();
  }
};

const handleInfiniteScroll = () => {
  window.removeEventListener("scroll", handleInfiniteScroll);
  setTimeout(() => {
    const endOfPage =
      window.innerHeight + window.pageYOffset +100 >= document.body.offsetHeight;
    if (endOfPage) {
      addMemes();
    }
    window.addEventListener("scroll", handleInfiniteScroll);
  }, 250);
};

async function init() {
  window.addEventListener("scroll", handleInfiniteScroll);
  while (document.body.scrollHeight <= window.innerHeight) {
    await createMeme();
  }
}
init();