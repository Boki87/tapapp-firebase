import {Box} from '@chakra-ui/react'
import SocialIcon from './SocialIcon'
import { sanitizeVideo } from '../lib/utils'

const DeviceSocials = ({socials}) => {

    return <Box>
                <Box mb="10px" p="10px" maxW="md" mx="auto">
                    {socials.map(social => {
                        if(social.is_public && social.type == 'video') {
                            return (
                                <iframe src={sanitizeVideo(social.url)} style={{width:'100%', height:'200px', borderRadius: '10px'}}/>
                            )
                        }
                    })}
                </Box> 
                <Box mb="20px" w="full" p="10px" maxW="md" display="flex" justifyContent="center" flexWrap="wrap" mx="auto">

                {socials.map(social => {
                    if(social.type != 'video') {
                        return <SocialIcon key={social.id} social={social} />
                    }
                })}

            </Box>
        </Box>
}

export default DeviceSocials