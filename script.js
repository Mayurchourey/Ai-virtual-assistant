let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);

    // Get the list of voices after they are fully loaded
    let voices = window.speechSynthesis.getVoices();
    // Try to find a female voice specifically, or fall back to the first available
    text_speak.voice = voices.find(voice => 
        (voice.name.includes("Female") || 
         voice.name.includes("Google UK English Female") ||
         voice.lang === "en-GB")) || voices[0];

    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US";
    window.speechSynthesis.speak(text_speak);
}

function WishMe() {
    let day = new Date();
    let hours = day.getHours();
    console.log(hours);


    if (hours >= 0 && hours < 12) {
        speak("Good morning sir");
    }
    else if (hours >= 12 && hours < 16) {
        speak("Good afternoon sir");
    }
    else {
        speak("Good evening sir");
    }
}

// Set up speech recognition with correct capitalization
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;

    takeCommand(transcript.toLowerCase());
}

// Add click event to start recognition
btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
})

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("ok mahi")) {
        speak("Hi sir, how can I help you?");
    }
    else if (message.includes("who are you")) {
        speak("I'm a virtual assistant, created by Mayur Sir.");
    }
    else if (message.includes("open youtube")) {
        speak("Opening YouTube as per your command.");
        window.open("https://www.youtube.com");
    }
    else if (message.includes("open instagram")) {
        speak("Opening Instagram as per your command.");
        window.open("https://instagram.com");
    }
    else if (message.includes("open facebook")) {
        speak("Opening Facebook as per your command.");
        window.open("https://facebook.com");
    }
    else if (message.includes("open google")) {
        speak("Opening Google as per your command.");
        window.open("https://google.com");
    }
    else if (message.includes("open spotify")) {
        speak("Opening Spotify as per your command.");
        window.open("https://spotify.com");
    }
    else if (message.includes("open calculator")) {
        speak("Opening Calculator as per your command.");
        window.open("Calculator://");
    }
    else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp as per your command.");
        window.open("WhatsApp://");
    }
    else if (message.includes("what is the time")) {
        let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        speak("The current time is " + time);
    }
    else if (message.includes("what is the date")) {
        let date = new Date().toLocaleDateString();
        speak("Today's date is " + date);
    }
    else {
        let finalText = "This is what I found on the internet regarding " + message.replace("mahi", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("mahi", "")}`, "_blank");
    }
}

// Ensure voices are loaded, then call WishMe
window.speechSynthesis.onvoiceschanged = () => {
    WishMe();
}
