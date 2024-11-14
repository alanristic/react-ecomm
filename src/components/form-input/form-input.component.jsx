// import "./form-input.styles.jsx"
import {
  FormInputContainer,
  ShrinkLabelStyles,
  FormInputLabel,
  Input,
  Group,
} from "./form-input.styles.jsx"

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      <FormInputLabel className={`${otherProps.value.length}`}>
        {label}
      </FormInputLabel>
    </Group>
  )
}

export default FormInput
