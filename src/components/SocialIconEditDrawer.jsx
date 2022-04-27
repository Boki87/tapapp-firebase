import {useEffect, useState} from 'react'
import { Image, Spacer, HStack, Button, Progress, Box, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,DrawerCloseButton,FormControl, FormLabel, Input, Switch} from '@chakra-ui/react'
import { useSocialsContext } from '../context'
import {AiOutlineSave} from 'react-icons/ai'
import { getLogoForSocialMedia } from '../lib/utils'

const SocialIconEditDrawer = ({isOpen, onClose, editSocialId}) => {


    const {socials, updateSocial, updatingSocials} = useSocialsContext()
    const [social, setSocial] = useState(null)

    useEffect(() => {
        if(isOpen && editSocialId) {
            setSocial(socials.find(social => social.id === editSocialId))
        }
    }, [isOpen, editSocialId])

    function updateSocialHandler(e) {
        let val = e.target.name == 'is_public' ? e.target.checked : e.target.value
        setSocial({...social, [e.target.name]: val})
    }

    function saveSocialHandler() {
        updateSocial(editSocialId, social)
    }


    if(!social) {
        return null
    }

    let imageSrc = getLogoForSocialMedia(social.provider)
    
    return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" zIndex={1500} position="relative">
        

        <DrawerOverlay />
        <DrawerContent position="relative">
            {updatingSocials && <Progress size="xs" isIndeterminate position="absolute" top="0" left="0" w="full"/>}
            
            <DrawerCloseButton onClick={onClose}/>
        {/* <DrawerHeader borderBottomWidth='1px'>{social.name}</DrawerHeader> */}
        <Box h="30px"></Box>
        <DrawerBody display="flex" flexDirection="column">
            

            <Box display="flex" justifyContent="center" mb="20px">
                <Image src={imageSrc}/>
            </Box>
            <FormControl mb="20px">
                <FormLabel htmlFor="name">Custom Title</FormLabel>
                <Input placeholder="Custom Title" variant="filled" name="name" value={social.name} onInput={updateSocialHandler}/>
            </FormControl>
            <FormControl mb="20px">
                <FormLabel htmlFor="url">Url</FormLabel>
                <Input placeholder="URL" variant="filled" name="url" value={social.url} onInput={updateSocialHandler}/>
            </FormControl>
            <FormControl mb="20px">
                <FormLabel htmlFor="is_public">Is Public</FormLabel>
                <Switch colorScheme="blue" size="lg" name="is_public" isChecked={social.is_public} value={social.is_public} onChange={updateSocialHandler}/> 
            </FormControl>
            <Spacer />
            <HStack>
                <Button onClick={onClose}>Close</Button>
                <Spacer />
                <Button onClick={saveSocialHandler} rightIcon={<AiOutlineSave />} colorScheme="blue">SAVE</Button>
            </HStack>
        </DrawerBody>
        </DrawerContent>
    </Drawer>
    )
}

export default SocialIconEditDrawer