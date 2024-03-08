import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setIsError] = useState(false);

  const formData = useRef();

  //send email to emailjs
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    emailjs
      .sendForm("service_eh9j22b", "template_ru0cax9", formData.current, {
        publicKey: "v9xtn2Nuwz_AiNSBB",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setSuccess(true);
          setIsSubmitting(false);
        },
        (error) => {
          setIsSubmitting(false);
          setIsError(true);
          alert(error.text);
          console.log("FAILED...", error.text);
        }
      );
  };

  //conditional rendering for submit button
  const SubmitButton = () => {
    switch (isSubmitting) {
      case true:
        return (
          <p>
            Sending...
          </p>
        )
      case false:
        if(success) {
          return (
            <p>
              Sent!
            </p>
          )
        } else {
          return (
            <input id="submitButton" type="submit" value="Send" required />
          )
        }
    }
  }

  return (
    <div id="contactParent">
      <h1 id="contactH1">Contact Me</h1>
      <form id="contactForm" ref={formData} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" required />
        <label>Email</label>
        <input type="email" name="user_email" required />
        <label>Message</label>
        <textarea name="message" />
        <SubmitButton />
      </form>
    </div>
  );
};

export default ContactForm;
