export function payWithEtegram(values: any) {
  var json = values;
  var useId = makeid(10);
  var public_key = values.public_key;
  var et_ref = values.et_ref;
  var redirect_url = values.redirect_url;
  var meta = values.meta;
  var amount = values.amount;
  var currency = values.currency;
  var customer = values.customer;
  var customizations = values.customizations;

  var jsonString = JSON.stringify(json);

  // URL-encode the JSON string
  var encodedJsonString = encodeURIComponent(jsonString);

  var iframLink =
    'https://appapi.etegram.com/checkout/check_setup_pay?json=' +
    encodedJsonString;

  // var iframLink = meta;
  //  building this ifram to cover the page
  var bringModally = document.getElementsByTagName('html')[0];
  // var
  var data =
    '' +
    '    <style>' +
    '.responsive-iframe' +
    useId +
    ' {' +
    '  position: fixed;' +
    '  top: 0px;' +
    '  left: 0;' +
    '  bottom: 0;' +
    '  right: 0;' +
    '  width: 100%;' +
    '  height: 100%;' +
    '  border: none;' +
    ' background: url(http://appapi.etegram.com/checkout/inline/output-onlinegiftools.gif) center center no-repeat;' +
    '  z-index: 2000;' +
    '}' +
    '.etegram-payment-link-container-top' +
    useId +
    ' {' +
    '  position: fixed;' +
    '  top: 0px;' +
    '}' +
    '.etegram-payment-link-container-top' +
    useId +
    ' div{' +
    '  width: 20px;' +
    '  height: 20px;' +
    '  background: ;' +
    '  display: flex;' +
    '  align-items: center;' +
    'justify-content: ' +
    'border-radius: 50px' +
    '}' +
    '.etegram-payment-link-container-top' +
    useId +
    ' img{' +
    '  width: 10px;' +
    '}' +
    '    </style>' +
    '           <iframe class="responsive-iframe' +
    useId +
    '" id="etegram-user-id-resp-res-dev-tool-abcdefghijklmnopqrstuvwxyz" src="' +
    iframLink +
    '" ></iframe>' +
    '';
  var postCreated = createPostForUser(data);
  bringModally.appendChild(postCreated);
}

function createPostForUser(data: any) {
  var element = document.createElement('div');
  element.classList.add('hdgd67gdhcfhnfun2hcnDhcf');
  element.innerHTML = data;
  return element;
}

function makeid(length: any) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function closeIFrame() {
  // document.getElementById("testUsedIframfeueygdgdgdb").remove();
}

// window.addEventListener('message', function(event) {
//       if (event.data === 'closeIframe') {
//         // Assuming the iframe has an ID of "myIframe"
//         var iframe = document.getElementById('etegram-user-id-resp-res-dev-tool-abcdefghijklmnopqrstuvwxyz');
//         // iframe.style.display = 'none';
//         var hdgd67gdhcfhnfun2hcnDhcf = document.querySelector(".hdgd67gdhcfhnfun2hcnDhcf");
//         if (confirm("You are about to close this payment modal") == true) {
//           hdgd67gdhcfhnfun2hcnDhcf.remove();
//     } else {

//     }

//       }

//     });

// const createOrder = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   const formData = new FormData(e.target as HTMLFormElement);

//   const validatedFields = CreateOrder.safeParse({
//     firstname: formData.get('firstname'),
//     lastname: formData.get('lastname'),
//     email: formData.get('email'),
//     address: formData.get('address'),
//     phone: formData.get('phone'),
//   });

//   if (!validatedFields.success) {
//     setState({
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Some fields are invalid failed to create order',
//     });
//     return;
//   }
//   const orderDoc: orderDocType = {
//     ...validatedFields.data,
//     _type: 'orders',
//     orderId: reference,
//     items: cartItems.map((item) => ({
//       ...item,
//       _key: uuid(),
//     })),
//     totalPrice,
//   };
//   // console.log(orderDoc);
//   try {
//     payWithEtegram({
//       public_key: 'YOUR PUBLIC KEY',
//       ref: 'titanic-48981487343MDI0NzMx',
//       amount: 10,
//       currency: 'NGN',
//       meta: {
//         customer_id: 23,
//         customer_mac: '92a3-912ba-1192a',
//       },
//       customer: {
//         email: 'jessesamuel84@gmail.com',
//         phone_number: '08102909304',
//         name: 'Rose DeWitt Bukater',
//       },
//       redirect_url: 'https://etegram.co',
//       customizations: {
//         title: 'The Titanic Store',
//         description: 'Payment for an awesome cruise',
//         logo: 'https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg',
//       },
//     });
//   } catch (error) {
//     console.error('Error');
//   }
// };
