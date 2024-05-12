const types = []
for (const item of pokedex) {
  for (const type of item.type) {
    if (types.includes(type) == false) {
      types.push(type)
      
    }
  }
}
types.sort()

// display types as navigation
const showTypes = document.getElementById('types')
for (const item of types){
  const $anchor = document.createElement('a')
  $anchor.classList.add('nav')
  $anchor.setAttribute('href', `#${item}`)
  $anchor.textContent = item

  $anchor.addEventListener('click', function(e) {
    e.preventDefault()
    const className = e.target.textContent
    const tergetSec = document.querySelector(`section.${className}`)

    if (tergetSec) {
      tergetSec.scrollIntoView({behavior: 'smooth'})
    }
  })

  showTypes.append($anchor)
}


const element = pokedex.map(item => item.type)
const typeArray = element.reduce((acc, val) => acc.concat(val), [])

function totalPokemon () {
  const typeElement = pokedex.map(item => item.type)
  const typeArray = typeElement.reduce((acc, val) => acc.concat(val), [])

  const typeCount = (arr) => {
    const count = {}
    arr.forEach((el) => {
      count[el] = (count[el] || 0) + 1
    })
    return count
  }
  const total = typeCount(typeArray)
  return total
}

function totalHP () {
  const HP = {}
  for (pokemon of pokedex) {
    for (el of pokemon.type) {
      if (!HP[el]) {
        HP[el] = 0
      }
      HP[el] += pokemon.base.HP
    }
  }
  return HP
}

function totalAttack () {
  const Attack = {}
  for (pokemon of pokedex) {
    for (el of pokemon.type) {
      if (!Attack[el]) {
        Attack[el] = 0
      }
      Attack[el] += pokemon.base.Attack
    }
  }
  return Attack
}


function createTypePage (i) {
  const index = types[i]
  const $type = document.createElement('section')
  $type.classList.add(index)
  const $heading = document.createElement('h1')
  const $total = document.createElement('p')
  $total.classList.add('total')
  const $link = document.createElement('a')
  $link.setAttribute('href', '#top')
  $link.textContent = 'Back to Top'
  const $item = document.createElement('div')
  $item.classList.add('item')

  
  $heading.innerHTML = 'Type: ' + index + ' (' + totalPokemon()[index] +')'
  $total.innerHTML = 'Total HP: ' + totalHP()[index] +  ' | ' + 'Total Attack: ' + totalAttack()[index]

  for (const element of pokedex) {
    if (element.type.includes(index)) {
      const $detail = document.createElement('div')
      $detail.classList.add('detail')
      $detail.innerHTML = `
      <a href="${element.url}" target="_blank">
      <h2>${element.name}</h2>
      <div class="img">
      <img src= "${element.sprite}" alt="pokemon">
      </div>
      <div class="base">
        <p>HP: ${element.base.HP}</p>
        <p>Attack: ${element.base.Attack}</p>
        <p>Defense: ${element.base['Defense']}</p>
        <p>Sp. Attack: ${element.base['Sp. Attack']}</p>
        <p>Sp. Defense: ${element.base['Sp. Defense']}</p>
        <p>Speed: ${element.base['Speed']}
      </div>
      </a>`

      $item.append($detail)
    }
  }

  $type.append($heading)
  $type.append($total)
  $type.append($link)
  $type.append($item)

  return $type
}


const $fragment = document.createDocumentFragment()
for (let i = 0; i < types.length; i++) {
  $fragment.append(createTypePage(i))
}
const $character = document.getElementById('character')
$character.append($fragment)



