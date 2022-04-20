import {Box} from '@chakra-ui/react'
import {useParams} from 'react-router-dom'

const EditDevice = () => {

    const {id} = useParams()

    return (
        <Box w="full" h="full">
            Edit {id}
        </Box>
    )
}

export default EditDevice