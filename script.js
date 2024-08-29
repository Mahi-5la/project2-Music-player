let songName = document.querySelector(".song-name");
let songSinger = document.querySelector(".song-singer");
let songImage = document.querySelector(".song-image");
let playPauseImag = document.querySelector("#playpause");
let volumeRange = document.querySelector("#volume-range");
let songRange = document.querySelector("#song-duration");
let volSvg = document.querySelector("#vol-svg");
let musicAnim = document.querySelector("#musicanim");
let playlistImg = document.querySelector("#playlist-img");
let playlist = document.querySelector(".playlist");
let playlistSong = document.querySelectorAll(".playlist-songs");
let index = 0; // Start with the first song
let playingSong = false;
let track = document.createElement("audio");
let songs = [
  {
    name: "Kadalalle",
    path: "kadalalle.mp3",
    image: "dimg1.jfif",
    singer: "Karthick",
  },
  {
    name: "Aagasam",
    path: "Aagasam.mp3",
    image: "Aimg2.jfif",
    singer: "Karthick",
  },
  {
    name: "Aadathi",
    path: "Aathadi.mp3",
    image: "Aadaimg1.jfif",
    singer: "Karthick",
  },
];

// Function to load the current track
function loadTrack(index) {
  track.src = songs[index].path;
  songName.innerHTML = songs[index].name;
  songSinger.innerHTML = songs[index].singer;
  songImage.style.backgroundImage = `url(${songs[index].image})`;
  volume()
  duration()
  setInterval(() => {
   songRange.max=track.duration
   songRange.value=track.currentTime
  },1000)
  track.loop=true;
  track.load()
}

loadTrack(index);

function playPause(){
    if(playingSong==false){
        playSong()
        
    }

else{
    pauseSong()
    
}
}

function playSong(){
    track.play();
    playingSong=true;
    playPauseImag.src="pause.svg"
    musicAnim.style.display = "block";

}
function pauseSong() {
  track.pause();
  playingSong = false;
  playPauseImag.src = "play.svg";
  musicAnim.style.display = "none";
}

function nextSong(){
    if(index < songs.length-1){
        index++;
        loadTrack(index);
        playSong();
    }
    else{
        index=0;
         loadTrack(index);
         playSong();
    }
}

function previousSong() {
  if (index > 0) {
    index--;
    loadTrack(index);
    playSong();
  } else {
    index = songs.length - 1;
    loadTrack(index);
    playSong();
  }
}

function volume(){
track.volume=volumeRange.value/100;
if(volumeRange.value==0){
    volSvg.src="mute.svg";
}
else{
    volSvg.src="volume.svg";
}

}
function duration(){
    track.currentTime=songRange.value;
}
playlistImg.addEventListener("click",()=>{
    playlist.classList.toggle("playlist-active")
    if(playlist.classList.contains("playlist-active")){
        playlistImg.src="cross.svg"
    }
    else{
        playlistImg.src="playlist.svg"
    }

})

playlistSong.forEach((song,index)=>{
    song.addEventListener("click",()=>{
        loadTrack(index);
        playSong();
        playlist.classList.remove("playlist-active");
        playlistImg.src = "playlist.svg";
    })
})