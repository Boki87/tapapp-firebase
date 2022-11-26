import {useState} from 'react'
import {Box, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,DrawerCloseButton} from '@chakra-ui/react'
import {socials as socialsData} from '../lib/utils'
import SocialIcon from './SocialIcon'
import { useSocialsContext } from '../context'

const SocialIconDrawer = ({isOpen, onClose, deviceId}) => {

    const {addSocial, socials} = useSocialsContext()

    function addLink(link) {
        addSocial(link, deviceId)
        onClose()
    }

    return (
        <>
            <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md" borderRadius="md">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton onClick={onClose}/>
                <DrawerHeader borderBottomWidth='1px'>Add Link</DrawerHeader>
                <DrawerBody p="0px">
                    <Box display="flex" flexWrap="wrap" justifyContent="center" mb="80px">
                        {socialsData.map(social => {
                                let hasEmbedVideo = socials.filter(s => s.type == 'video')[0]
                                if(hasEmbedVideo?.type == social.type) {
                                    return null
                                } else {
                                    return (<SocialIcon onClick={() => addLink(social)} key={social.provider} social={social}/>)
                                }
                            }
                        )}
                    </Box>
                </DrawerBody>
                </DrawerContent>
            </Drawer>

        </>
    )
}
export default SocialIconDrawer