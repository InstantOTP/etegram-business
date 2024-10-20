import Cookie from 'js-cookie';

const getSignature = async () => {
  const access_token = Cookie.get('access_token') ?? '';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/account/image-upload-signature`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  )
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .catch((err) => console.error(err));

  return response;
};

export async function uploadImageToImagekit(file: File, fileName: string) {
  const { expire, token, signature } = await getSignature();
  // console.log('hello');

  if (!expire && !token && !signature) return null;

  let formData = new FormData();
  formData.append('publicKey', 'public_LqFGZTyOv6mLtrKNP4GvL/vGtVo=');
  formData.append('file', file);
  formData.append('fileName', fileName);
  formData.append('useUniqueFileName', 'true');
  formData.append('expire', expire?.toString());
  formData.append('token', token);
  formData.append('signature', signature);

  try {
    const response = await fetch(
      'https://upload.imagekit.io/api/v1/files/upload',
      {
        method: 'POST',
        // headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      return data;
    }
  } catch (error) {
    if (error) console.error(error);
  }
}
