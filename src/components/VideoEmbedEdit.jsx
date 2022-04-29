import {useEffect, useState} from 'react'
import {Text, Box, Center, FormControl,FormLabel, Input, Switch, Button} from '@chakra-ui/react'
import { sanitizeVideo } from '../lib/utils';
import {AiOutlineSave} from 'react-icons/ai'
import {RiDeleteBinLine} from 'react-icons/ri'
import {useSocialsContext} from '../context'


const VideoEmbedEdit = ({videoData}) => {

    const {updateSocial, deleteSocial} = useSocialsContext()
    const [videoState, setVideoState] = useState(videoData)
    const [videoUrl, setVideoUrl] = useState('')
    const [loading, setLoading] = useState(false)

    function changeHandler(e) {
        let val = e.target.name == 'is_public' ? e.target.checked : e.target.value
        let prop = e.target.name
        setVideoState({...videoState, [prop]: val})
    }

    function saveHandler() {
        setLoading(true)
      updateSocial(videoState.id, videoState)
      setTimeout(() => {
        setLoading(false)
      },400)
    }

    function deleteHandler() {
        setLoading(true)
        setTimeout(() => {
            deleteSocial(videoState.id)
        },400)
    }

    useEffect(() => {
       let url = sanitizeVideo(videoState.url) 
       setVideoUrl(url)
    },[videoState])

    return (
        <Box p="10px" bg="gray.50" borderRadius="lg" border="1px" borderColor="gray.300" mb='20px'>
            <Text mb="10px">Embed Video</Text>
            {videoUrl && videoUrl != '' && <iframe src={videoUrl} style={{width:'100%', height: '200px', borderRadius: '10px', marginBottom:'10px'}}/> }
            <FormControl mb="20px">
                    <FormLabel htmlFor="url">URL:</FormLabel>
                    <Input placeholder="Url" name="url" value={videoState.url} onInput={changeHandler}/>
            </FormControl>
             <FormControl mb="20px">
                    <FormLabel htmlFor="title">Title:</FormLabel>
                    <Input placeholder="Title" name="title" value={videoState.title} onInput={changeHandler}/>
                </FormControl>      
            <FormControl mb="20px">
                    <FormLabel htmlFor="is_public">Is Public:</FormLabel>
                    <Switch colorScheme="blue" size="lg" name="is_public" isChecked={videoState.is_public} value={videoState.is_public} onChange={changeHandler}/> 
            </FormControl> 
            <Center>
                <Button isLoading={loading} onClick={deleteHandler} rightIcon={<RiDeleteBinLine />} colorScheme="red">Delete</Button>
                <Box w="10px"></Box>
                <Button isLoading={loading} onClick={saveHandler} rightIcon={<AiOutlineSave />} colorScheme="blue">Save</Button>
            </Center>
        </Box>
    )
}

export default VideoEmbedEdit