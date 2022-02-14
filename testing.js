// router.get('/', async (req, res) => {
//   let houses = await Houses.find(req.query)
// 	  if (req.query == '')
//   //console.log({ houses })
//   //console.log(req.query)
//   //delete objects and just let place and n of rooms (if the key is what I dont want to appear then delete, I can do a for in as well with the deletes )
//   //let sort last, the search box is the same as the google
//   //.sort('price') and sort('-price') --> req.body.sort
//
//   res.render('houses/list', { user: req.user, houses })
// })

let search = {
  location: 'Koh Phangam',
  rooms: '2',
  price: '40',
  sort: '',
  search: ''
}

const deleteEmptyStrings = o => {
  for (e in o) {
    if (o[e] == '') {
      delete o[e]
    }
  }
  return o
}

console.log(deleteEmptyStrings(search))
