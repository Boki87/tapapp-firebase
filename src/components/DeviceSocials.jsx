import {Box} from '@chakra-ui/react'
import SocialIcon from './SocialIcon'

const DeviceSocials = ({socials}) => {
    return <Box mb="20px" w="full" p="10px" maxW="md" display="flex" justifyContent="center" flexWrap="wrap" mx="auto">

        {socials.map(social => {
            return <SocialIcon key={social.id} social={social} />
        })}

    </Box>
}

export default DeviceSocials