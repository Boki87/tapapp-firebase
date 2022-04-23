import {Box, Image} from '@chakra-ui/react'
import {getLogoForSocialMedia, getLinkForSocialMedia} from '../lib/utils'

const SocialIcon = ({social}) => {
  
    let imageSrc = getLogoForSocialMedia(social.provider)
    let link = getLinkForSocialMedia(social.type, social.provider, social.url)

    let image = <Image src={imageSrc} objectFit='contain' w="80%" h="80%"/>

    return (
        <a href={link} target="_blank">
            <Box minW="100px" minH="100px" margin="10px" display='flex' alignItems="center" justifyContent="center">
                {image}
            </Box>
        </a>
    )
}

export default SocialIcon