import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your name")
    .min(3, "name must include atleast 3 characters"),
  lastName: yup
    .string()
    .required("Please enter your last name")
    .min(4, "Name must include atleast 4 characters"),
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter a valid email address"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "Message must include atleast 10 characters"),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
    reset();
  }

  console.log(errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="First name" {...register("firstName")} />
        {errors.firstName && (
          <span className="error">{errors.firstName.message}</span>
        )}
        <input placeholder="Last name" {...register("lastName")} />
        {errors.lastName && (
          <span className="error">{errors.lastName.message}</span>
        )}
        <input placeholder="Email" {...register("email")} />
        {errors.email && <span className="error">{errors.email.message}</span>}
        <select name="options" id="options">
          <option value="optionOne">Games</option>
          <option value="optionTwo">Issues</option>
          <option value="optionThree">Billing</option>
        </select>
        <textarea placeholder="Message.." {...register("message")} />
        {errors.message && (
          <span className="error">{errors.message.message}</span>
        )}
        <button>Submit</button>
        {isSubmitSuccessful && (
          <div className="success">Form submitted successfully</div>
        )}
      </form>
    </>
  );
}
