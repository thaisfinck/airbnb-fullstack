let main = document.querySelector('#main')
//console.log(main)
//let thumbnail = document.querySelectorAll('#thumbnail')
//console.log(thumbnail)
//let thumbnailLoop = thumbnail.forEach(photo => console.log(photo.innerHTML))

const display = photo => {
  return (main.src = photo.src)
}
