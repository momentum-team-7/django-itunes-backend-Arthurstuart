const searchbutton = document.querySelector(".search-song")
const form = document.querySelector("#searchForm")
const listSongs = document.querySelector(".list-songs")
const url="https://itunes.apple.com/search?term="
const proxyUrl="https://proxy-itunes-api.glitch.me/search?term="

form.addEventListener('submit', event => {
    console.log(event.target)
 event.preventDefault()
 clearSongs ();
 searchRequest()
})

function clearSongs () {
    let songs = document.querySelectorAll('li')
    for (let song of songs) {
    song.remove();
}
}

function searchRequest () {
    const songDisplay = document.querySelector(".song-field").value
    fetch(proxyUrl + songDisplay)
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        for (let song of data.results) {
            // console.log(song.trackName)
        // clearSongs()
            displaySongResults(song)
        }
    } ) 

}

function displaySongResults (song) {
    // let songData = document.createElement('div')
    indSong = document.createElement('li')
    
    let songAudio = document.createElement('audio')
    songAudio.className = "musicPlayer"
   songAudio.src = song.previewUrl
    indSong.appendChild(songAudio)
    
    let title = document.createElement('p')
   title.innerText=song.trackName
   indSong.appendChild(title)
  
   let artwork = document.createElement('img')
   artwork.src=song.artworkUrl100
   indSong.appendChild(artwork)
  
   let artistName = document.createElement('h4')
   artistName.innerText=song.artistName
   indSong.appendChild(artistName)
  
   let date = document.createElement('p')
   date.innerText = `Released: ${moment(song.releaseDate).format('ll')}`
   indSong.appendChild(date)
   listSongs.appendChild(indSong)

  listSongs.addEventListener('click', e => {
      playMusic(e.target.parentElement)
      
  }) 

}

function playMusic (song) {
    let audio = document.querySelector("audio")
    console.log(song.firstElementChild)
    audio.src = song.firstElementChild.src
}