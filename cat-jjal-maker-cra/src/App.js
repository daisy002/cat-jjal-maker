import React from 'react';
import './App.css';
import Title from './components/Title';


const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};


const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://dog.ceo/api/breeds/image/random";

  const response = await fetch(`${OPEN_API_DOMAIN}`);
  const responseJson = await response.json();

  console.log(text);

  return `${responseJson.message}`;
};

// console.log("야옹");



function CatItem(props) {
  // console.log(props);
  return (
    <li>
      <img src={props.img} style={{ width: "150px" }} />
    </li>
  );
}


const Form = ({ updateMainCat }) => {


  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
  const [value, setValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  function handleInputChange(e) {

    const userValus = e.target.value;

    if (includesHangul(userValus)) {
      setErrorMessage("한글은 입력할 수 없습니다.")
    } else {
      setErrorMessage("");
    }
    setValue(e.target.value.toUpperCase());
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    if (value === '') {
      setErrorMessage("빈 값으로 만들수 없음");
      return;
    }
    if (includesHangul(value)) {
      setErrorMessage("한글은 입력할 수 없습니다.")
      return;
    }

    updateMainCat(value);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text" name="name" placeholder="영어 대사를 입력해주세요"
        value={value}
        onChange={handleInputChange}
      />
      <button type="submit">생성</button>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </form>
  );
};

function Favorites({ favorites }) {
  if (favorites.length === 0) {
    return <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요~</div>;
  }

  return (
    <ul className="favorites">
      {favorites.map((cat) => (
        <CatItem img={cat} key={cat} />
      ))}
    </ul>
  );
}


const MainCard = ({ img, onHeartClick, alreadyFavoriate }) => {

  const heartIcon = alreadyFavoriate ? "💖" : "🤍";

  return (
    <div className="main-card" >
      <img src={img} alt="고양이" width="400" />
      <button onClick={onHeartClick} >{heartIcon}</button>
    </div>
  );
}

const App = () => {

  const CAT1 =
    "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1440&h=80&dpr=1";

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });
  const [mainCat, setMainCat] = React.useState(CAT1);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });


  const alreadyFavoriate = favorites.includes(mainCat);

  async function setIntialCat() {
    const newCat = await fetchCat('First Cat');
    console.log(newCat);
    setMainCat(newCat);
  }
  React.useEffect(() => {
    setIntialCat();
  }, [])


  async function updateMainCat(value) {
    const newCat = await fetchCat(value);

    setMainCat(newCat);

    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });
  }


  function handlerHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem('favorites', nextFavorites)


  }

  const counterTitle = counter == null ? "" : counter + ' 번째';

  return (
    <div>
      <Title >{counterTitle}고양이 입니다~~!!</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={mainCat} onHeartClick={handlerHeartClick} alreadyFavoriate={alreadyFavoriate} />
      <Favorites favorites={favorites} />

    </div>
  );
};


export default App;
