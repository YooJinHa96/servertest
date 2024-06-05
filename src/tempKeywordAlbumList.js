const { uuid } = require("uuidv4");
const kr = ["장래", "활력소", "자취", "전자파", "티맥스", "마산"];
const en = ["Tmax", "undermine", "tie", "mark", "maple", "faker"];

const getRandomWord = () => {
  // 두 배열에서 무작위로 단어를 선택
  const randomKr = kr[Math.floor(Math.random() * kr.length)];
  const randomEn = en[Math.floor(Math.random() * en.length)];

  // 무작위로 하나의 배열에서 단어를 선택하거나 두 단어를 결합
  const randomChoice = Math.floor(Math.random() * 3);

  if (randomChoice === 0) {
    return randomKr; // 한국어 단어 반환
  } else if (randomChoice === 1) {
    return randomEn; // 영어 단어 반환
  } else {
    return randomKr + randomEn; // 한국어와 영어 단어 결합
  }
};

const imgInfo = {
  length: 5,
  assetName: "memorealAlbum",
  content: "Memoreal Memoreal Memoreal ",
  thumbnail: "",
};
const copyImgList = (index) => {
  const imgList = [];
  for (let i = 0; i < 5; i++) {
    const _imgInfo = {
      ...imgInfo,
      thumbnail: `https://picsum.photos/seed/${
        index + i * Math.random() * 10
      }/390/620`,
    };
    imgList.push(_imgInfo);
  }
  return [...imgList];
};

const album = {
  spaceId: "213231",
  zoomInThumb: "",
  year: 1234,
  like: Math.floor(Math.random() * 1000),
  hits: Math.floor(Math.random() * 100),
  profileImg: "/tempMemoreal/profile.png",
  nickname: "jinha",
  userId: "vcxvcxvcxvd",
  memoryList: [],
};
const tempKeywordAlbumList = [];
for (let i = 0; i < 7; i++) {
  const _album = {
    ...album,
    albumId: uuid(),
    title: getRandomWord(),
    like: Math.floor(Math.random() * 1000) + 1,
    hits: Math.floor(Math.random() * 1000) + 1,
    zoomInThumb: `https://picsum.photos/seed/${
      i * Math.floor(Math.random() * 1000)
    }/390/620`,
    memoryList: copyImgList(i),
  };
  tempKeywordAlbumList.push(_album);
}

module.exports = tempKeywordAlbumList;
