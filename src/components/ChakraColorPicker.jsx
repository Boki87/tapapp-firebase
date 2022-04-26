import {useState} from 'react'
import {Text, Popover, PopoverTrigger, Button,PopoverContent, PopoverArrow, PopoverBody, PopoverHeader, PopoverCloseButton, Box} from '@chakra-ui/react'

const defaultColors = [
    'gray.400',
    'red.400',
    'orange.400',
    'yellow.400',
    'green.400',
    'teal.400',
    'blue.400',
    'cyan.400',
    'purple.400',
    'pink.400',
]


const ChakraColorPicker = ({value, colors = defaultColors, onChange}) => {

    const [selectedColor, setSelectedColor] = useState(value)
    const [isOpen, setIsOpen] = useState(false)


    function setColor(color) {
        onChange(color)
        setIsOpen(false)
    }



    return (
        <Popover isOpen={isOpen} closeOnBlur={true} closeOnEsc={true}>
            <PopoverTrigger>
                <Button onClick={() => {setIsOpen(!isOpen)}}>
                    {/* <Text>Background: </Text> */}
                    <Box bg={value} w="20px" h="20px" ml="0px" borderRadius="full"></Box>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton onClick={() => {setIsOpen(false)}}/>
                <PopoverHeader>Pick a color</PopoverHeader>
                <PopoverBody display="flex" flexWrap="wrap" justifyContent="center">
                
                    {colors.map(color => (<Box onClick={() => setColor(color)} minW="50px" minH="50px" m="3px" borderRadius="md" bg={color} cursor="pointer" key={color}></Box>))}

                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default ChakraColorPicker