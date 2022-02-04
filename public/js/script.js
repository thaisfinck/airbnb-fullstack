// let inputs = document.querySelectorAll('input')
//
// const add = () => {
//   let result = Number(inputs[0].value) + Number(inputs[1].value)
//   document.querySelector('div').innerHTML = `The result is ${result}`
// }

let main = document.querySelector('#main')
//console.log(main)
//let thumbnail = document.querySelectorAll('#thumbnail')
//console.log(thumbnail)
//let thumbnailLoop = thumbnail.forEach(photo => console.log(photo.innerHTML))

const display = photo => {
  return (main.src = photo.src)
}
