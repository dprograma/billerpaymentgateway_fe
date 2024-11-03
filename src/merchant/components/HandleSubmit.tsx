import axios from 'axios';

const HandleSubmit = async (e: any, payload: any, url: string, method: string, setStatus?: any, setMessage?: any, setUser?: any, accessToken?: string, customheaders?: any) => {
  e.preventDefault();
  const body = payload;
  let response: any;
  const headers = customheaders;

  try {
    if (method === "POST") {
      response = await axios.post(url, body, headers);
    } else if (method === "PUT") {
      response = await axios.put(url, body, headers);
    } else if (method === "DELETE") {
      const config = {
        method: 'delete',
        url: url,
        data: {},
        headers,
      };
      response = await axios.delete(url, headers );
    }

    if (response.data.status === 'error') {
      if (setStatus) setStatus(false);
      if (setMessage) setMessage(response.data.response);
      return false;
    } else {
      if (setMessage) setMessage(response.data.response);
      if (setStatus) setStatus(true);
      if (setUser) setUser(response.data.data);  
      return true;
    }
  } catch (error:any) {
    console.error(error);
    if (setStatus) setStatus(false);
    return false;
  }
};

export default HandleSubmit;
