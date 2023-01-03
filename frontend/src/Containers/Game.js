import { Box, Container, HStack, Text, Button, Grid, GridItem, Input, Flex } from "@chakra-ui/react";

const Game = ()=>{
	return(
		<Grid
			h='90vh' 
			w='100%'
			templateAreas={`"top top"
				"middle_left middle_right"
				"bottom bottom"`}
			gridTemplateRows={'10% 80% 10%'}
			gridTemplateColumns={'70% 30%'}
		>
			<GridItem bg='orange' area={'top'}>
				<p>top</p>
			</GridItem>
			<GridItem bg='yellow' area={'middle_left'}>
				This is article.
			</GridItem>
			<GridItem bg='pink' area={'middle_right'}>
				<Flex>
					<Box w='20%'>#</Box>
					<Box w='40%'>Guess</Box>
					<Box w='40%'>Hits</Box>
				</Flex>
			</GridItem>
			<GridItem bg='white' area={'bottom'}>
				<Flex justify='center'>
				<HStack>
				<Button colorScheme='blue' size='md' variant='outline'>
    				Top
  				</Button>
  				<Input placeholder='Guess' variant='filled' colorScheme='blue'/>
  				<Button colorScheme='blue' size='md' variant='outline'>
    				Guess
  				</Button>
				</HStack>
				</Flex>
			</GridItem>
		</Grid>
	)
}

export default Game