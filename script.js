const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

const toggleButton = () => {
  button.disabled = !button.disabled;
}

const tellMe = (joke) => {
    VoiceRSS.speech({
    key: '',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

const getJoke = async() => {
  const JOKE_API_URL = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&idRange=0-185';
  let joke = '';
  try {
    const response = await fetch(JOKE_API_URL);
    const data = await response.json();
    joke = data.setup ? `${data.setup} ... ${data.delivery}` : data.joke;
    tellMe(joke);
    toggleButton()
  } catch (err) {
    window.confirm('Something went wrong ' + err);
  }
}

button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);
