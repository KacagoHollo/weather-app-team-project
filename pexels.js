const changeImageBackground = (x, images) => {
    console.log("asd")
    document.body.style.backgroundImage = `url(${images[x]})`;
  }
  
const changeImageTimer = (images) => {
    var index = 0;

    changeImageBackground(index, images);

    setInterval(() => {
        index = index + 1 >= images.length ? 0 : index + 1;
        changeImageBackground(index, images);
    }, 10000);
  }

const renderPexelsPhotos = async (imagesData) => {
    const imageUrls = imagesData.photos.map(x => x.src.landscape)
    const defaultImageUrl = `https://images.hdqwalls.com/wallpapers/colorful-mountains-night-minimal-8k-w5.jpg`

    document.body.style.backgroundImage = `url(${imageUrls.length > 0 ? imageUrls[imageUrls.length -1] : defaultImageUrl})`

    preloadImages(imageUrls);
    changeImageTimer(imageUrls);
}

const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
    return img
}
  
const preloadImages = (imageUrls) => {
    const images = []

    for (var i = 0; i < imageUrls.length; i++) {
      images[i] = preloadImage(imageUrls[i])
    }

    return images
}

const getPexelsCityImages = async (city) => {
    return await fetch(`https://api.pexels.com/v1/search?query=${city}`,{
            headers: {
                 Authorization: "563492ad6f91700001000001f81c10909ede48159c8bb782f6f66418"
            }
    })
   .then(response => response.json())   
}