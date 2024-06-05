const { uuid } = require("uuidv4");
const kr = ["장래", "활력소", "자취", "전자파", "티맥스", "마산"];
const en = ["Tmax", "undermine", "tie", "mark", "maple", "faker"];
const nickname = [
  "jinha",
  "jina",
  "jinh",
  "jin",
  "j",
  "jinhajinha",
  "jinhajinhajinha",
];
const titles = [...kr, ...en];
const getSumWord = () => {
  for (k of kr) {
    for (e of en) {
      titles.push(k + e);
    }
  }
};
getSumWord();
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
for (let i = 0; i < titles.length; i++) {
  const _album = {
    ...album,
    albumId: uuid(),
    title: titles[i],
    nickname: nickname[i % nickname.length],
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
