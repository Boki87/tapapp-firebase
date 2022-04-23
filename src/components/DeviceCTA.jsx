import {HStack, Button, ButtonGroup, IconButton} from '@chakra-ui/react'
import {BiMailSend} from 'react-icons/bi'
import {getLinkForSocialMedia} from '../lib/utils'
import VCard from 'vcard-creator'

const DeviceCTA = ({deviceData, socialsData}) => {

    function saveToContacts() {
        console.log('save to contacts');
        console.log(deviceData);
        console.log(socialsData);

        const myVCard = new VCard()
        let name = deviceData.name
        let additionalInfo = deviceData.title
        myVCard.addName(name, '', additionalInfo)
       
        if(deviceData.avatar != '') {
            myVCard.addPhotoURL(deviceData.avatar)
        }

        socialsData.forEach(social => {
            if(social.type == 'social' && social.is_public) {
                let url = getLinkForSocialMedia(social.type, social.provider, social.url)
                myVCard.addURL(url)
            }

            if(social.type != 'social') {
                if(social.provider == 'email') {
                    myVCard.addEmail(social.url)
                }
                if(social.provider == 'website') {
                    myVCard.addUrl(social.url)
                }
                if(social.provider == 'phone') {
                    myVCard.addPhoneNumber(social.url)
                }
            }
        })

        const blob = new Blob([myVCard.toString()], { type: "text/vcard" });
        const elem = window.document.createElement("a");
        elem.href = window.URL.createObjectURL(blob);
        elem.download = "vcard.vcf";
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);

        // console.log(myVCard.toString())
    }

    async function shareProfile() {
        //TODO: add share profile
    }

    return (
        <HStack justifyContent="center" mb="10px">
            <ButtonGroup isAttached colorScheme="blue">
                <Button onClick={saveToContacts} mr='-px' w="200px">Connect</Button>
                <IconButton onClick={shareProfile} borderLeft="1px solid white" aria-label='Add to friends' fontSize="xl" w="50px" icon={<BiMailSend />} />
            </ButtonGroup>
        </HStack>
    )
}

export default DeviceCTA