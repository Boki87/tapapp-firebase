
export function getImageForSocialMedia(socialMedia) {

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
        default:
            socialPrefix = ''
            break
    }


   if(type == 'social') {
    if(url.includes('http') || url.includes('https')) {
        link = url
    }else {
        link = `${socialPrefix}${url}`
    }
   }else if(type == 'email') {
        //TODO: email link
   }else if(type == 'phone') {
        //TODO: phone link 
   }else if(type == 'website') {
        if(url.includes('http') || url.includes('https')) {
            link = url
        }else {
            link = `https://${url}`
        }
   }

   return link
}
