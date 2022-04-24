const EMPTY_HEART = "🤍";
const FULL_HEART = "💖";

// const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
// const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
// const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";


const CAT1 =
  "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1440&h=80&dpr=1";
const CAT2 =
  "https://media.istockphoto.com/photos/cobberdog-pup-on-white-background-picture-id1306641965?s=612x612";
const CAT3 =
  "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg";


const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};
