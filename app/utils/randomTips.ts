
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomTips() {
    let tips = ['嗯','请讲','您说','在','hi','主人','咋了','说吧'];
    let i = getRandomInt(0, tips.length);
    return tips[i];
}
