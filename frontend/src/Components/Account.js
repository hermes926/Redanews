import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Button,
} from '@chakra-ui/react'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

import {ChevronDownIcon} from '@chakra-ui/icons'

const Account = ({navigate, MenuClick})=>{
	

	return (
		<Menu>
  			<MenuButton as={Button} w="90%" variant="link">
    			Account
  			</MenuButton>
  			<MenuList>
    			<MenuItem onClick={()=>{navigate('/account/history');MenuClick()}}>History</MenuItem>
    			<MenuItem onClick={()=>{navigate('/account/setting');MenuClick()}}>Settings</MenuItem>
  			</MenuList>
		</Menu>
	)
}

export default Account