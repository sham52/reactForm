import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
import { Field, Form, Formik } from 'formik';
import {
    Grid,
    Box,
    Heading,
    Text,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Button,
    Checkbox,
    Center,
    Flex,
    Select,
} from '@chakra-ui/react';
import PhoneNumberInput from './PhoneNumberInput';

const reactForm = () => {

    const validateName = (value) => {
        let error;
        if (!value) {
            error = 'Lütfen adınızı giriniz';
        }
        return error;
    }

    return (
        <Center h="100vh">
            <Grid
                templateColumns="repeat(2, 1fr)"
                gap={5}
                width="400px"
                padding={6}
                boxShadow="md"
                borderRadius="md"
            >
                <Box gridColumn="1 / span 2">
                    <Heading size="xl" textAlign="center">
                        Bilgi Talep Formu
                    </Heading>
                    <Text textAlign="center" fontWeight="thin">Projelerimiz ile ilgili detaylı bilgi almak için lütfen aşağıdaki formu doldurun. Biz size ulaşalım.</Text>
                </Box>
                <Grid gridTemplateColumns="1fr 1fr" gridColumn="1 / span 2" gap={2}>
                    <FormControl>
                        <FormLabel>Ad</FormLabel>
                        <Input type="text" placeholder="Ad" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Soyad</FormLabel>
                        <Input type="text" placeholder="Soyad" />
                    </FormControl>
                </Grid>
                <FormControl gridColumn="1 / span 2">
                    <FormLabel>E-Posta</FormLabel>
                    <Input type="email" placeholder="Örnek: adınız@örnek.com" />
                    <FormHelperText>E-Posta bilgileriniz başkalarıyla paylaşılmaz.</FormHelperText>
                </FormControl>
                <Grid gridTemplateColumns="1fr 2fr" gridColumn="1 / span 2" gap={2}>
                    <PhoneNumberInput />
                </Grid>
                <FormControl gridColumn="1 / span 2">
                    <FormLabel>Lütfen ilgilendiğiniz bir proje seçin</FormLabel>
                    <Select placeholder='Lütfen Seçin'>
                        <option value='proje-1'>proje-1</option>
                        <option value='proje-2'>proje-2</option>
                        <option value='proje-3'>proje-3</option>
                        <option value='proje-4'>proje-4</option>
                    </Select>
                </FormControl>
                <FormControl gridColumn="1 / span 2">
                    <FormLabel>Elektronik ileti almak istiyorum</FormLabel>
                    <Flex justifyContent="space-between">
                        <Checkbox value="Sms">Sms</Checkbox>
                        <Checkbox value="E-Posta">E-Posta</Checkbox>
                        <Checkbox value="Telefon">Telefon</Checkbox>
                    </Flex>
                </FormControl>

                <Button
                    gridColumn="1 / span 2"
                    colorScheme='teal'
                    type='submit'
                >
                    Gönder
                </Button>
            </Grid>
        </Center>
    )
}


export default reactForm