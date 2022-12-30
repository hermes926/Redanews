import { Radio, RadioGroup, Stack, Button } from '@chakra-ui/react'
import {useState} from 'react'

const Difficulty = ({difficulty, setDifficulty})=>{
	const [open, setOpen] = useState(false)
	console.log(difficulty)
	return (
		<>
		<Button w="90%" variant="link" onClick={()=>{
			if(open)
				setOpen(false) 
			else
				setOpen(true) }}>Difficulty</Button>
		{(open)? (
		<RadioGroup onChange={setDifficulty} value={difficulty}>
      		<Stack direction='row'>
        		<Radio value='Easy'>Easy</Radio>
        		<Radio value='Medium'>Medium</Radio>
        		<Radio value='Hard'>Hard</Radio>
      		</Stack>
    	</RadioGroup>
    	) : <></>}
		</>
	)
}

export default Difficulty