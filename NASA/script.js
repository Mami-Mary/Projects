const $form = document.getElementById('form')
const $date = document.getElementById('date')
const $display = document.getElementById('display')
const $favorite = document.getElementById('favorite')


function createItems(url, hdurl, title, date, explanation) {
  const $hdAnchor = document.createElement('a')
  $hdAnchor.setAttribute('href', hdurl)
  const $img = document.createElement('img')
  $img.setAttribute('alt', 'APOD image')
  $img.setAttribute('src', url)
  $hdAnchor.append($img)
  
  const $text = document.createElement('div')
  $text.classList.add('text')
  const $title = document.createElement('h3')
  $title.textContent = `${title}`
  const $d_para = document.createElement('p')
  $d_para.textContent = `${date}`
  const $explanation = document.createElement('p')
  $explanation.textContent = `${explanation}`
  $text.append($title, $d_para, $explanation)

  const $item = document.createElement('div')
  $item.classList.add('item')

  $item.append($hdAnchor, $text)
  return $item
}

function favoriteItems (url, hdurl, title, date) {
  const $hdAnchor = document.createElement('a')
  $hdAnchor.setAttribute('href', hdurl)
  const $img = document.createElement('img')
  $img.setAttribute('alt', 'APOD image')
  $img.setAttribute('src', url)
  $hdAnchor.append($img)
  
  const $text = document.createElement('div')
  $text.classList.add('text')
  const $title = document.createElement('h3')
  $title.textContent = `${title}`
  const $d_para = document.createElement('p')
  $d_para.textContent = `${date}`
  $text.append($title, $d_para)

  const $f_item = document.createElement('div')
  $f_item.classList.add('f_item')
  $f_item.append($hdAnchor, $text)

  const $deleteButton = document.createElement('button')
  $deleteButton.textContent = 'Delete'

  // $deleteButton.addEventListener('click', function(e) {
  //   e.preventDefault()

  //   const itemIndex = favoriteHistory.findIndex(favorite => favorite.url === url)
    
  //   if (itemIndex !== -1) {
  //     favoriteHistory.splice(itemIndex, 1)
  //     localStorage.setItem('favorite', JSON.stringify(favoriteHistory))
  //     $f_item.remove()
  //     console.log('after deleting', localStorage.getItem('favorite'))
  //   }
  // })

  $f_item.append($deleteButton)
  return $f_item
}





// Getting APOD's data
const $addButton = document.createElement('button')
$addButton.textContent = 'Save to Favorites'

let json

$form.addEventListener('submit', async function(e) {
  e.preventDefault()
  const dateValue = $date.value
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${dateValue}`
  console.log(apiUrl)
  const response = await fetch(apiUrl)
  json = await response.json()
  console.log(json)

  // display result
  if (json.media_type == 'image') {
    const $el = createItems(json.url, json.hdurl, json.title, json.date, json.explanation)
    $el.appendChild($addButton)
    $display.innerHTML = ''
    $display.appendChild($el)
  }
  else {
    const $sorry = document.createElement('h3')
    $sorry.textContent = 'Sorry, cannot display...'
    $display.innerHTML = ''
    $display.appendChild($sorry)
  }
})


const favoriteHistory = JSON.parse(localStorage.getItem('favorite'))




// Save as favorite
$addButton.addEventListener('click', function() {
 const saveItem = {
    url: json.url,
    hdurl: json.hdurl,
    title: json.title,
    date: json.date,
    explain: json.explanation
  }

  const $favImg = JSON.parse(localStorage.getItem('favorite')) || []
  $favImg.push(saveItem)
  
  localStorage.setItem('favorite', JSON.stringify($favImg))
  console.log('Local storage item', $favImg)

  const $el = favoriteItems(json.url, json.hdurl, json.title, json.date)
  $favorite.append($el)

  const $deleteButton = $el.querySelector('button')

  // For deleting images
  $deleteButton.addEventListener('click', function(e)
   {
    e.preventDefault()

    const itemIndex = $favImg.findIndex(favorite => favorite.url === saveItem.url)
    
    if (itemIndex !== -1) {
      $favImg.splice(itemIndex, 1)
      localStorage.setItem('favorite', JSON.stringify($favImg))
      $el.remove()
      console.log('Current data', localStorage.getItem('favorite'))
    }
   })
})


// For loading
window.addEventListener('load', function() {
  for (const el of favoriteHistory) {
    const $item = favoriteItems(el.url, el.hdurl, el.title, el.date)
    $favorite.append($item)

    const $deleteButton = $item.querySelector('button')
    
    $deleteButton.addEventListener('click', function(e)
    {
      e.preventDefault()

      const itemIndex = favoriteHistory.findIndex(favorite => favorite.url === el.url)
    
      if (itemIndex !== -1) {
        favoriteHistory.splice(itemIndex, 1)
        localStorage.setItem('favorite', JSON.stringify(favoriteHistory))
        $item.remove()
        console.log('Current data', localStorage.getItem('favorite'))
      }
    })
  }
})