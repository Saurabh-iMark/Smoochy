import React from 'react';

// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  CardElement
} from "@stripe/react-stripe-js";



import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51NM6l7SE3oVUbSg9jNrkH8Hc72rHZh56wP1ImhWD40B13KVmgcI6D3bz7MYXooZcI9uXHSyCkIhFjBvVew2Uc6kM00K1RFonfS');
const stripePromise = loadStripe('pk_test_51JBaDCSBeQ4yffNjUjZesxjDBBX7WRrKvJIkHi2DcsHwzaOLeIfhF7MFarEsGgFkA99txz1Na8JsmjJhrlv0QxhJ00Pa8Cwvrt');


// export interface CreateCardPaymentProps {
//   onSuccessCard: (id: string) => void;
// }


// export const CreateCardPayment: React.FC<CreateCardPaymentProps> = ({onSuccessCard}) => {
//   const [name, setName] = useState("");
//   const elements = useElements(); // use element provider state
//   const stripe = useStripe(); // stripe sdk

//   const onSubmit = async () => {
//     if (!stripe || !elements) {
//       return;
//     }
//     // card number element as the card element
//     const cardNumberElement = elements?.getElement(CardNumberElement);

//     if (cardNumberElement) {
//       const {error, paymentMethod} = await stripe?.createPaymentMethod({
//         type: 'card',
//         card: cardNumberElement,  // pass as card
//         billing_details: {
//           name, // name of the user
//         },
//       });

//       if (!error && paymentMethod?.id) {
//         onSuccessCard(paymentMethod.id);
//       } else {
//         onError();
//       }
//     }
//   };
// }

// return (
//   <>
//     <CardInputWrapper>
//       <CardNumberElement
//         options={{
//           style: {
//             base: inputStyle,
//           },
//         }}
//       />
//    </CardInputWrapper>
//   <button onClick={onSubmit}>Pay with card</button>
//   </>
// );




function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();


  const handlePayment = async () => {
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);

    if (result.error) {
      // Handle error
      console.error(result.error);
    } else {
      // Handle successful token
      console.log(result.token);
    }
  };

const gg = {
  base: {
    iconColor: '#c4f0ff',
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
    ':-webkit-autofill': {
      color: '#fce883',
    },
    '::placeholder': {
      color: '#87BBFD',
    },
  },
  invalid: {
    iconColor: '#FFC7EE',
    color: '#FFC7EE',
  }
};



  return (
    <div>
      <CardElement options={gg} />
      <button onClick={handlePayment}>Submit Payment</button>
    </div>
  )
}



const UpgradeAC = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default UpgradeAC;

