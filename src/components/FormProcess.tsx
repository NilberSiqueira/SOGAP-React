import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from 'react';
import { Box,
         Button,
         FormControl,
         FormLabel,
         Input,
         Card, 
         CardHeader, 
         CardBody,                                      //Importação das Bibliotecas
         Heading,
         Modal,
         ModalOverlay,
         ModalContent,
         ModalHeader,
         ModalBody,
         ModalCloseButton,
         Select,
         Flex,
         useDisclosure,
         IconButton,
         Grid} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import User from "../models/User";
import { getAllUsers } from "../services/users";

//Interface para manipulação dos dados
interface FormData {
  title: string;
  description: string;
  objective: string;
  deadline: string;
  priority: string;
  responsible: string;
}

interface IconSettings{
  widthIcon: number,
  sizeIcon: string,
  heightIcon: number
}

//Função Principal
const FormP = ({widthIcon, sizeIcon, heightIcon}: IconSettings) => {




  const [usersList, setUsersList] = useState(new Array<User>())
  const [responsibleList, setResponsibleList] = useState(new Array<User>())
  useEffect(() => {
    (async () => {
      const listOfUsers = await getAllUsers()
      if (listOfUsers) {
        setUsersList(listOfUsers)
      }
          
        })();
    }, [])


    




  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    objective: '',
    deadline: '',
    priority: '',
    responsible: '',
  });

  //Função para lidar com mudanças no corpo do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { title, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [title]: value,
    }));
  };

  //Função para lidar com mudança no item de "Prioridade"
  const handleChangePrioridade = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setPrioridade("");
    console.log(e.target.value)
  };

  //Função para submeter os dados ao servidor BackEnd
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    //window.location.reload();
    //Fetch backEnd
  };
  
  //Variáveis para o Modal
  


  //Variável para o Calendário "DatePicker"
  const [prazo, setDeadline] = useState<null | Date>(null);

  //Variável para o boxList "Prioridade"
  const [priority, setPrioridade] = useState("Alta");

//Retorno em HTML do Formulário
  return (<>
    <IconButton margin=''
                                    aria-label="Btn Add Processo"
                                    bg="#58595B"
                                    color="white"
                                    size={sizeIcon}
                                    icon={<AddIcon h={heightIcon} w={widthIcon} />}
                                    _hover={{ color: "#58595B", bg: "white" }}
                                    onClick={onOpen}
                                    >
                                        
    </IconButton>
    <Modal size="xxl" isOpen={isOpen} onClose={onClose}>
        
      <ModalOverlay/>
        
        <ModalContent style={{ width: "1000px", height: "auto" }}>
          <Card bg="#58595B">
              <Box>
                <ModalHeader textAlign="center">
                  <CardHeader>
                    <Heading fontSize="30px" fontWeight="bold" color="#53C4CD" size='md'>
                      Novo Processo
                    </Heading>
                  </CardHeader>
                </ModalHeader>
              </Box>
            <ModalCloseButton style={{ width: "40px", height: "40px" }} rounded="100%" bg="#53C4CD" color="#ffffff" mt={7} mr={5}></ModalCloseButton>

            <ModalBody>
              <CardBody>
                <Box maxW="70%" mx="auto" p={1}>
                  <form onSubmit={handleSubmit}>
                    <FormControl id="title" mb={3}>
                      <FormLabel color="#ffffff" fontSize="20px" mb={1} ml={5}>Título</FormLabel>
                        <Input
                          rounded="100px" 
                          bg="#D9D9D9"
                          type="text"
                          title="title"
                          value={formData.title}
                          onChange={handleChange}
                          />
                    </FormControl>
                    <FormControl id="description" mb={3}>
                      <FormLabel color="#ffffff" fontSize="20px" mb={1} ml={5}>Descrição</FormLabel>
                        <Input style={{ height: "100px" }}
                          overflowY="auto"
                          rounded="20px" 
                          bg="#D9D9D9"
                          type="text"
                          title="description"
                          value={formData.description}
                          onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl id="objective" mb={3}>
                      <FormLabel color="#ffffff" fontSize="20px" mb={1} ml={5}>Objetivo</FormLabel>
                        <Input
                          rounded="100px" 
                          bg="#D9D9D9"
                          type="text"
                          title="objective"
                          value={formData.objective}
                          onChange={handleChange}
                          />
                    </FormControl>
                    <Box textAlign="center">
                      <FormControl id="deadline" mb={3}>
                        <FormLabel color="#ffffff" fontSize="20px" mb={1} ml={210}>Prazo</FormLabel>
                        <Input bg='white' placeholder="Selecione a data" size="md" type="date"/>
                      </FormControl>
                      <Flex justifyContent="center" alignItems="center">
                        <FormControl id="priority" mb={5}>
                          <FormLabel color="#ffffff" fontSize="20px" mb={1} ml={210}>Prioridade</FormLabel>
                            <Select  style={{ width: "37%", height: "40px" }} rounded="100px" color="#000000" bg="#D9D9D9"
                            value={formData.priority}
                            onChange={handleChangePrioridade}>
                              <option value="Alta">Alta</option>
                              <option value="Média">Média</option>
                              <option value="Baixa">Baixa</option>
                            </Select>
                        </FormControl>
                      </Flex>
                      <FormControl id="responsible" mb={3}>
                        <FormLabel color="#ffffff" fontSize="20px" mb={1} ml={5}>Responsável</FormLabel>
                          <Select  style={{ width: "100%", height: "40px" }} rounded="100px" color="#000000" bg="#D9D9D9"
                            value={''}
                            onChange={handleChangePrioridade}>
                              <option value=""></option>
                              {usersList.map( (user:User) => {
                                const setResponsible = ()=>{
                                  setResponsibleList(responsibleList.concat(user)) 
                                }
                                return <option onClick={setResponsible} key={user.id} value={user.id}>{user.name}</option>
                              })}
                              
                          </Select>
                          <Box>
                          <Grid marginLeft='1rem' templateColumns='repeat(2, 1fr)' gap='1.5rem'>
                            {responsibleList.map((responsible: User)=>{
                              const removeResponsible = ()=>{
                                setResponsibleList(responsibleList.filter((item)=> item !== responsible))
                              }
                              return <Box 
                              width='15rem' 
                              height='3rem' 
                              bg='#53C4CD' 
                              alignContent='center' 
                              padding='0.5rem 0.5rem 0.5rem 2rem' 
                              borderRadius='2rem'
                              marginTop='0.8rem'
                              marginRight='0.5rem'
                              >
                                {responsible.name}
                                <IconButton marginLeft='2rem'
                                    aria-label="Btn Add Processo"
                                    bg="white"
                                    color="#58595B"
                                    size='sm'
                                    borderRadius='3rem'
                                    icon={<CloseIcon />}
                                    _hover={{ color: "white", bg: "#58595B" }}
                                    onClick={removeResponsible}
                                  />
                              </Box>
                            })}
                          </Grid >
                          </Box>
                            
                      </FormControl>
                      <Button id="CreateButton" 
                        style={{ width: "90px", height: "35px" }}
                        fontWeight="bold"
                        rounded="100px" 
                        bg="#53C4CD" 
                        color="#ffffff" 
                        type="submit">Criar
                      </Button>
                    </Box>
                  </form>
                </Box>
              </CardBody>
            </ModalBody>
          </Card>
        </ModalContent>
    </Modal>
  </>
  );
};


export default FormP;

