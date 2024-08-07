import { useState, useRef, useCallback, useContext } from "react";
import emailjs from "@emailjs/browser";
import { AudioContext } from "../../AudioContext";

const ContactForm = ({Title}) => {
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setIsError] = useState(false);

  const { useSound, playPencilScratch, stopPencilScratch } = useContext(AudioContext);

  const formData = useRef();

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedStopPencilScratch = useCallback(
    debounce(() => {
      stopPencilScratch();
    }, 1000),
    [stopPencilScratch]
  );

  const handleInputChange = useCallback(() => {
    if (useSound) {
      playPencilScratch();
      debouncedStopPencilScratch();
    }
  }, [useSound, playPencilScratch, debouncedStopPencilScratch]);

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
      <Title section="Contact Me\" color="tertiary" />
      <form id="contactForm" ref={formData} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" required onChange={handleInputChange} />
        <label>Email</label>
        <input type="email" name="user_email" required onChange={handleInputChange} />
        <label>Message</label>
        <textarea name="message" onChange={handleInputChange} />
        <SubmitButton />
      </form>
    </div>
  );
};

export default ContactForm;
