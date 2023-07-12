import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
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
  InputGroup,
  Flex,
  InputLeftAddon,
  Select,
  FormErrorMessage,
  CheckboxGroup,
} from "@chakra-ui/react";
import "react-phone-number-input/style.css";

const reactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      areaCode: "",
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
        .matches(/^[A-Za-zşŞöÖüÜğĞİı ]*$/, "Lütfen geçerli bir ad girin")
        .max(40)
        .required("Lütfen adınızı girin"),
      surname: Yup.string()
        .matches(/^[A-Za-zşŞöÖüÜğĞİı ]*$/, "Lütfen geçerli bir soyad girin")
        .max(40)
        .required("Lütfen soyadınızı girin"),
      email: Yup.string()
        .email("Lütfen geçerli bir e-posta adresi girin")
        .required("Lütfen bir e-posta adresi girin"),
      gsm: Yup.number("Lütfen geçerli bir telefon numarası girin")
        .test(
          "len",
          "Lütfen 7 haneli telefon numaranızı girin",
          (val) => val.toString().length === 7
        )
        .required("Lütfen bir telefon numarası girin"),
      areaCode: Yup.string("Lütfen geçerli bir alan kodu girin")
        .test(
          "len",
          "Lütfen alan kodu ya da telefon numaranızın ilk 3 hanesini başında 0 olmadan tuşlayın",
          (val) => val.toString().length === 3
        )
        .required("Lütfen bir alan kodu girin"),
      project: Yup.string().required("Lütfen bir proje seçin"),
      messagingUtil: Yup.object()
        .test(
          "at-least-one-checked",
          "En az bir iletişim yöntemi seçilmelidir",
          (obj) => {
            return Object.values(obj).some((value) => value === true);
          }
        )
        .required(),
    }),
    onSubmit: async (values, actions) => {
      const emailContact = values.messagingUtil.Email ? "Evet" : "Hayır";
      const smsContact = values.messagingUtil.Sms ? "Evet" : "Hayır";
      const phoneContact = values.messagingUtil.Phone ? "Evet" : "Hayır";

      const data = {
        name: values.name,
        surname: values.surname,
        email: values.email,
        gsm: values.gsm,
        areaCode: values.areaCode,
        project: values.project,
        emailContact: emailContact,
        smsContact: smsContact,
        phoneContact: phoneContact,
      };
      console.log(data);
      sendEmail(data);
      
      actions.resetForm();
    },
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    formik.setValues((prevValues) => ({
      ...prevValues,
      messagingUtil: {
        ...prevValues.messagingUtil,
        [name]: checked,
      },
    }));
  };
  const sendEmail = async (data) => {
    try {
      setIsLoading(true); // Set isLoading to true before sending the email
      const result = await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        data,
        import.meta.env.VITE_PUBLIC_KEY
      );
      console.log(result.text);
      setIsLoading(false); // Set isLoading to false after successful email sending
      toast.success("Bilgi talebiniz başarıyla gönderildi");
    } catch (error) {
      console.log(error.text);
      setIsLoading(false); // Set isLoading to false if an error occurs during email sending
      toast.error("Bilgi talebiniz gönderilirken bir hata oluştu");
    }
  };

  return (
    <Center h="100vh">
      <form onSubmit={formik.handleSubmit}>
        <Toaster />
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={5}
          width="400px"
          padding={6}
          boxShadow="md"
          borderRadius="md"
        >

          <Box gridColumn="1 / span 2" paddingBottom={5}>
            <Heading paddingBottom={4} size="xl" textAlign="center">
              Bilgi Talep Formu
            </Heading>
            <Text textAlign="center" fontWeight="normal">
              Projelerimiz ile ilgili detaylı bilgi almak için lütfen aşağıdaki
              formu doldurun. Biz size ulaşalım.
            </Text>
          </Box>

          {/* AD-SOYAD */}
          <Grid gridTemplateColumns="1fr 1fr" gridColumn="1 / span 2" gap={2}>
            <FormControl isInvalid={formik.errors.name && formik.touched.name}>
              <FormLabel>Ad</FormLabel>
              <Input
                name="name"
                {...formik.getFieldProps("name")}
                placeholder="Adınız"
              />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={formik.errors.surname && formik.touched.surname}
            >
              <FormLabel>Soyad</FormLabel>
              <Input
                name="surname"
                {...formik.getFieldProps("surname")}
                placeholder="Soyadınız"
              />
              <FormErrorMessage>{formik.errors.surname}</FormErrorMessage>
            </FormControl>
          </Grid>

          {/* E-POSTA */}
          <FormControl
            isInvalid={formik.errors.email && formik.touched.email}
            gridColumn="1 / span 2"
          >
            <FormLabel>E-Posta</FormLabel>
            <Input
              name="email"
              type="email"
              {...formik.getFieldProps("email")}
              placeholder="Örnek: adınız@örnek.com"
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            <FormHelperText>
              E-Posta bilgileriniz başkalarıyla paylaşılmaz.
            </FormHelperText>
          </FormControl>
          {/* GSM  */}
          <Grid gridTemplateColumns="1fr 2fr" gridColumn="1 / span 2" gap={2}>
            <FormControl
              isInvalid={formik.errors.areaCode && formik.touched.areaCode}
            >
              <FormLabel>Alan Kodu</FormLabel>
              <InputGroup>
                <InputLeftAddon children="0" />
                <Input
                  {...formik.getFieldProps("areaCode")}
                  name="areaCode"
                  type="number"
                  placeholder="XXX"
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.areaCode}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.errors.gsm && formik.touched.gsm}>
              <FormLabel>Telefon</FormLabel>
              <Input
                name="gsm"
                {...formik.getFieldProps("gsm")}
                placeholder="XXXXXXX"
                onChange={(e) => {
                  const { value } = e.target;
                  const formattedValue = value
                    .replace(/\D/g, "")
                    .replace(/(\d{3})(\d{2})(\d{2})/, "$1 $2 $3");
                  formik.setFieldValue("gsm", formattedValue);
                }}
              />
            </FormControl>
          </Grid>

          {/* PROJE */}
          <FormControl
            isInvalid={formik.errors.project && formik.touched.project}
            gridColumn="1 / span 2"
          >
            <FormLabel>Lütfen ilgilendiğiniz bir proje seçin</FormLabel>
            <Select
              {...formik.getFieldProps("project")}
              name="project"
              placeholder="Lütfen Seçin"
            >
              <option value="Mia Garden">Mia Garden</option>
              <option value="Mia Mare">Mia Mare</option>
              <option value="Miva Vita">Miva Vita</option>
              <option value="Defne Konutları">Defne Konutları</option>
              <option value="Leyla Konutları">Leyla Konutları</option>
              <option value="Deniz Konutları">Deniz Konutları</option>
              <option value="Türkmenoğlu Apartmanı">
                Türkmenoğlu Apartmanı
              </option>
              <option value="Park Violet">Park Violet</option>
              <option value="Mar La Vista">Mar La Vista</option>
              <option value="Yener Apartmanı">Yener Apartmanı</option>
              <option value="Cemile Hanım Apartmanı">
                Cemile Hanım Apartmanı
              </option>
              <option value="Ela Apartmanı">Ela Apartmanı</option>
            </Select>
            <FormErrorMessage>{formik.errors.project}</FormErrorMessage>
          </FormControl>

          {/* İLETİŞİM YÖNTEMİ */}
          <FormControl
            gridColumn="1 / span 2"
            isInvalid={
              formik.errors.messagingUtil && formik.touched.messagingUtil
            }
          >
            <FormLabel>İletişim Seçenekleri</FormLabel>
            <Flex justifyContent="space-between">
              <CheckboxGroup>

              <Checkbox
                name="messageUtil"
                value={formik.values.messagingUtil.Sms}
                onChange={handleCheckboxChange}
                onBlur={formik.handleBlur}
              >
                Sms
              </Checkbox>
              <Checkbox
                name="messageUtil"
                value={formik.values.messagingUtil.Email}
                onChange={handleCheckboxChange}
                onBlur={formik.handleBlur}
              >
                E-Posta
              </Checkbox>
              <Checkbox
                name="messageUtil"
                onChange={handleCheckboxChange}
                onBlur={formik.handleBlur}
                value={formik.values.messagingUtil.Phone}
              >
                Telefon
              </Checkbox>
              </CheckboxGroup>

            </Flex>
            <FormErrorMessage>{formik.errors.messagingUtil}</FormErrorMessage>
          </FormControl>

          {/* GÖNDER */}
          <Button
            gridColumn="1 / span 2"
            colorScheme="teal"
            isLoading={isLoading}
            loadingText="Gönderiliyor"
            disabled={isLoading}
            type="submit"
            onClick={formik.handleSubmit}
          >
            Gönder
          </Button>
        </Grid>
      </form>
    </Center>
  );
};

export default reactForm;
