import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
import { Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup'
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
    FormErrorMessage,
} from '@chakra-ui/react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';


const reactForm = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_vfle7df', 'template_m6h65fo', form.current, 'Fs3YNFEZyiz8ps4sj')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        formik.setValues((prevValues) => ({
            ...prevValues,
            messagingUtil: {
                ...prevValues.messagingUtil,
                [name]: checked,
            },
        }));
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            gsm: "",
            project: "",
            messagingUtil: {
                Email: false,
                Phone: false,
                Sms: false,
            },
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .matches(/^[A-Za-zşŞöÖüÜğĞİı ]*$/, 'Lütfen geçerli bir ad girin')
                .max(40)
                .required("Lütfen adınızı girin"),
            surname: Yup.string()
                .matches(/^[A-Za-zşŞöÖüÜğĞİı ]*$/, 'Lütfen geçerli bir soyad girin')
                .max(40)
                .required("Lütfen soyadınızı girin"),
            email: Yup.string()
                .email("Lütfen geçerli bir e-posta adresi girin")
                .required("Lütfen bir e-posta adresi girin"),
            gsm: Yup.string()
                .required('Lütfen bir telefon numarası girin'),
            project: Yup.string()
                .required('Lütfen bir proje seçin'),
            messagingUtil: Yup.object()
        }),

        onSubmit: (values, actions) => {
            alert(JSON.stringify(values, null, 2));
            sendEmail(
                {
                    name: values.name,
                    surname: values.surname,
                    email: values.email,
                    gsm: values.gsm,
                    project: values.project,
                    messagingUtil: values.messagingUtil
                }
            );
            actions.resetForm();
        },
    }
    )


    return (
        <Center h="100vh">
            <form ref={form} onSubmit={formik.handleSubmit}>
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

                    {/* Başlıkları Düzenle */}
                    {/* AD-SOYAD */}
                    <Grid gridTemplateColumns="1fr 1fr" gridColumn="1 / span 2" gap={2}>
                        <FormControl isInvalid={formik.errors.name && formik.touched.name}>
                            <FormLabel>Ad</FormLabel>
                            <Input
                                name="name"
                                type="text"
                                placeholder="Adınız"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={formik.errors.surname && formik.touched.surname}>
                            <FormLabel>Soyad</FormLabel>
                            <Input
                                name="surname"
                                type="text"
                                placeholder="Soyadınız"
                                onChange={formik.handleChange}
                                value={formik.values.surname}
                                onBlur={formik.handleBlur}

                            />
                            <FormErrorMessage>{formik.errors.surname}</FormErrorMessage>
                        </FormControl>
                    </Grid>

                    {/* E-POSTA */}
                    <FormControl
                        isInvalid={formik.errors.email && formik.touched.email}
                        gridColumn="1 / span 2">
                        <FormLabel>E-Posta</FormLabel>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Örnek: adınız@örnek.com"
                            onChange={formik.handleChange}
                            values={formik.values.email}
                            onBlur={formik.handleBlur}

                        />
                        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                        <FormHelperText>E-Posta bilgileriniz başkalarıyla paylaşılmaz.</FormHelperText>
                    </FormControl>

                    {/* GSM  */}
                    <Grid gridTemplateColumns="1fr 2fr" gridColumn="1 / span 2" gap={2}>
                        <FormControl
                            gridColumn="1 / span 2"
                            isInvalid={formik.errors.gsm && formik.touched.gsm}
                        >
                            <FormLabel>Gsm</FormLabel>
                            {console.log(formik.values)}
                            <PhoneInput
                                name="gsm"
                                placeholder="Telefon"
                                defaultCountry="TR"
                                onBlur={formik.handleBlur}
                                value={formik.values.gsm}
                                onChange={formik.handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.375rem 0.75rem',
                                    fontSize: '1rem',
                                    lineHeight: '1.7',
                                    color: 'black',
                                    backgroundColor: 'white',
                                    border: '1px solid #CBD5E0',
                                    borderRadius: '0.25rem',
                                }}
                                containerstyle={{
                                    width: '100%',
                                    border: '1px solid #CBD5E0',
                                    borderRadius: '0.25rem',
                                }}
                            />
                            <FormErrorMessage>{formik.errors.gsm}</FormErrorMessage>
                        </FormControl>
                    </Grid>

                    {/* PROJE */}
                    <FormControl
                        isInvalid={formik.errors.project && formik.touched.project}
                        gridColumn="1 / span 2">
                        <FormLabel>Lütfen ilgilendiğiniz bir proje seçin</FormLabel>
                        <Select
                            name="project"
                            onChange={formik.handleChange}
                            value={formik.values.project}
                            onBlur={formik.handleBlur}
                            placeholder='Lütfen Seçin'>
                            <option value='proje-1'>proje-1</option>
                            <option value='proje-2'>proje-2</option>
                            <option value='proje-3'>proje-3</option>
                            <option value='proje-4'>proje-4</option>
                        </Select>
                        {console.log(formik.values.messagingUtil)}
                        <FormErrorMessage>{formik.errors.project}</FormErrorMessage>
                    </FormControl>

                    {/* İLETİŞİM YÖNTEMİ */}
                    <FormControl
                        gridColumn="1 / span 2"
                        isInvalid={formik.errors.messagingUtil && formik.touched.messagingUtil}
                    >
                        <FormLabel>İletişim Seçenekleri</FormLabel>
                        <Flex justifyContent="space-between">
                            <Checkbox
                                name="Sms"
                                value={formik.values.messagingUtil.Sms}
                                onChange={handleCheckboxChange}
                                onBlur={formik.handleBlur}
                            >Sms</Checkbox>

                            <Checkbox
                                name='Email'
                                value={formik.values.messagingUtil.Email}
                                onChange={handleCheckboxChange}
                                onBlur={formik.handleBlur}
                            >E-Posta</Checkbox>
                            <Checkbox
                                name='Phone'
                                onChange={handleCheckboxChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.messagingUtil.Phone}>Telefon</Checkbox>
                        </Flex>
                        <FormErrorMessage>{formik.errors.messagingUtil}</FormErrorMessage>

                    </FormControl>

                    {/* GÖNDER */}
                    <Button
                        gridColumn="1 / span 2"
                        colorScheme='teal'
                        type='submit'
                    >
                        Gönder
                    </Button>
                </Grid>
            </form>

        </Center >
    )
}


export default reactForm