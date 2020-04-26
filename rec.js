const icon = document.querySelector('i.fa.fa-microphone');
const content = document.querySelector('.content');

//

const greetings = [
 "None of your business",
 "Get away from me",
 "Leave me alone"
];

const weather = [
  "Why does it matter, you can't go outside anyway",
  "Stay at home",
  "I don't know but you need a tan",

];

const time = [
  "Time to get a watch",
  "Does it matter, you don't have any friends to meet anyway",
  "Time is an illusion"
];

// now - how do we initiate speech recognition?
const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
// now we can initiate this function

recognition.onstart = function() {
  console.log('Voice is activated, please speak!');
};

// now for the important things - the string that holds what we're actually talking about!
recognition.onresult = function(event) {
  const current = event.resultIndex;

// get the console to report back what we said from the 'results' section
  const transcript = event.results[current][0].transcript;
  // will give us the message:
  content.textContent = transcript;

  readOutLoud(transcript);

};


// add the listener to the icon/button you've chosen

icon.addEventListener('click', () => {
  recognition.start();
});


// what comes next - create speech synthesis (so that our js can 'talk back')
function readOutLoud(message){
  const speech = new SpeechSynthesisUtterance();

  speech.text = "I don't understand";

  if(message.includes('how are you')){
    const finalText =
    greetings[Math.floor(Math.random() * greetings.length)];
    speech.text = finalText;
  }

  if(message.includes('weather')){
    const finalText =
    weather[Math.floor(Math.random() * weather.length)];
    speech.text = finalText;
  }

  if(message.includes('time')){
    const finalText =
    time[Math.floor(Math.random() * time.length)];
    speech.text = finalText;
  }

  // time to define a few things
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  // if you actually want anything to happen - need to call this and listen to it
  window.speechSynthesis.speak(speech);

}
