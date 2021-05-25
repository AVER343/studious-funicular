import {Formik,Form,Field} from 'formik'
import {FormErrorMessage,Input,Button,FormControl,FormLabel} from '@chakra-ui/react'
function LoginPage() {
    function validateName(value) {
      let error
      if (!value) {
        error = "Name is required"
      } else if (value.toLowerCase() !== "naruto") {
        error = "Jeez! You're not a fan 😱"
      }
      return error
    }
  
    return (
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, actions) => actions.setSubmitting(true)}
      >
        {(props) => (
          <Form>
            <Field name="name" validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">First name</FormLabel>
                  <Input {...field} id="name" placeholder="name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    )
  }
  export default LoginPage