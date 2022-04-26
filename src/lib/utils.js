import heic2any from 'heic2any'


export function getLogoForSocialMedia(socialMedia) {

    let imageSrc = ''
    switch(socialMedia) {
        case 'facebook':
            imageSrc = '/assets/social-icons/facebook.png'
            break
        case 'twitter':
            imageSrc = '/assets/social-icons/twitter.png'
            break
        case 'instagram':
            imageSrc = '/assets/social-icons/instagram.png'
            break
        case 'youtube':
            imageSrc = '/assets/social-icons/youtube.png'
            break
        case 'linkedin':
            imageSrc = '/assets/social-icons/linkedin.png'
            break
        case 'github':
            imageSrc = '/assets/social-icons/github.png'
            break
        case 'spotify':
            imageSrc = '/assets/social-icons/spotify.png'
            break
        case 'tiktok':
            imageSrc = '/assets/social-icons/tiktok.png'
            break
        case 'pinterest':
            imageSrc = '/assets/social-icons/pinterest.png'
            break
        case 'strava':
            imageSrc = '/assets/social-icons/strava.png'
            break
        case 'phone':
            imageSrc = '/assets/social-icons/phone.png'
            break
        default:
            imageSrc = ''
            break
    }    

    return imageSrc
}


export function getLinkForSocialMedia(type, provider, url) {
    let link = ''
    let socialPrefix = ''

    switch(provider) {
        case 'facebook':
            socialPrefix = 'https://www.facebook.com/'
            break
        case 'twitter':
            socialPrefix = 'https://www.twitter.com/'
            break
        case 'instagram':
            socialPrefix = 'https://www.instagram.com/'
            break
        case 'youtube':
            socialPrefix = 'https://www.youtube.com/'
            break
        case 'linkedin':
            socialPrefix = 'https://www.linkedin.com/'
            break
        case 'github':
            socialPrefix = 'https://github.com/'
            break
        default:
            socialPrefix = ''
            break
        //TODO: add more social media providers
    }


   if(type == 'social') {
    if(url.includes('http') || url.includes('https')) {
        link = url
    }else {
        link = `${socialPrefix}${url}`
    }
   }
  
   if(type == 'contact') {

        if(provider == 'email') {
                link = `mailto:${url}`
        }else if(provider == 'phone') {
                link = `tel:${url}`
        }else if(provider == 'website') {
                if(url.includes('http') || url.includes('https')) {
                    link = url
                }else {
                    link = `https://${url}`
                }
        }
   }

   return link
}



export function compressImage(imageData) {
    
    return new Promise((resolve, reject) => {

        if(imageData.type.toLowerCase() == 'image/heic') {
            heic2any({
                blob: imageData,
                toType: 'image/jpeg',
                quality: 0.5
            }).then(newImage => {
                let file = new File([newImage], 'avatar.jpg', {type: 'image/jpeg'})
                resolve(file)
            })
        }

        var reader = new FileReader();
        reader.onload = function(readerEvent) {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const img = new Image()
            img.onload = () => {
                const width = img.width
                const height = img.height
                canvas.width = width
                canvas.height = height
                ctx.drawImage(img, 0, 0, width, height)
                const data = canvas.toDataURL('image/jpeg', 0.5)
                fetch(data).then(res => res.blob()).then(blob => {
                    console.log(blob);
                    let file = new File([blob], 'avatar.jpg', {type: 'image/jpeg'})
                    resolve(file)
                })
            }
            img.src = readerEvent.target.result
        }
        reader.readAsDataURL(imageData)
    })
}
