import {HStack, Button, ButtonGroup, IconButton} from '@chakra-ui/react'
import {BiMailSend} from 'react-icons/bi'


const DeviceCTA = () => {

    return (
        <HStack justifyContent="center" mb="10px">
            <ButtonGroup isAttached colorScheme="blue">
                <Button mr='-px' w="200px">Connect</Button>
                <IconButton borderLeft="1px solid white" aria-label='Add to friends' fontSize="xl" w="50px" icon={<BiMailSend />} />
            </ButtonGroup>
        </HStack>
    )
}

export default DeviceCTA