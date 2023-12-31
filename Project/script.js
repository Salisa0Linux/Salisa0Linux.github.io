var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var phrases = [
  'I love to sing because it\'s fun',
  'where are you going',
  'can I call you tomorrow',
  'why did you talk while I was talking',
  'she enjoys reading books and playing games',
  'where are you going',
  'have a great day',
  'she sells seashells on the seashore',
  'What is your name',
  'Nice to meet you',
  'How are you',
  'How old are you',
  'I\’m from Thailand',
  'What\’s your job',
  'How long have you been in Thailand',
  'Do you like living in Thailand',
  'Yes I like living here very much',
  'What\’s your nationality',
  'How tall are you',
  'What is your weight',
  'Everybody can be my friend',
  'What have you been doing',
  'Who is your favourite singer',
  'My favorite singer is Lisa Blackpink',
  'How many languages can you speak',
  'Please speak slower',
  'What do you want to eat',
  'What are you looking for',
  'What would you like sir',
  'Which one do you need',
  'I\’m looking for shoes',
  'What kind do you want',
  'I just want to look around',
  'Can I try it on',
  'What color do you prefer',
  'Today is the last day of promotion',
  'Do you have any tables available',
  'Can we have a table for 2 people please',
  'Can I have a menu please',
  'What do you recommend'
];

var phrasePara = document.querySelector('.phrase');
var resultPara = document.querySelector('.result');
var diagnosticPara = document.querySelector('.output');

var testBtn = document.querySelector('button');

function randomPhrase() {
  var number = Math.floor(Math.random() * phrases.length);
  return number;
}

function speakText(text) {
  var speech = new SpeechSynthesisUtterance();
  speech.lang = 'en-US';
  speech.text = text;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}

function testSpeech() {
  testBtn.disabled = true;
  testBtn.textContent = 'Test in progress';

  var phrase = phrases[randomPhrase()];
  phrase = phrase.toLowerCase();
  phrasePara.textContent = phrase;
  resultPara.textContent = 'Right or wrong?';
  resultPara.style.background = 'rgba(0,0,0,0.2)';
  diagnosticPara.textContent = '...diagnostic messages';

  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    var speechResult = event.results[0][0].transcript.toLowerCase();
    diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';
    speakText('Speech received: ' + speechResult);
    if(speechResult === phrase) {
      resultPara.textContent = 'I heard the correct phrase!';
      resultPara.style.background = 'lime';
      speakText('I heard the correct phrase!');
    } else {
      resultPara.textContent = 'That didn\'t sound right.';
      resultPara.style.background = 'red';
      speakText('That didn\'t sound right.');
    }

    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
  }

  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
  }
  
  recognition.onaudiostart = function(event) {
    console.log('SpeechRecognition.onaudiostart');
  }
  
  recognition.onaudioend = function(event) {
    console.log('SpeechRecognition.onaudioend');
  }
  
  recognition.onend = function(event) {
    console.log('SpeechRecognition.onend');
  }
  
  recognition.onnomatch = function(event) {
    console.log('SpeechRecognition.onnomatch');
  }
  
  recognition.onsoundstart = function(event) {
    console.log('SpeechRecognition.onsoundstart');
  }
  
  recognition.onsoundend = function(event) {
    console.log('SpeechRecognition.onsoundend');
  }
  
  recognition.onspeechstart = function (event) {
    console.log('SpeechRecognition.onspeechstart');
  }
  
  recognition.onstart = function(event) {
    console.log('SpeechRecognition.onstart');
  }
}

testBtn.addEventListener('click', testSpeech);
