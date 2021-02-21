const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })

}

const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits)) //problem one was in this line 'data.hitS' changed to 'data.hits'
    .catch(err => console.log(err))
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');

  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    element.classList.remove('added');
    sliders.splice(item, 1);// alert('Hey, Already added !')
  }
}
var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })

  //all slider showing container (first extra feature added)
  const allSliderContainer = document.getElementById('all-slider-container');
  var allSliderContainerDiv = document.createElement('div');
  allSliderContainerDiv.className = 'all-slider-container-div'
  allSliderContainerDiv.innerHTML = '';
  for (let i = 0; i < sliders.length; i++) {
    const sliderImage = sliders[i];
    const sliderContainerDiv = document.createElement('div');
    sliderContainerDiv.innerHTML = `
      <img src="${sliderImage}">
  `
    allSliderContainerDiv.appendChild(sliderContainerDiv);
  }
  allSliderContainer.appendChild(allSliderContainerDiv);
  //.............

  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, Math.abs(duration));  //problem three has been solved in this line
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

//common function
const searchImage = () => {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
}
searchBtn.addEventListener('click', searchImage)

//new code added
const search = document.getElementById('search');
search.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    searchImage();
  }
})
//..........

sliderBtn.addEventListener('click', function () {
  createSlider()
})

// button feature(second feature added)

const hideCollection = document.getElementById('Hide-collection');
hideCollection.addEventListener('click', () => {
  const hideCollection = document.getElementById('Hide-collection');
  const allSliderContainer = document.getElementById('all-slider-container');

  if (hideCollection.innerText === 'Hide collection') {
    allSliderContainer.style.display = 'none';
    hideCollection.innerText = 'Display collection';
  }
  else if (hideCollection.innerText === 'Display collection') {
      allSliderContainer.style.display = 'block';
      hideCollection.innerText = 'Hide collection';
  }
}
)
