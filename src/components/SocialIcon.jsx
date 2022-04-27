import {Box, Image} from '@chakra-ui/react'
import {getLogoForSocialMedia, getLinkForSocialMedia} from '../lib/utils'

const SocialIcon = ({social, onClick, editMode}) => {
  
    let imageSrc = getLogoForSocialMedia(social.provider)
    let link = getLinkForSocialMedia(social.type, social.provider, social.url)

    let image = <Image src={imageSrc} objectFit='contain' w="80%" h="80%"/>

    function openLink() {
        if(onClick) {
            onClick()
        }else {
            window.open(link, '_blank')
        }
    }

    if(!editMode && !social.is_public) {
        return null
    }

    return (

            <Box onClick={openLink} minW="100px" minH="100px" margin="10px" position="relative" display='flex' alignItems="center" justifyContent="center">
                {!social.is_public && editMode && <Box position="absolute" w='80%' borderRadius="full" h="80%" bg="gray.400" opacity={0.8}></Box>}
                {image}
            </Box>
    )
}

export default SocialIcon