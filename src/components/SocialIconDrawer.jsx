import {useState} from 'react'
import {Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,DrawerCloseButton} from '@chakra-ui/react'
import {socials as socialsData} from '../lib/utils'
import SocialIcon from './SocialIcon'
import { useSocialsContext } from '../context'

const SocialIconDrawer = ({isOpen, onClose, deviceId}) => {

    const {addSocial} = useSocialsContext()

    function addLink(link) {
        addSocial(link, deviceId)
        onClose()
    }

    return (
        <>
            <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="full" borderRadius="md">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton onClick={onClose}/>
                <DrawerHeader borderBottomWidth='1px'>Add Link</DrawerHeader>
                <DrawerBody display="flex" flexWrap="wrap" justifyContent="center" p="0px" mb="30px">
                    {socialsData.map(social => (<SocialIcon onClick={() => addLink(social)} key={social.provider} social={social}/>))}
                </DrawerBody>
                </DrawerContent>
            </Drawer>

        </>
    )
}
export default SocialIconDrawer